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
  return Response.json(jsonResponse, {
    status: httpStatusCode
  });
}
