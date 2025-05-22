CREATE DATABASE social_media DEFAULT CHARACTER SET = 'utf8mb4';

use social_media;

-- USERS TABLE
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    registration_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- POSTS TABLE
CREATE TABLE Post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    creation_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_datetime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
);

-- COMMENTS TABLE
CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    creation_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_datetime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Comment (id) ON DELETE CASCADE
);

-- REACTIONS TABLE
CREATE TABLE Reaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT DEFAULT NULL,
    comment_id INT DEFAULT NULL,
    reaction_type ENUM(
        'like',
        'highfive',
        'laugh',
        'cry'
    ) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comment (id) ON DELETE CASCADE,
    UNIQUE (
        user_id,
        post_id,
        reaction_type
    ),
    UNIQUE (
        user_id,
        comment_id,
        reaction_type
    )
);

-- Friendship Table
CREATE TABLE Friendship (
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id_1, user_id_2),
    FOREIGN KEY (user_id_1) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES User (id) ON DELETE CASCADE
);

-- Users
INSERT INTO
    User (name, email, password)
VALUES (
        'Alice',
        'alice@example.com',
        'alice123'
    ),
    (
        'Bob',
        'bob@example.com',
        'bob123'
    ),
    (
        'Charlie',
        'charlie@example.com',
        'charlie123'
    );

-- Posts
INSERT INTO
    Post (title, content, user_id)
VALUES (
        'First Post!',
        'Hello world from Alice',
        1
    ),
    (
        'feeling',
        'I love programming.',
        2
    );

-- Comments
INSERT INTO
    Comment (content, user_id, post_id)
VALUES ('Great post!', 2, 1),
    ('Thanks Bob!', 1, 2);

-- Reactions to post
INSERT INTO
    Reaction (
        user_id,
        post_id,
        reaction_type
    )
VALUES (1, 2, 'like'),
    (2, 1, 'laugh');

-- Reactions to comment
INSERT INTO
    Reaction (
        user_id,
        comment_id,
        reaction_type
    )
VALUES (1, 2, 'like'),
    (2, 1, 'laugh');

-- Friendships
INSERT INTO Friendship (user_id_1, user_id_2) VALUES (1, 2), (1, 3);