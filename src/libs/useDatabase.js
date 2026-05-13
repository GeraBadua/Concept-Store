/**
 * Database abstraction layer
 * Switches between demo mode and real database based on environment variable
 * 
 * Usage:
 *   const db = await getDatabase();
 *   const products = await db.getAll();
 */

import conn from './mysql';
import {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/data/demo';

const IS_DEMO_MODE = process.env.DEMO_MODE === 'true';

/**
 * Get database interface (demo or real)
 * Returns an object with unified methods for both modes
 */
export async function getDatabase() {
  if (IS_DEMO_MODE) {
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

  return {
    mode: 'database',
    query: realQuery,
    getAll: async () => {
      const [results] = await conn.query('SELECT * FROM product');
      return results;
    },
    getById: async (id) => {
      const [results] = await conn.query(
        'SELECT * FROM product WHERE id_product = ?',
        [parseInt(id)]
      );
      return results[0] || null;
    },
    search: async (query) => {
      if (!query) {
        const [results] = await conn.query('SELECT * FROM product');
        return results;
      }
      const [results] = await conn.query(
        'SELECT * FROM product WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?',
        [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`]
      );
      return results;
    },
    create: async (data) => {
      const [result] = await conn.query('INSERT INTO product SET ?', data);
      return { id_product: result.insertId, ...data };
    },
    update: async (id, data) => {
      await conn.query(
        'UPDATE product SET ? WHERE id_product = ?',
        [data, parseInt(id)]
      );
      const [results] = await conn.query(
        'SELECT * FROM product WHERE id_product = ?',
        [parseInt(id)]
      );
      return results[0] || null;
    },
    delete: async (id) => {
      const [result] = await conn.query(
        'DELETE FROM product WHERE id_product = ?',
        [parseInt(id)]
      );
      return result.affectedRows > 0;
    },
    close: () => conn.end()
  };
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
  return conn.query(query, params);
}

/**
 * Check if running in demo mode
 */
export function isDemoMode() {
  return IS_DEMO_MODE;
}

/**
 * Get mode name for logging/display
 */
export function getDatabaseMode() {
  return IS_DEMO_MODE ? 'DEMO' : 'DATABASE';
}
