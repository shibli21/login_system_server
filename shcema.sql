
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) ,
    email text UNIQUE NOT NULL,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login
(
    id SERIAL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL,
    joined TIMESTAMP NOT NULL
);


