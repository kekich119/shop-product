CREATE TABLE "cart"
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES product (id),
    quantity   INTEGER,
    added_at   DATE
);