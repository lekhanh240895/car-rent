import { ApiError, handleError } from '@/app/lib/exceptions';
import { db } from '@/app/lib/kysely';
import { captureOrder } from '@/app/lib/paypal';

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
  const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

  const { error } = jsonResponse;

  if (error) {
    const apiError = ApiError.fromPaypalOrder();
    return handleError(apiError, 400);
  }

  const payment = await db
    .updateTable('payment as p')
    .set({
      status: 'complete'
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
      status: 'complete'
    })
    .where('cr.id', '=', payment.car_rental_id)
    .executeTakeFirst();

  return Response.json(
    {
      status_code: 200,
      message: 'Success',
      data: {
        rental_id: payment.car_rental_id,
        payment_id: payment.id
      }
    },
    {
      status: httpStatusCode
    }
  );
}
