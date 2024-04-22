import { ApiError, handleError } from '@/app/lib/exceptions';
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
  const { id } = params;
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
    c.name
  FROM 
    cars c
  INNER JOIN 
    types t ON c.type = t.id
  INNER JOIN 
    steerings s ON c.steering = s.id
  INNER JOIN 
    capacities ca ON c.capacity = ca.id
  WHERE c.id = ${id}
      `;

  if (cars.length === 0) {
    const apiError = ApiError.fromNotFoundCar();
    return handleError(apiError, 404);
  }

  const { rows: images } = await sql`
    SELECT i.image_link, i.description, i.title from images i WHERE car_id = ${id}
    `;
  const { rows: pick_up_locations } = await sql`
  SELECT DISTINCT l.id, l.name 
  FROM car_pick_up_locations c 
  INNER JOIN locations l 
  ON l.id = c.location_id 
  WHERE c.car_id = ${id}
      `;
  const { rows: drop_off_locations } = await sql`
      SELECT DISTINCT l.id, l.name 
      FROM car_drop_off_locations c 
      INNER JOIN locations l 
      ON l.id = c.location_id 
      WHERE c.car_id = ${id}
      `;
  const car = cars[0];
  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      ...car,
      images,
      pick_up_locations,
      drop_off_locations
    }
  });
}
