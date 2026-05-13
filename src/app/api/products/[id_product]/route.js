import { NextResponse } from "next/server";
import { getDatabase, isDemoMode } from "@/libs/useDatabase";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

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

    const db = await getDatabase();
    const result = await db.getById(id);

    if (!result) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result,
      success: true,
      mode: isDemoMode() ? 'demo' : 'database'
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

    const db = await getDatabase();
    const deleted = await db.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Product deleted successfully", 
        success: true,
        mode: isDemoMode() ? 'demo' : 'database'
      },
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

    const db = await getDatabase();
    
    const updateData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
    };

    // Si hay imagen nueva, procesar
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

      if (isDemoMode()) {
        updateData.image = "https://images.unsplash.com/photo-1627979435509-be10e53dce6c?w=500&h=500&fit=crop";
      } else {
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

        updateData.image = res.secure_url;
      }
    }

    const result = await db.update(id, updateData);

    if (!result) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result,
      success: true,
      message: "Product updated successfully",
      mode: isDemoMode() ? 'demo' : 'database'
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: error.message || "Error updating product", success: false },
      { status: 500 }
    );
  }
}
