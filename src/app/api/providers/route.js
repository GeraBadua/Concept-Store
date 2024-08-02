import { NextResponse } from "next/server";
import conn from "@/libs/mysql";

export async function GET() {
  try {
    const [rows] = await conn.query("SELECT id_provider, name FROM provider");
    return NextResponse.json(rows);
  } catch (error) {
    console.log("Error fetching providers:", error);
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
