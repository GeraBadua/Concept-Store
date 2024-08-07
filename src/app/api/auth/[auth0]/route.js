import { handleAuth, getSession } from '@auth0/nextjs-auth0';
import conn from '@/libs/mysql';

const authHandler = async (req, res) => {
  try {
    const session = getSession(req, res);

    if (!session) {
      res.status(401).send('Authentication required');
      return;
    }

    const { user } = session;
    const { email, name } = user;

    const connection = await conn.getConnection();
    try {
      // Verifica si el usuario ya existe
      const [rows] = await connection.query('SELECT * FROM User WHERE email = ?', [email]);
      if (rows.length === 0) {
        // Inserta un nuevo usuario si no existe
        await connection.query('INSERT INTO User (email, name, role_id, password) VALUES (?, ?, ?, ?)', [
          email,
          name,
          3, // Aquí puedes poner el rol por defecto, por ejemplo, 2 para usuario normal
          '', // Auth0 maneja la autenticación, así que no necesitas contraseña aquí
        ]);
      } else {
        // Actualiza el usuario existente si ya existe
        await connection.query('UPDATE User SET name = ? WHERE email = ?', [name, email]);
      }
    } finally {
      connection.release();
    }

    res.redirect('/products_client');
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export const GET = handleAuth(authHandler);
export const POST = handleAuth(authHandler);
