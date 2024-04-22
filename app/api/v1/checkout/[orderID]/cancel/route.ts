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
  return Response.json(`Cancel order ${orderID}`, {
    status: 200
  });
}
