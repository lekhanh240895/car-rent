import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 8;
  const offset = searchParams.get('offset') || 0;

  const { rows: totalCars } = await sql`SELECT COUNT(*) as total from cars`;
  const { rows: cars } = await sql`
SELECT 
  c.id,
  c.description,
  c.price,
  split_part(ca.name, ' ', 1) AS capacity,
  s.name AS steering,
  c.gasoline,
  t.name AS type,
  c.avg_rating,
  c.rating_count,
  c.name,
  i.image_link as image
FROM 
  cars c
INNER JOIN 
  types t ON c.type = t.id
INNER JOIN 
  steerings s ON c.steering = s.id
INNER JOIN 
  capacities ca ON c.capacity = ca.id
INNER JOIN 
images i ON c.id = i.car_id AND i.is_main
LIMIT ${limit} OFFSET ${offset}
    `;

  const total = totalCars[0].total;

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      items: cars,
      pagination: {
        total: Number(total),
        limit,
        offset
      },
      link: {
        self: '',
        next: '',
        last: ''
      }
    }
  });
}
