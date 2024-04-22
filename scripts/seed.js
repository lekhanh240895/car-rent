const {
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
} = require('../app/lib/placeholder-data.ts');
const bcrypt = require('bcrypt');
const { db } = require('@vercel/postgres');

async function seedUsers(client) {
  try {
    await client.sql`
    CREATE TYPE user_role AS ENUM ('user', 'admin');
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(255),
      full_name VARCHAR(255) NOT NULL,
      title VARCHAR(255),
      role user_role NOT NULL DEFAULT 'user',
      is_verified BOOLEAN NOT NULL DEFAULT false,    
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR(255) NOT NULL
  );  
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (email, image, full_name, role, is_verified, created_at, updated_at, password)
        VALUES (${user.email}, ${user.image}, ${user.full_name}, ${user.role}, ${user.is_verified}, ${user.created_at}, ${user.updated_at}, ${hashedPassword});
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCars(client) {
  try {
    // Create the "cars" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      capacity INT NOT NULL,
      steering INT NOT NULL,  
      gasoline INT NOT NULL,
      type INT NOT NULL,
      description VARCHAR(255) NOT NULL,
      avg_rating NUMERIC NOT NULL,
      rating_count INT NOT NULL,
      CONSTRAINT FK_TypeCar FOREIGN KEY (type) REFERENCES types(id),
      CONSTRAINT FK_SteeringCar FOREIGN KEY (steering) REFERENCES steerings(id),
      CONSTRAINT FK_CapacityCar FOREIGN KEY (capacity) REFERENCES capacities(id)
  );
    `;

    console.log(`Created "cars" table`);

    // Insert data into the "cars" table
    const insertedCars = await Promise.all(
      cars.map(async (car) => {
        const {
          name,
          price,
          capacity,
          steering,
          gasoline,
          type,
          description,
          avg_rating,
          rating_count
        } = car;
        return client.sql`
        INSERT INTO cars (name ,price ,capacity ,steering ,gasoline ,type , description, avg_rating, rating_count)
        VALUES (${name}, ${price}, ${capacity}, ${steering}, ${gasoline}, ${type}, ${description}, ${avg_rating}, ${rating_count});
      `;
      })
    );

    console.log(`Seeded ${insertedCars.length} cars`);

    return {
      createTable,
      cars: insertedCars
    };
  } catch (error) {
    console.error('Error seeding cars:', error);
    throw error;
  }
}

async function seedLocations(client) {
  try {
    // Create the "locations" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
  );
    `;

    console.log(`Created "locations" table`);

    // Insert data into the "locations" table
    const insertedLocations = await Promise.all(
      locations.map(async (location) => {
        const { name } = location;
        return client.sql`
        INSERT INTO locations (name)
        VALUES (${name});
      `;
      })
    );

    console.log(`Seeded ${insertedLocations.length} locations`);

    return {
      createTable,
      locations: insertedLocations
    };
  } catch (error) {
    console.error('Error seeding locations:', error);
    throw error;
  }
}

async function seedTypes(client) {
  try {
    // Create the "types" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      count INT NOT NULL DEFAULT 0
  );
    `;

    console.log(`Created "types" table`);

    // Insert data into the "types" table
    const insertedTypes = await Promise.all(
      types.map(async (type) => {
        const { name } = type;
        return client.sql`
        INSERT INTO types (name)
        VALUES (${name});
      `;
      })
    );

    console.log(`Seeded ${insertedTypes.length} types`);

    return {
      createTable,
      types: insertedTypes
    };
  } catch (error) {
    console.error('Error seeding types:', error);
    throw error;
  }
}

async function seedCapacities(client) {
  try {
    // Create the "types" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS capacities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      count INT NOT NULL DEFAULT 0
  );
    `;

    console.log(`Created "capacities" table`);

    // Insert data into the "capacities" table
    const insertedCapacities = await Promise.all(
      capacities.map(async (type) => {
        const { name } = type;
        return client.sql`
        INSERT INTO capacities (name)
        VALUES (${name});
      `;
      })
    );

    console.log(`Seeded ${insertedCapacities.length} capacities`);

    return {
      createTable,
      types: insertedCapacities
    };
  } catch (error) {
    console.error('Error seeding types:', error);
    throw error;
  }
}

async function seedSteerings(client) {
  try {
    // Create the "steerings" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS steerings (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
  );
    `;

    console.log(`Created "steerings" table`);

    // Insert data into the "steerings" table
    const insertedSteerings = await Promise.all(
      steerings.map(async (type) => {
        const { name } = type;
        return client.sql`
        INSERT INTO steerings (name) 
        VALUES (${name});
      `;
      })
    );

    console.log(`Seeded ${insertedSteerings.length} steerings`);

    return {
      createTable,
      steerings: insertedSteerings
    };
  } catch (error) {
    console.error('Error seeding steerings:', error);
    throw error;
  }
}

