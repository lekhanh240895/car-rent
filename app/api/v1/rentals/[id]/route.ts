import { ApiError, handleError } from '@/app/lib/exceptions';
import { db } from '@/app/lib/kysely';
import { verifyToken } from '@/app/lib/utils';
import { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';

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

  const access_token = headers().get('Authorization')?.split(' ')[1];

  if (!access_token) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }

  const decoded = verifyToken(access_token, 'access') as JwtPayload;
  if (!decoded) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }
  const user_id = decoded.userId;

  const rentalDetail = await db
    .selectFrom('car_rental as cr')
    .innerJoin('cars as c', 'c.id', 'cr.car_id')
    .innerJoin('types as t', 't.id', 'c.type')
    .innerJoin('steerings as s', 's.id', 'c.steering')
    .innerJoin('capacities as ca', 'ca.id', 'c.capacity')
    .innerJoin('images as i', 'i.car_id', 'c.id')
    .selectAll('cr')
    .select([
      'c.name as car_name',
      'c.price as car_price',
      't.name as car_type',
      's.name as car_steering',
      'ca.name as car_capacity',
      'c.gasoline as car_gasoline',
      'i.image_link as car_image'
    ])
    .where('cr.id', '=', id)
    .where('cr.user_id', '=', user_id)
    .executeTakeFirst();

  if (!rentalDetail) {
    const error = ApiError.fromNotFoundOrder();
    return handleError(error, 404);
  }

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: rentalDetail
  });
}
