# rs-23-team-3-fe

## Getting Started

1. Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. Run the Node.js server:

```bash
npm install
npm run build
npm start
```

3. Automated i18n Translation

- Create .env.local in folder app/local
- Add Configuration Variables in .env.local:

```bash
I18N_INPUT=./Multilanguage_Project_CarRent.xlsx  #Link to multilanguage files
I18N_SHEETS=Sheet1 #Sheet to be translated
I18N_OUTPUT=./app/locales #Output folder
```

- Create locale files in output folder (./app/locales): en & vi
- Run i18n Translation:

```bash
npm run locales
```

- Seed data

```bash
npm run seed
```

- Add more cars:

```bash
INSERT INTO cars (name ,price ,capacity ,steering ,gasoline ,type , description, avg_rating, rating_count)
SELECT name ,price ,capacity ,steering ,gasoline ,type , description, avg_rating, rating_count
FROM cars;
```

- Add more images:

```bash
INSERT INTO images (car_id, image_link, is_main, description, title)
SELECT car_id + (SELECT MAX(car_id) FROM images), image_link, is_main, description, title
FROM images;
```

- Create car rentals:

```bash
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
    subtotal VARCHAR(20) NOT NULL,
    tax VARCHAR(20) NOT NULL,
    discount VARCHAR(20) NOT NULL,
    total VARCHAR(20) NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    rental_days INT NOT NULL,
    invoice_url VARCHAR(255),
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

# For testing purposes

curl -X POST -H "Content-Type: application/json" -d '{"email": "ema1@example.com", "password": "Rimdaica123", "confirm_password": "Rimdaica123", "full_name": "User 1"}' http://localhost:3000/api/v1/auth/register

curl -X POST -H "Content-Type: application/json" -d '{"email": "ema2@example.com", "password": "Rimdaica123", "confirm_password": "Rimdaica123", "full_name": "User 2"}' http://localhost:3000/api/v1/auth/register

curl -X POST -H "Content-Type: application/json" -d '{"email": "ema3@example.com", "password": "Rimdaica123", "confirm_password": "Rimdaica123", "full_name": "User 3"}' http://localhost:3000/api/v1/auth/register

curl -X POST -H "Content-Type: application/json" -d '{"email": "ema4@example.com", "password": "Rimdaica123", "confirm_password": "Rimdaica123", "full_name": "User 4"}' http://localhost:3000/api/v1/auth/register

curl -X POST -H "Content-Type: application/json" -d '{"email": "ema5@example.com", "password": "Rimdaica123", "confirm_password": "Rimdaica123", "full_name": "User 5"}' http://localhost:3000/api/v1/auth/register
