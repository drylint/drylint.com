SET NAMES UTF8;

DROP DATABASE IF EXISTS app;

CREATE DATABASE IF NOT EXISTS app CHARSET = UTF8;

USE app;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id BIGINT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    age INT,
    PRIMARY KEY (user_id)
);


INSERT INTO users(user_name, age) VALUES
('孙一', 50),
('赵二', NULL),
('张三', 20),
('李四', 17),
('王五', 30);

SELECT * FROM users;
