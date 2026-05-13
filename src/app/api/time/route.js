import { NextResponse } from "next/server";
import { getDatabase, isDemoMode } from "@/libs/useDatabase";

export async function GET() {
  try {
    const db = await getDatabase();
    const [result] = await db.query("SELECT NOW()");

    return NextResponse.json({
      message: result?.[0]?.["now()"] || new Date().toISOString(),
      mode: isDemoMode() ? "demo" : "database"
    });
  } catch (error) {
    console.error("Error fetching time:", error);
    return NextResponse.json(
      {
        message: new Date().toISOString(),
        mode: "demo"
      },
      { status: 200 }
    );
  }
}
