import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows: types } = await sql`
  SELECT t.id AS id, t.name AS name, COUNT(c.id) AS count
FROM types t
INNER JOIN cars c ON t.id = c.type
GROUP BY t.id, t.name
ORDER BY t.id;
  `;
  const { rows: capacities } = await sql`
  SELECT ca.id AS id, ca.name AS name, COUNT(c.id) AS count
FROM capacities ca
INNER JOIN cars c ON ca.id = c.capacity
GROUP BY ca.id, ca.name
ORDER BY ca.id;
  `;
  const { rows: price_max } = await sql`
  SELECT MAX(price) as max from cars
  `;

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      types,
      capacities,
      price: {
        max: Number(price_max[0].max)
      }
    }
  });
}
