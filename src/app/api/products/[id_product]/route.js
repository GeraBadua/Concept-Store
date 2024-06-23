import { NextResponse } from "next/server";
import conn from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage }from "@/libs/processImage";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id_product = ?", [
      params.id_product,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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
    const result = await conn.query("DELETE FROM product WHERE id_product = ?", [
      params.id_product,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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
    const data = await request.formData();
    const image = data.get("image");
    const updateData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };

    if (!updateData.name) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    // Actualizar datos del producto sin imagen
    const result = await conn.query("UPDATE product SET ? WHERE id_product = ?", [
      updateData,
      params.id_product,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    // Si hay una nueva imagen, procesarla y actualizar el registro
    if (image) {
      const buffer = await processImage(image);

      const res = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
          },
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result);
          }
        ).end(buffer);
      });

      const imageUpdateData = { image: res.secure_url };

      const imageResult = await conn.query("UPDATE product SET ? WHERE id_product = ?", [
        imageUpdateData,
        params.id_product,
      ]);

      if (imageResult.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }
    }

    const updatedProduct = await conn.query(
      "SELECT * FROM product WHERE id_product = ?",
      [params.id_product]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
