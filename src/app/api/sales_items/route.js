import { NextResponse } from "next/server";
import conn from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM sales_item");
    return NextResponse.json(results[0]); // Ajusta aquí para devolver solo el primer nivel del array
  } catch (error) {
    console.log("Error fetching sales items:", error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.sale_id || !data.product_id || !data.quantity || !data.price) {
      return NextResponse.json(
        {
          message: "Sale ID, Product ID, Quantity, and Price are required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("INSERT INTO sales_item SET ?", {
      sale_id: data.sale_id,
      product_id: data.product_id,
      quantity: data.quantity,
      price: data.price,
      createdAt: new Date(),
    });

    return NextResponse.json({
      sale_item_id: result.insertId,
      sale_id: data.sale_id,
      product_id: data.product_id,
      quantity: data.quantity,
      price: data.price,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("Error submitting sale item:", error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
