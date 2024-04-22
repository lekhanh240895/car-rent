import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows: locations } = await sql`
  SELECT * from locations  
  `;

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: locations
  });
}
