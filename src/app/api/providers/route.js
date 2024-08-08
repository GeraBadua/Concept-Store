import conn from "@/libs/mysql";

export async function GET() {
  const [providers] = await conn.query('SELECT * FROM provider');
  return new Response(JSON.stringify(providers), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const data = await request.json();
  const result = await conn.query('INSERT INTO provider SET ?', data);
  return new Response(JSON.stringify({ id: result.insertId }), {
    headers: { "Content-Type": "application/json" },
  });
}
