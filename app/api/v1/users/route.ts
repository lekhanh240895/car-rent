import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows: users } = await sql`
    SELECT * from users;
    `;
  return Response.json(users);
}
