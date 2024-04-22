import { Generated, ColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import { UUID } from 'crypto';

interface UserTable {
  id: Generated<UUID>;
  email: string;
  image: string;
  full_name: string;
  role: string;
  is_verified: false;
  createdAt: ColumnType<Date, string | undefined, never>;
}

interface CarTable {
  id: Generated<number>;
  description: string;
  price: string;
  capacity: number;
  steering: string;
  gasoline: number;
  type: string;
  avg_rating: number;
  rating_count: number;
  name: string;
}

interface TypeTable {
  id: Generated<number>;
  name: string;
}

interface CapacityTable {
  id: Generated<number>;
  name: string;
}

interface SteeringTable {
  id: Generated<number>;
  name: string;
}

interface LocationTable {
  id: Generated<number>;
  name: string;
}

interface PickUpLocationTable {
  location_id: number;
  car_id: number;
}

interface DropOffLocationTable {
  location_id: number;
  car_id: number;
}

interface CarRentalTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  car_id: number;
  user_id: UUID;
  status: 'cancel' | 'complete' | 'pending';
  pick_up_time: string;
  drop_off_time: string;
  pick_up_location: string;
  drop_off_location: string;
  billing_name: string;
  billing_phone_number: string;
  billing_address: string;
  billing_city: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  payment_method: 'PAYPAL' | 'COD';
  rental_days: number;
  invoice_url: string | null;
}

interface ImageTable {
  id: Generated<number>;
  car_id: number;
  image_link: string;
  is_main: boolean;
  title: string;
  description: string;
}

interface PromoCodeTable {
  id: Generated<number>;
  code: string;
  value: number;
}

interface PaymentTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  car_rental_id: number;
  user_id: UUID;
  status: 'cancel' | 'complete' | 'pending';
  transaction_id?: string;
  method: 'PAYPAL' | 'COD';
}

export interface Database {
  users: UserTable;
  cars: CarTable;
  types: TypeTable;
  capacities: CapacityTable;
  steerings: SteeringTable;
  images: ImageTable;
  car_pick_up_locations: PickUpLocationTable;
  car_drop_off_locations: DropOffLocationTable;
  locations: LocationTable;
  car_rental: CarRentalTable;
  promo_codes: PromoCodeTable;
  payment: PaymentTable;
}

export const db = createKysely<Database>();
export { sql } from 'kysely';
