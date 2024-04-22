import { ApiError, handleError } from '@/app/lib/exceptions';
import { db } from '@/app/lib/kysely';
import { calculateNumberOfDays } from '@/app/lib/utils';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const car_id = searchParams.get('car_id');
  const pick_up_time = searchParams.get('pick_up_time');
  const drop_off_time = searchParams.get('drop_off_time');
  const promo_code = searchParams.get('promo_code');

  const car = await db
    .selectFrom('cars as c')
    .select('c.price')
    .where('c.id', '=', Number(car_id))
    .executeTakeFirst();

  if (!car) {
    const error = ApiError.fromNotFoundCar();
    return handleError(error, 404);
  }

  if (!pick_up_time || !drop_off_time) {
    const error = ApiError.fromInvalidSummaryData();
    return handleError(error, 400);
  }

  const price = Number(car.price);
  const rental_days = calculateNumberOfDays(pick_up_time, drop_off_time);

  let total = 0;
  let discount = 0;
  const subtotal = rental_days * price;
  const tax = 0.1 * subtotal;
  total = subtotal + tax;

  if (promo_code) {
    const data = await db
      .selectFrom('promo_codes as pr')
      .selectAll()
      .where('pr.code', '=', promo_code)
      .executeTakeFirst();

    if (!data) {
      const error = ApiError.fromInvalidCoupon();
      return handleError(error, 400);
    }
    const { value } = data;
    discount = (value * total) / 100;
    total -= discount;
  }

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      discount: discount.toFixed(2)
    }
  });
}
