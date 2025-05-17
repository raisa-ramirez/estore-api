CREATE DATABASE estore_api;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
