INSERT INTO
    task (
        title,
        description,
        created,
        updated,
        due_date,
        status_id,
        user_id
    )
VALUES (
        'Garden duties',
        'plant flowers',
        '2025-04-27 09:11:11',
        '2025-04-28 10:11:11',
        '2025-04-28 10:11:11',
        3,
        1
    );

UPDATE task SET title = 'Wash dishes' WHERE title = 'Garden duties';

UPDATE task
SET
    due_date = '2025-04-28 10:22:22'
WHERE
    description = 'plant flowers';

UPDATE task SET status_id = 2 WHERE description = 'plant flowers';

UPDATE task SET status_id = 3 WHERE description = 'plant flowers';

DELETE FROM task WHERE title = 'Wash dishes';

CREATE DATABASE school;

USE school;

CREATE TABLE class (
    id INT,
    name VARCHAR(255),
    begins DATE,
    ends DATE
);

ALTER TABLE class ADD PRIMARY KEY (id);

CREATE TABLE student (
    id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    class_id INT
);

ALTER TABLE student ADD FOREIGN KEY (class_id) REFERENCES class (id);

CREATE INDEX idx_student_name ON student (name);

ALTER TABLE class
ADD COLUMN status ENUM(
    DEFAULT 'not-started',
    'ongoing',
    'finished'
);