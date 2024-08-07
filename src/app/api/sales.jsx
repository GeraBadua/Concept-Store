import conn from '../../../libs/mysql'; // Ajusta la ruta al archivo donde tienes la conexión a MySQL

export default async function handler(req, res) {
    try {
        const [rows] = await conn.query('SELECT * FROM sales');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}