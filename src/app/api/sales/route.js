import { NextResponse } from "next/server";
import conn from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM sales");
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


export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM sales WHERE sale_id = ?", [
      params.sale_id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Sale not found",
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
      total: data.total,
    };

    if (!updateData.total) {
      return NextResponse.json(
        {
          message: "Total is required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("UPDATE sales SET ? WHERE sale_id = ?", [
      updateData,
      params.sale_id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Sale not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedSale = await conn.query(
      "SELECT * FROM sales WHERE sale_id = ?",
      [params.sale_id]
    );

    return NextResponse.json(updatedSale[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
