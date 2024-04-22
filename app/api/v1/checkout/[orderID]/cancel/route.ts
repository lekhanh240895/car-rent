import { db } from '@/app/lib/kysely';
import { ApiError, handleError } from '@/app/lib/exceptions';

export async function POST(
  req: Request,
  {
    params
  }: {
    params: {
      orderID: string;
    };
  }
) {
  const { orderID } = params;

  const payment = await db
    .updateTable('payment as p')
    .set({
      status: 'cancel'
    })
    .where('p.transaction_id', '=', orderID)
    .returningAll()
    .executeTakeFirst();

  if (!payment) {
    const apiError = ApiError.fromPaypalOrder();
    return handleError(apiError, 400);
  }

  await db
    .updateTable('car_rental as cr')
    .set({
      status: 'cancel'
    })
    .where('cr.id', '=', payment.car_rental_id)
    .executeTakeFirst();

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      rental_id: payment.car_rental_id,
      payment_id: payment.id
    }
  });
}
