import conn from '@/libs/mysql'; // Asegúrate de que la ruta sea correcta

export default async function handler(req, res) {
    try {
        const [rows] = await conn.query('SELECT * FROM product');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

