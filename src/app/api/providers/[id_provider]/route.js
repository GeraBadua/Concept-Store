import conn from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id_provider } = params;
    const data = await request.json();

    await conn.query('UPDATE provider SET ? WHERE id_provider = ?', [data, id_provider]);
    return new Response(null, { status: 204 });
}

export async function DELETE(request, { params }) {
    const { id_provider } = params;

    await conn.query('DELETE FROM provider WHERE id_provider = ?', [id_provider]);
    return new Response(null, { status: 204 });
}
