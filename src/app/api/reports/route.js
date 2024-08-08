import { NextResponse } from 'next/server';
import conn from '@/libs/mysql';

export async function GET() {
    try {
      // Obtener total de ganancias
      const [totalSalesResult] = await conn.query('SELECT SUM(total) AS total FROM sales');
      const totalSales = totalSalesResult[0]?.total || 0;
  
      // Obtener el producto más vendido
      const [mostSoldProductResult] = await conn.query(`
        SELECT p.id_product AS product_id, p.name, p.price, p.image, SUM(si.quantity) AS total_quantity
        FROM sales_item si
        JOIN product p ON si.product_id = p.id_product
        GROUP BY p.id_product, p.name, p.price
        ORDER BY total_quantity DESC
        LIMIT 1
      `);
      const mostSoldProduct = mostSoldProductResult[0] || {};
  
      return NextResponse.json({
        totalSales,
        mostSoldProduct,
      });
    } catch (error) {
      console.error('Error in /api/reports:', error); // Agregar más detalles en el log
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
  