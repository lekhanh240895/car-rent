interface CustomError {
  error_id: string;
  code: string;
  title: string;
  message: string;
  errors: [
    {
      error_id: string;
      code: string;
      title: string;
      message: string;
      field: string;
    }
  ];
}
interface User {
  id: number;
  email: string;
  image: string;
  full_name: string;
  role: string;
  is_verified: false;
  created_at: Date;
  updated_at: Date;
}

interface FilterType {
  id: number;
  name: string;
  count: number;
}

interface FilterLocation {
  id: number;
  name: string;
}
interface Filters {
  types: FilterType[];
  capacities: FilterType[];
  price: {
    max: number;
  };
}

interface Car {
  id: number;
  name: string;
  price: string;
  capacity: number;
  steering: string;
  gasoline: number;
  type: string;
  image: string;
}

interface SearchResult<T> {
  items: T;
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
  link: {
    self: string;
    next: string;
    last: string;
  };
}

interface CarDetail {
  id: number;
  description: string;
  price: string;
  capacity: number;
  steering: string;
  gasoline: number;
  type: string;
  images: {
    image_link: string;
    description: string;
    title: string;
  }[];
  avg_rating: number;
  rating_count: number;
  name: string;
  pick_up_locations: FilterLocation[];
  drop_off_locations: FilterLocation[];
}

interface RentalSummary {
  subtotal: number;
  tax: number;
  total: number;
}

interface Order {
  id: number;
  car_name: string;
  total: number;
  payment_method: string;
  created_at: string;
  status: string;
}
interface OrderDetail {
  id: number;
  car_id: number;
  pick_up_time: string;
  pick_up_location: string;
  drop_off_time: string;
  drop_off_location: string;
  car_name: string;
  car_price: string;
  car_type: string;
  car_capacity: number;
  car_steering: string;
  car_gasoline: number;
  car_image: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  status: string;
  created_at: string;
  payment_method: string;
  rental_days: number;
  invoice_url: string | null;
}
interface Review {
  id: number;
  user_name: string;
  user_title: string;
  user_image: string;
  content: string;
  rating: number;
  updated_at: string;
}
