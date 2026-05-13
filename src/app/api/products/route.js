import { NextResponse } from "next/server";
import conn from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function GET() {
  try {
    const [results] = await conn.query("SELECT * FROM product");
    return NextResponse.json({
      data: results,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        message: "Error fetching products",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
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

    if (!image) {
      return NextResponse.json(
        { message: "Product image is required", success: false },
        { status: 400 }
      );
    }

    // Validar tipo y tamaño de imagen
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

    const [result] = await conn.query("INSERT INTO product SET ?", {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: res.secure_url,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        data: {
          id: result.insertId,
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          image: res.secure_url,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        message: error.message || "Error creating product",
        success: false,
      },
      { status: 500 }
    );
  }
}