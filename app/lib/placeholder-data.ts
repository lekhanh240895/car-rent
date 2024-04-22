const users = [
  {
    email: 'user1@example.com',
    image: '/avatar-placeholder.jpeg',
    full_name: 'John Doe',
    role: 'user',
    is_verified: true,
    created_at: new Date('2023-01-15'),
    updated_at: new Date('2023-01-15'),
    password: 'Rimdaica123',
    title: 'Engineer'
  },
  {
    email: 'user2@example.com',
    image: '/avatar-placeholder.jpeg',
    full_name: 'Jane Smith',
    role: 'admin',
    is_verified: true,
    created_at: new Date('2023-02-20'),
    updated_at: new Date('2023-02-20'),
    password: 'Rimdaica123',
    title: 'Front-end Developer'
  }
];

const reviews = [
  {
    user_id: '624dc786-6bb7-4fcd-a2f7-6ae5aaadd851',
    content: 'Great product! Highly recommend it.',
    rating: 5,
    car_id: 1
  },
  {
    user_id: '624dc786-6bb7-4fcd-a2f7-6ae5aaadd851',
    content: 'The product is good but could use some improvements.',
    rating: 4,
    car_id: 2
  },
  {
    user_id: '722540f4-1e35-4ae6-ba2b-8cb7deed6e37',
    content: 'Not satisfied with the product.',
    rating: 2,
    car_id: 3
  }
];

const cars = [
  {
    name: 'Toyota Corolla',
    price: '25',
    capacity: 1,
    steering: 1,
    gasoline: 4,
    type: 1,
    description:
      'A comfortable and fuel-efficient compact car ideal for city driving.',
    avg_rating: 4.5,
    rating_count: 150
  },
  {
    name: 'Honda Accord',
    price: '35',
    capacity: 2,
    steering: 1,
    gasoline: 5,
    type: 2,
    description: 'A spacious SUV with advanced features and a powerful engine.',
    avg_rating: 3,
    rating_count: 10
  },
  {
    name: 'BMW S400',
    price: '150',
    capacity: 4,
    steering: 2,
    gasoline: 8,
    type: 3,
    description:
      'A luxury sedan with top-notch comfort and cutting-edge technology.',
    avg_rating: 5,
    rating_count: 20
  }
];

const locations = [
  {
    name: 'Da Nang'
  },
  {
    name: 'Quang Nam'
  },
  {
    name: 'Hai Phong'
  }
];

const types = [
  {
    name: 'SUV'
  },
  {
    name: 'Sport'
  },
  {
    name: 'Sedan'
  }
];

const capacities = [
  {
    name: '2 person'
  },
  {
    name: '4 person'
  },
  {
    name: '6 person'
  },
  {
    name: '8 or more'
  }
];

const steerings = [
  {
    name: 'manual'
  },
  {
    name: 'electric'
  }
];

const images = [
  {
    car_id: 1,
    image_link: '/car1.png',
    is_main: true,
    title: 'Side View',
    description: 'Side view of the car'
  },
  {
    car_id: 1,
    image_link: '/car1.1.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  },
  {
    car_id: 1,
    image_link: '/car1.2.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  },
  {
    car_id: 2,
    image_link: '/car2.png',
    is_main: true,
    title: 'Side View',
    description: 'Side view of the car'
  },
  {
    car_id: 2,
    image_link: '/car2.1.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  },
  {
    car_id: 2,
    image_link: '/car2.2.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  },
  {
    car_id: 3,
    image_link: '/car3.png',
    is_main: true,
    title: 'Side View',
    description: 'Side view of the car'
  },
  {
    car_id: 3,
    image_link: '/car3.1.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  },
  {
    car_id: 3,
    image_link: '/car3.2.jpg',
    is_main: false,
    title: 'Inside View',
    description: 'Inside view of the car'
  }
];

const car_pick_up_locations = [
  {
    car_id: 1,
    location_id: 1
  },
  {
    car_id: 1,
    location_id: 2
  },
  {
    car_id: 1,
    location_id: 3
  },
  {
    car_id: 2,
    location_id: 1
  },
  {
    car_id: 1,
    location_id: 3
  },
  {
    car_id: 3,
    location_id: 1
  },
  {
    car_id: 3,
    location_id: 2
  }
];

const car_drop_off_locations = [
  {
    car_id: 1,
    location_id: 1
  },
  {
    car_id: 1,
    location_id: 2
  },
  {
    car_id: 1,
    location_id: 3
  },
  {
    car_id: 2,
    location_id: 1
  },
  {
    car_id: 1,
    location_id: 3
  },
  {
    car_id: 3,
    location_id: 1
  },
  {
    car_id: 3,
    location_id: 2
  }
];

const promo_codes = [
  {
    id: 1,
    code: 'promo30',
    value: 30
  },
  {
    id: 2,
    code: 'promo70',
    value: 70
  },
  {
    id: 3,
    code: 'promo100',
    value: 100
  }
];

module.exports = {
  users,
  cars,
  locations,
  types,
  steerings,
  capacities,
  images,
  reviews,
  car_pick_up_locations,
  car_drop_off_locations,
  promo_codes
};
