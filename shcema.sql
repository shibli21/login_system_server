CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) ,
    email text UNIQUE NOT NULL,
    joined TIMESTAMP NOT NULL
);