CREATE DATABASE mealsharing DEFAULT CHARACTER SET = 'utf8mb4';

use mealsharing;

-- Create the Meal table
CREATE TABLE Meal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    `when` DATETIME,
    max_reservations INT,
    price DECIMAL(10, 2),
    created_date DATE
);

-- Create the Reservation table
CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number_of_guests INT,
    meal_id INT,
    created_date DATE,
    contact_phonenumber VARCHAR(20),
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    FOREIGN KEY (meal_id) REFERENCES Meal (id)
);

-- Create the Review table
CREATE TABLE Review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    meal_id INT,
    stars INT,
    created_date DATE,
    FOREIGN KEY (meal_id) REFERENCES Meal (id)
);

INSERT INTO
    Meal (
        title,
        description,
        location,
        `when`,
        max_reservations,
        price,
        created_date
    )
VALUES (
        'Spaghetti Bolognese',
        'Classic Italian pasta with meat sauce',
        'Rome',
        CURRENT_TIMESTAMP,
        12,
        85.00,
        CURRENT_DATE
    ),
    (
        'Sushi Platter',
        'Assorted sushi rolls and sashimi',
        'Tokyo',
        CURRENT_TIMESTAMP,
        20,
        150.00,
        CURRENT_DATE
    ),
    (
        'Vegetable Curry',
        'Spicy Indian curry with seasonal vegetables',
        'Delhi',
        CURRENT_TIMESTAMP,
        10,
        70.00,
        CURRENT_DATE
    ),
    (
        'Cheeseburger',
        'Beef burger with cheese and fries',
        'New York',
        CURRENT_TIMESTAMP,
        15,
        95.00,
        CURRENT_DATE
    ),
    (
        'Pad Thai',
        'Thai noodles with tamarind sauce and shrimp',
        'Bangkok',
        CURRENT_TIMESTAMP,
        18,
        110.00,
        CURRENT_DATE
    );

INSERT INTO
    Reservation (
        id,
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email
    )
VALUES (
        1,
        4,
        1,
        CURRENT_DATE,
        '11111111',
        'Alice Green',
        'alice@example.com'
    ),
    (
        2,
        2,
        2,
        CURRENT_DATE,
        '22222222',
        'Bob Smith',
        'bob@example.com'
    ),
    (
        3,
        5,
        3,
        CURRENT_DATE,
        '33333333',
        'Charlie Lee',
        'charlie@example.com'
    ),
    (
        4,
        3,
        1,
        CURRENT_DATE,
        '44444444',
        'Diana Ross',
        'diana@example.com'
    ),
    (
        5,
        6,
        4,
        CURRENT_DATE,
        '55555555',
        'Ethan Hunt',
        'ethan@example.com'
    ),
    (
        6,
        2,
        5,
        CURRENT_DATE,
        '66666666',
        'Fiona Chen',
        'fiona@example.com'
    );

INSERT INTO
    Review (
        id,
        title,
        description,
        meal_id,
        stars,
        created_date
    )
VALUES (
        1,
        'Tasty and satisfying',
        'Spaghetti was cooked perfectly',
        1,
        5,
        CURRENT_DATE
    ),
    (
        2,
        'Fresh and flavorful',
        'Sushi was very fresh and well presented',
        2,
        4,
        CURRENT_DATE
    ),
    (
        3,
        'Spicy but delicious',
        'Vegetable curry had great depth of flavor',
        3,
        4,
        CURRENT_DATE
    ),
    (
        4,
        'Too greasy',
        'Burger was tasty but a bit too oily',
        4,
        3,
        CURRENT_DATE
    ),
    (
        5,
        'Authentic taste',
        'Pad Thai reminded me of street food in Bangkok',
        5,
        5,
        CURRENT_DATE
    );

-- 1. Get all meals
SELECT * FROM Meal;

-- 2. Insert a new meal
INSERT INTO
    Meal (
        title,
        description,
        location,
        `when`,
        max_reservations,
        price,
        created_date
    )
VALUES (
        'Pho',
        'Traditional Vietnamese noodle soup with beef and herbs',
        'Hanoi',
        CURRENT_TIMESTAMP,
        25,
        95.00,
        CURRENT_DATE
    );

-- 3. Get a meal with a specific ID
SELECT * FROM Meal WHERE id = 7;

-- 4. Update a meal by ID
UPDATE Meal SET title = 'Pho Bo', price = 100.00 WHERE id = 7;

-- 5. Delete a meal by ID
DELETE FROM Meal WHERE id = 7;

-- 1. Get all reservations
SELECT * FROM Reservation;

-- 2. Add a new reservation
INSERT INTO
    Reservation (
        id,
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email
    )
VALUES (
        7,
        3,
        2,
        CURRENT_DATE,
        '77777777',
        'Gabriel Soto',
        'gabriel@example.com'
    );

-- 3. Get a reservation by ID
SELECT * FROM Reservation WHERE id = 7;

-- 4. Update a reservation
UPDATE Reservation
SET
    number_of_guests = 5,
    contact_name = 'Gabriel Silva'
WHERE
    id = 7;

-- 5. Delete a reservation by ID
DELETE FROM Reservation WHERE id = 7;

-- 1. Get all reviews
SELECT * FROM Review;

-- 2. Add a new review
INSERT INTO
    Review (
        id,
        title,
        description,
        meal_id,
        stars,
        created_date
    )
VALUES (
        6,
        'Delicious and comforting',
        'Pad Thai was rich in flavor and nicely balanced.',
        5,
        5,
        CURRENT_DATE
    );

-- 3. Get a review by ID
SELECT * FROM Review WHERE id = 6;

-- 4. Update a review
UPDATE Review
SET
    title = 'Excellent Pad Thai',
    stars = 4
WHERE
    id = 6;

-- 5. Delete a review by ID
DELETE FROM Review WHERE id = 6;

-- 1. Get meals with a price smaller than 90
SELECT * FROM Meal WHERE price < 90;

-- 2. Get meals that still have available reservations
SELECT m.id, m.title, m.max_reservations, r.total_guests, m.max_reservations - r.total_guests AS available_meal
FROM Meal m
    LEFT JOIN (
        SELECT meal_id, SUM(number_of_guests) AS total_guests
        FROM Reservation
        GROUP BY
            meal_id
    ) r ON m.id = r.meal_id
WHERE
    COALESCE(r.total_guests, 0) < m.max_reservations;

-- 3. Get meals that partially match a title
SELECT * FROM Meal WHERE title LIKE '%Curry%';

-- 4. Get meals created between two dates
SELECT *
FROM Meal
WHERE
    created_date BETWEEN '2025-01-01' AND '2025-05-01';

-- 5. Get only 3 meals
SELECT * FROM Meal LIMIT 3;

-- 6. Get meals that have good review
SELECT m.title, ROUND(r.avg_rating) AS avg_rating
FROM Meal m
    JOIN (
        SELECT meal_id, AVG(stars) AS avg_rating
        FROM Review
        GROUP BY
            meal_id
    ) r ON m.id = r.meal_id
WHERE
    r.avg_rating >= 4;

-- 7. Get reservations for a specific meal, sorted by created_date
SELECT * FROM Reservation WHERE meal_id = 5 ORDER BY created_date;

-- 8. Sort all meals by average number of stars in reviews
SELECT m.*, AVG(r.stars) AS avg_stars
FROM Meal m
    LEFT JOIN Review r ON m.id = r.meal_id
GROUP BY
    m.id
ORDER BY avg_stars DESC;