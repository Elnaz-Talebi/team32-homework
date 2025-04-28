
CREATE DATABASE language_learning_app;
USE language_learning_app;
--Table: user
CREATE TABLE user (
    user_id BIGINT,
    username VARCHAR(255),
    email VARCHAR(255),
    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

--Table: word
CREATE TABLE word (
    word_id BIGINT,
    word_text VARCHAR(255),
    CONSTRAINT pk_word PRIMARY KEY (word_id)
);

--Table: user_word
CREATE TABLE user_word (
    user_word_id BIGINT,
    user_id BIGINT,
    word_id BIGINT,
    CONSTRAINT pk_user_word PRIMARY KEY (user_word_id),
    CONSTRAINT fk_user_word_user FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_word_word FOREIGN KEY (word_id) REFERENCES word(word_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

--Table: language
CREATE TABLE language (
    language_id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

--Table: word_language
CREATE TABLE word_language (
    word_id BIGINT,
    language_id BIGINT,
    translate VARCHAR(255),
    learned_at DATETIME,
    PRIMARY KEY (word_id, language_id),
    FOREIGN KEY (language_id) REFERENCES language(language_id),
    CONSTRAINT fk_word_language_word FOREIGN KEY (word_id) REFERENCES word(word_id)
    ON DELETE CASCADE ON UPDATE CASCADE
    
);
