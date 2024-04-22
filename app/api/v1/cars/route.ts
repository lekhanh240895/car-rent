import { db, sql } from '@/app/lib/kysely';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 9;
  const offset = searchParams.get('offset') || 0;
  const types = searchParams.getAll('types[]');
  const capacities = searchParams.getAll('capacities[]');
  const max_price = searchParams.get('max_price');
  const keyword = searchParams.get('keyword');
  const pick_up_location_id = searchParams.get('pick_up_location_id');
  const drop_off_location_id = searchParams.get('drop_off_location_id');
  const pick_up_time = searchParams.get('pick_up_time');
  const drop_off_time = searchParams.get('drop_off_time');

  let baseQuery = db
    .selectFrom('cars as c')
    .innerJoin('types as t', 't.id', 'c.type')
    .innerJoin('steerings as s', 's.id', 'c.steering')
    .innerJoin('capacities as ca', 'ca.id', 'c.capacity')
    .innerJoin('images as i', 'i.car_id', 'c.id')
    .leftJoin('car_pick_up_locations as pl', 'pl.car_id', 'c.id')
    .leftJoin('car_drop_off_locations as dl', 'dl.car_id', 'c.id')
    .where('i.is_main', '=', true);

  if (keyword) {
    baseQuery = baseQuery.where('c.name', 'ilike', `%${keyword}%`);
  }
  if (types.length > 0) {
    baseQuery = baseQuery.where('c.type', 'in', types);
  }
  if (capacities.length > 0) {
    baseQuery = baseQuery.where(
      'c.capacity',
      'in',
      capacities.map((t) => Number(t))
    );
  }
  if (Number(max_price) > 0) {
    baseQuery = baseQuery.where('c.price', '<=', max_price);
  }
  if (pick_up_location_id && drop_off_location_id) {
    baseQuery = baseQuery
      .where('pl.location_id', '=', Number(pick_up_location_id))
      .where('dl.location_id', '=', Number(drop_off_location_id));
  }

  if (pick_up_time && drop_off_time) {
    const isIntersectQrs = await db
      .selectFrom('car_rental as cr')
      .select('cr.car_id')
      .where((eb) =>
        eb.and([
          eb('cr.pick_up_time', '<=', drop_off_time),
          eb('cr.drop_off_time', '>=', pick_up_time)
        ])
      )
      .where('cr.status', '<>', 'cancel')
      .execute();

    if (isIntersectQrs.length > 0) {
      baseQuery = baseQuery.where(
        'c.id',
        'not in',
        isIntersectQrs.map((r) => r.car_id)
      );
    }
  }

  const carsQuery = baseQuery
    .select([
      'c.id',
      'c.description',
      'c.name',
      'c.price',
      'c.gasoline',
      'c.avg_rating',
      'c.rating_count',
      't.name as type',
      'i.image_link as image',
      's.name as steering',
      sql`split_part(ca.name, ' ', 1)`.as('capacity')
    ])
    .groupBy(['c.id', 't.name', 'ca.name', 'i.image_link', 's.name'])
    .limit(Number(limit))
    .offset(Number(offset));

  const totalCarsQuery = baseQuery.select(
    sql`count(DISTINCT c.id)`.as('total')
  );

  const cars = await carsQuery.execute();
  const totalCars = await totalCarsQuery.execute();

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      items: cars,
      pagination: {
        total: totalCars[0].total || 0,
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
