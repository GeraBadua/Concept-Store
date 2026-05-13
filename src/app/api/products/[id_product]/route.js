import { NextResponse } from "next/server";
import conn from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage }from "@/libs/processImage";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Validar que el ID sea un número válido
function validateProductId(id) {
  const parsed = parseInt(id);
  return !isNaN(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(request, { params }) {
  try {
    const id = validateProductId(params.id_product);
    if (!id) {
      return NextResponse.json(
        { message: "Invalid product ID", success: false },
        { status: 400 }
      );
    }

    const [result] = await conn.query("SELECT * FROM product WHERE id_product = ?", [id]);

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result[0],
      success: true,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = validateProductId(params.id_product);
    if (!id) {
      return NextResponse.json(
        { message: "Invalid product ID", success: false },
        { status: 400 }
      );
    }

    const [result] = await conn.query("DELETE FROM product WHERE id_product = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = validateProductId(params.id_product);
    if (!id) {
      return NextResponse.json(
        { message: "Invalid product ID", success: false },
        { status: 400 }
      );
    }

    const data = await request.formData();
    const image = data.get("image");
    const name = data.get("name");
    const description = data.get("description") || "";
    const price = data.get("price");

    // Validaciones
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Product name is required", success: false },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { message: "Product name must be 100 characters or less", success: false },
        { status: 400 }
      );
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return NextResponse.json(
        { message: "Valid price is required", success: false },
        { status: 400 }
      );
    }

    const updateData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
    };

    // Actualizar datos del producto sin imagen
    const [result] = await conn.query("UPDATE product SET ? WHERE id_product = ?", [
      updateData,
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    // Si hay una nueva imagen, procesarla y actualizar
    if (image) {
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json(
          { message: "Only JPEG, PNG, WebP and GIF images are allowed", success: false },
          { status: 400 }
        );
      }

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: "Image size must be less than 5MB", success: false },
          { status: 400 }
        );
      }

      const buffer = await processImage(image);

      const res = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "concept-store",
          },
          (err, result) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              reject(new Error("Failed to upload image"));
            } else {
              resolve(result);
            }
          }
        );
        stream.on("error", (err) => {
          console.error("Stream error:", err);
          reject(err);
        });
        stream.end(buffer);
      });

      const imageUpdateData = { image: res.secure_url };

      const [imageResult] = await conn.query("UPDATE product SET ? WHERE id_product = ?", [
        imageUpdateData,
        id,
      ]);

      if (imageResult.affectedRows === 0) {
        return NextResponse.json(
          { message: "Product not found", success: false },
          { status: 404 }
        );
      }
    }

    const [updatedProduct] = await conn.query(
      "SELECT * FROM product WHERE id_product = ?",
      [id]
    );

    return NextResponse.json({
      data: updatedProduct[0],
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: error.message || "Error updating product", success: false },
      { status: 500 }
    );
  }
}
