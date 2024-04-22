import initTranslations from '@/app/i18n';
import { ApiError, handleError } from '@/app/lib/exceptions';
import { db, sql } from '@/app/lib/kysely';
import { createOrder } from '@/app/lib/paypal';
import { calculateNumberOfDays, verifyToken } from '@/app/lib/utils';
import { TFunction } from 'i18next';
import { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import * as yup from 'yup';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') || 10;
  const offset = searchParams.get('offset') || 0;
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

  const rentalList = await db
    .selectFrom('car_rental as cr')
    .innerJoin('cars as c', 'c.id', 'cr.car_id')
    .select([
      'c.name as car_name',
      'c.price as car_price',
      'cr.total',
      'cr.payment_method',
      'cr.created_at',
      'cr.status',
      'cr.id'
    ])
    .where('cr.user_id', '=', user_id)
    .limit(Number(limit))
    .offset(Number(offset))
    .orderBy('cr.created_at desc')
    .execute();

  const totalRentals = await db
    .selectFrom('car_rental as cr')
    .where('cr.user_id', '=', user_id)
    .select(sql`count(*)`.as('total'))
    .execute();

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      items: rentalList,
      pagination: {
        total: totalRentals[0].total || 0,
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

export async function POST(req: Request) {
  const {
    billing_info: { name, phone_number, address, city },
    rental_info: {
      car_id,
      pick_up_location_id,
      pick_up_time,
      drop_off_location_id,
      drop_off_time
    },
    payment_method,
    promo_code,
    displayed_total
  } = await req.json();
  const lang = headers().get('Accept-Language') || 'en';
  const access_token = headers().get('Authorization')?.split(' ')[1];
  const { t } = await initTranslations(lang, ['payment', 'common']);

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
  try {
    await paymentSchema(t).validate(
      {
        billing_info: { name, phone_number, address, city },
        rental_info: {
          car_id,
          pick_up_location_id,
          pick_up_time,
          drop_off_location_id,
          drop_off_time
        },
        payment_method,
        displayed_total
      },
      {
        abortEarly: false
      }
    );
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const apiError = ApiError.fromYupError(error, 'PA-001');
      return handleError(apiError, 400);
    } else {
      const apiError = ApiError.fromUnexpected();
      return handleError(apiError, 500);
    }
  }

  const carDetail = await db
    .selectFrom('cars as c')
    .innerJoin('types as t', 't.id', 'c.type')
    .innerJoin('steerings as s', 's.id', 'c.steering')
    .innerJoin('capacities as ca', 'ca.id', 'c.capacity')
    .innerJoin('images as i', 'i.car_id', 'c.id')
    .where('c.id', '=', car_id)
    .select([
      'c.name as car_name',
      'c.price as car_price',
      't.name as car_type',
      's.name as car_steering',
      'ca.name as car_capacity',
      'c.gasoline as car_gasoline',
      'i.image_link as car_image'
    ])
    .where('c.id', '=', car_id)
    .executeTakeFirst();

  if (!carDetail) {
    const error = ApiError.fromNotFoundCar();
    return handleError(error, 404);
  }

  const pick_up_location = await db
    .selectFrom('car_pick_up_locations as cp')
    .where('cp.location_id', '=', pick_up_location_id)
    .where('cp.car_id', '=', car_id)
    .innerJoin('locations', 'location_id', 'cp.location_id')
    .select('locations.name')
    .executeTakeFirst();

  const drop_off_location = await db
    .selectFrom('car_drop_off_locations as cd')
    .where('cd.location_id', '=', drop_off_location_id)
    .where('cd.car_id', '=', car_id)
    .innerJoin('locations', 'location_id', 'cd.location_id')
    .select('locations.name')
    .executeTakeFirst();

  if (!pick_up_location || !drop_off_location) {
    const error = ApiError.fromInvalidRentalPlace();
    return handleError(error, 400);
  }

  // Create car_rental tables
  await db.schema
    .createTable('car_rental')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('created_at', 'timestamp', (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .addColumn('car_id', 'integer', (cb) => cb.notNull())
    .addColumn('user_id', 'uuid', (cb) => cb.notNull())
    .addColumn('status', 'varchar(255)')
    .addColumn('pick_up_time', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('drop_off_time', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('pick_up_location', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('drop_off_location', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('billing_name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('billing_phone_number', 'varchar(20)', (cb) => cb.notNull())
    .addColumn('billing_address', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('billing_city', 'varchar(100)', (cb) => cb.notNull())
    .addColumn('subtotal', 'decimal(10, 2)', (cb) => cb.notNull())
    .addColumn('tax', 'decimal(20, 2)', (cb) => cb.notNull())
    .addColumn('discount', 'decimal(20, 2)', (cb) => cb.notNull())
    .addColumn('total', 'decimal(20, 2)', (cb) => cb.notNull())
    .addColumn('payment_method', 'varchar(100)', (cb) => cb.notNull())
    .addColumn('rental_days', 'integer', (cb) => cb.notNull())
    .addColumn('invoice_url', 'varchar(255)')
    .execute();

  const isIntersectQrs = await db
    .selectFrom('car_rental as cr')
    .leftJoin('car_pick_up_locations as pl', 'pl.car_id', 'cr.car_id')
    .leftJoin('car_drop_off_locations as dl', 'dl.car_id', 'cr.car_id')
    .select('cr.car_id')
    .where((eb) =>
      eb.and([
        eb('cr.pick_up_time', '<=', drop_off_time),
        eb('cr.drop_off_time', '>=', pick_up_time)
      ])
    )
    .where('pl.location_id', '=', Number(pick_up_location_id))
    .where('dl.location_id', '=', Number(drop_off_location_id))
    .where('cr.status', '<>', 'cancel')
    .where('cr.car_id', '=', car_id)
    .execute();

  if (isIntersectQrs.length > 0) {
    const apiError = ApiError.fromInvalidRentalTime();
    return handleError(apiError, 400);
  }

  const rental_days = calculateNumberOfDays(pick_up_time, drop_off_time);
  const price = Number(carDetail.car_price);
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

  if (displayed_total !== total.toFixed(2)) {
    const error = ApiError.fromInvalidRentalPrice();
    return handleError(error, 400);
  }

  const newRental = await db
    .insertInto('car_rental')
    .values({
      billing_name: name,
      billing_phone_number: phone_number,
      billing_address: address,
      billing_city: city,
      payment_method,
      car_id,
      pick_up_location: pick_up_location!.name,
      pick_up_time,
      drop_off_location: drop_off_location!.name,
      drop_off_time,
      user_id,
      status: 'complete',
      subtotal,
      tax,
      discount,
      total,
      rental_days,
      invoice_url: ''
    })
    .returningAll()
    .executeTakeFirst();

  if (!newRental) {
    const error = ApiError.fromUnexpected();
    return handleError(error, 500);
  }

  if (payment_method === 'PAYPAL') {
    const { jsonResponse, httpStatusCode } = await createOrder({
      billing_info: { name, phone_number, address, city },
      payment_method,
      car_id,
      subtotal,
      tax,
      discount,
      total,
      rental_days
    });
    const { id, error } = jsonResponse;

    if (error) {
      await db
        .deleteFrom('car_rental')
        .where('car_rental.id', '=', newRental.id)
        .executeTakeFirst();
      const apiError = ApiError.fromPaypalOrder();
      return handleError(apiError, 400);
    }

    return Response.json(
      {
        status: httpStatusCode,
        message: 'Success',
        data: {
          rental_id: newRental.id,
          transaction_id: id
        }
      },
      {
        status: httpStatusCode
      }
    );
  }

  return Response.json({
    status_code: 201,
    message: 'Success',
    data: {
      rental_id: newRental.id
    }
  });
}

const paymentSchema = (t: TFunction<[string, string], undefined>) => {
  return yup.object().shape({
    billing_info: yup.object().shape({
      name: yup
        .string()
        .required(
          t('common:error_messages.field_required', {
            field: t('name_field')
          })
        )
        .max(
          255,
          t('common:error_messages.max_length', {
            field: `${t('name_field')}`,
            number: 255
          })
        ),
      address: yup.string().required(
        t('common:error_messages.field_required', {
          field: t('address_field')
        })
      ),
      phone_number: yup.string().required(
        t('common:error_messages.field_required', {
          field: t('phone_field')
        })
      ),
      city: yup.string().required(t('common:error_messages.city_required'))
    }),
    payment_method: yup.string().required(
      t('common:error_messages.field_required', {
        field: t('payment_method_title')
      })
    ),
    rental_info: yup.object().shape({
      car_id: yup.number().required(
        t('common:error_messages.field_required', {
          field: 'car_id'
        })
      ),
      pick_up_location_id: yup.number().required(
        t('common:error_messages.field_required', {
          field: 'pick_up_location_id'
        })
      ),
      pick_up_time: yup.string().required(
        t('common:error_messages.field_required', {
          field: 'pick_up_time'
        })
      ),
      drop_off_location_id: yup.number().required(
        t('common:error_messages.field_required', {
          field: 'drop_off_location_id'
        })
      ),
      drop_off_time: yup.string().required(
        t('common:error_messages.field_required', {
          field: 'drop_off_time'
        })
      )
    }),
    displayed_total: yup.number().required(
      t('common:error_messages.field_required', {
        field: t('displayed_total')
      })
    )
  });
};
