import { NextResponse } from "next/server";
import conn from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM sales_item WHERE sale_item_id = ?", [
      params.sale_item_id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Sale item not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM sales_item WHERE sale_item_id = ?", [
      params.sale_item_id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Sale item not found",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updateData = {
      quantity: data.quantity,
      price: data.price,
    };

    if (!updateData.quantity || !updateData.price) {
      return NextResponse.json(
        {
          message: "Quantity and Price are required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("UPDATE sales_item SET ? WHERE sale_item_id = ?", [
      updateData,
      params.sale_item_id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Sale item not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedSaleItem = await conn.query(
      "SELECT * FROM sales_item WHERE sale_item_id = ?",
      [params.sale_item_id]
    );

    return NextResponse.json(updatedSaleItem[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
