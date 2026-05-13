/**
 * Database abstraction layer
 * Switches between demo mode and real database based on environment variable
 * 
 * Usage:
 *   const db = await getDatabase();
 *   const products = await db.getAll();
 */

import {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/data/demo';

const DEFAULT_DEMO_MODE = process.env.DEMO_MODE !== 'false';
let runtimeDemoMode = DEFAULT_DEMO_MODE;

let conn = null;
let connectionVerified = false;

// Lazy load real database connection only if needed
async function getConnection() {
  if (conn) return conn;
  
  try {
    const mysql = await import('mysql2/promise');
    conn = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    return conn;
  } catch (error) {
    console.error('Failed to create database connection:', error);
    throw error;
  }
}

async function ensureConnection(connection) {
  if (connectionVerified) return true;

  await connection.query('SELECT 1');
  connectionVerified = true;
  return true;
}

function getDemoDatabase() {
  return {
    mode: 'demo',
    query: demoQuery,
    getAll: getAllProducts,
    getById: getProductById,
    search: searchProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
    close: () => Promise.resolve()
  };
}

/**
 * Get database interface (demo or real)
 * Returns an object with unified methods for both modes
 */
export async function getDatabase() {
  if (runtimeDemoMode) {
    return getDemoDatabase();
  }

  try {
    const connection = await getConnection();
    await ensureConnection(connection);

    return {
      mode: 'database',
      query: realQuery,
      getAll: async () => {
        const [results] = await connection.query('SELECT * FROM product');
        return results;
      },
      getById: async (id) => {
        const [results] = await connection.query(
          'SELECT * FROM product WHERE id_product = ?',
          [parseInt(id)]
        );
        return results[0] || null;
      },
      search: async (query) => {
        if (!query) {
          const [results] = await connection.query('SELECT * FROM product');
          return results;
        }
        const [results] = await connection.query(
          'SELECT * FROM product WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?',
          [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`]
        );
        return results;
      },
      create: async (data) => {
        const [result] = await connection.query('INSERT INTO product SET ?', data);
        return { id_product: result.insertId, ...data };
      },
      update: async (id, data) => {
        await connection.query(
          'UPDATE product SET ? WHERE id_product = ?',
          [data, parseInt(id)]
        );
        const [results] = await connection.query(
          'SELECT * FROM product WHERE id_product = ?',
          [parseInt(id)]
        );
        return results[0] || null;
      },
      delete: async (id) => {
        const [result] = await connection.query(
          'DELETE FROM product WHERE id_product = ?',
          [parseInt(id)]
        );
        return result.affectedRows > 0;
      },
      close: () => connection.end()
    };
  } catch (error) {
    console.warn('Database unavailable, falling back to demo mode:', error?.message || error);
    runtimeDemoMode = true;
    return getDemoDatabase();
  }
}

/**
 * Helper for demo mode queries
 */
function demoQuery(query, params = []) {
  // Simple logging for demo
  console.log('[DEMO] Query:', query);
  return Promise.resolve([[], []]);
}

/**
 * Helper for real database queries
 */
async function realQuery(query, params = []) {
  const connection = await getConnection();
  return connection.query(query, params);
}

/**
 * Check if running in demo mode
 */
export function isDemoMode() {
  return runtimeDemoMode;
}

/**
 * Get mode name for logging/display
 */
export function getDatabaseMode() {
  return runtimeDemoMode ? 'DEMO' : 'DATABASE';
}
