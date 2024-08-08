// src/app/api/products/route.js
import conn from '../../../libs/mysql';

export async function GET(req) {
    try {
        const [rows] = await conn.query('SELECT * FROM product');
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
