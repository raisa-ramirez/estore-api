CREATE DATABASE estore_api;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