async function seedImages(client) {
  try {
    // Create the "images" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      car_id INTEGER REFERENCES cars(id),
      image_link TEXT,
      is_main BOOLEAN,
      description TEXT,
      title TEXT
  );
    `;

    console.log(`Created "images" table`);

    // Insert data into the "images" table
    const insertedImages = await Promise.all(
      images.map(async (image) => {
        const { car_id, image_link, is_main, description, title } = image;
        return client.sql`
        INSERT INTO images (car_id, image_link, is_main, description, title) 
        VALUES (${car_id}, ${image_link}, ${is_main}, ${description}, ${title});
      `;
      })
    );

    console.log(`Seeded ${insertedImages.length} images`);

    return {
      createTable,
      images: insertedImages
    };
  } catch (error) {
    console.error('Error seeding images:', error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    // Create the "reviews" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      car_id INT REFERENCES cars(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      content VARCHAR(255) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
    `;

    console.log(`Created "reviews" table`);

    // Insert data into the "reviews" table
    const insertedReviews = await Promise.all(
      reviews.map(async (image) => {
        const { user_id, content, rating, car_id } = image;
        return client.sql`
        INSERT INTO reviews (user_id, content, rating, car_id) 
        VALUES (${user_id}, ${content}, ${rating}, ${car_id});
      `;
      })
    );

    console.log(`Seeded ${insertedReviews.length} reviews`);

    return {
      createTable,
      reviews: insertedReviews
    };
  } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
}

async function seedCarPickUpLocations(client) {
  try {
    // Create the "car_pick_up_locations" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS car_pick_up_locations (
      car_id INT REFERENCES cars(id) ON DELETE CASCADE,
      location_id INT REFERENCES locations(id) ON DELETE CASCADE
  );
    `;

    console.log(`Created "car_pick_up_locations" table`);

    // Insert data into the "car_pick_up_locations" table
    const insertCarPickUpLocations = await Promise.all(
      car_pick_up_locations.map(async (image) => {
        const { car_id, location_id } = image;
        return client.sql`
        INSERT INTO car_pick_up_locations (car_id, location_id) 
        VALUES (${car_id}, ${location_id});
      `;
      })
    );

    console.log(
      `Seeded ${insertCarPickUpLocations.length} car_pick_up_locations`
    );

    return {
      createTable,
      car_pick_up_locations: insertCarPickUpLocations
    };
  } catch (error) {
    console.error('Error seeding car_pick_up_locations:', error);
    throw error;
  }
}

async function seedCarDropOffLocations(client) {
  try {
    // Create the "car_drop_off_locations" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS car_drop_off_locations (
      car_id INT REFERENCES cars(id) ON DELETE CASCADE,
      location_id INT REFERENCES locations(id) ON DELETE CASCADE
  );
    `;

    console.log(`Created "car_drop_off_locations" table`);

    // Insert data into the "car_drop_off_locations" table
    const insertCarDropOffLocations = await Promise.all(
      car_drop_off_locations.map(async (image) => {
        const { car_id, location_id } = image;
        return client.sql`
        INSERT INTO car_drop_off_locations (car_id, location_id) 
        VALUES (${car_id}, ${location_id});
      `;
      })
    );

    console.log(
      `Seeded ${insertCarDropOffLocations.length} car_drop_off_locations`
    );

    return {
      createTable,
      car_drop_off_locations: insertCarDropOffLocations
    };
  } catch (error) {
    console.error('Error seeding car_drop_off_locations:', error);
    throw error;
  }
}

async function seedPromoCodes(client) {
  try {
    // Create the "promo_codes" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS promo_codes (
      id SERIAL PRIMARY KEY,
      code VARCHAR(50) NOT NULL UNIQUE,
      value DECIMAL(10, 2) NOT NULL CHECK (value >= 0 AND value <= 100)
    );
    `;

    console.log(`Created "promo_codes" table`);

    // Insert data into the "promo_codes" table
    const insertPromoCodes = await Promise.all(
      promo_codes.map(async (promo) => {
        const { code, value } = promo;
        return client.sql`
        INSERT INTO promo_codes (code, value) 
        VALUES (${code}, ${value});
      `;
      })
    );

    console.log(`Seeded ${insertPromoCodes.length} promo_codes`);

    return {
      createTable,
      promo_codes: insertPromoCodes
    };
  } catch (error) {
    console.error('Error seeding promo_codes:', error);
    throw error;
  }
}

async function seedCarRentals(client) {
  try {
    // Create the "car_rentals" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE car_rental (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      car_id INT NOT NULL,
      user_id UUID NOT NULL,
      status VARCHAR(255),
      pick_up_time VARCHAR(255) NOT NULL,
      drop_off_time VARCHAR(255) NOT NULL,
      pick_up_location VARCHAR(255) NOT NULL,
      drop_off_location VARCHAR(255) NOT NULL,
      billing_name VARCHAR(255) NOT NULL,
      billing_phone_number VARCHAR(20) NOT NULL,
      billing_address VARCHAR(255) NOT NULL,
      billing_city VARCHAR(100) NOT NULL,
      subtotal INT NOT NULL,
      tax INT NOT NULL,
      discount INT NOT NULL,
      total INT NOT NULL,
      payment_method VARCHAR(100) NOT NULL,
      rental_days INT NOT NULL,
      invoice_url VARCHAR(255),
      FOREIGN KEY (car_id) REFERENCES cars(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
  );
    `;
    console.log(`Created "car_rentals" table`);
    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding car_rentals:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  // await seedUsers(client);
  // await seedCars(client);
  // await seedLocations(client);
  // await seedTypes(client);
  // await seedSteerings(client);
  // await seedCapacities(client);
  // await seedImages(client);
  // await seedReviews(client);
  // await seedCarPickUpLocations(client);
  // await seedCarDropOffLocations(client);
  // await seedPromoCodes(client);
  await seedCarRentals(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
