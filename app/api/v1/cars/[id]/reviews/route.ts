import { sql } from '@vercel/postgres';

export async function GET(
  req: Request,
  {
    params
  }: {
    params: {
      id: number;
    };
  }
) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 3;
  const offset = searchParams.get('offset') || 0;
  const { id } = params;
  const { rows: reviews } = await sql`
  SELECT 
  u.image as user_image,
  u.full_name as user_name,
  u.title as user_title,
  r.id,
  r.content,
  r.rating,
  r.created_at,
  r.updated_at
  FROM 
  reviews r
  INNER JOIN users u ON u.id = r.user_id
  WHERE r.car_id = ${id}
  ORDER BY r.created_at desc
  LIMIT ${limit} OFFSET ${offset}
      `;
  const total = reviews.length;
  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      items: reviews,
      pagination: {
        total,
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
