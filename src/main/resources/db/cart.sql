CREATE TABLE "cart"
(
    id         INTEGER PRIMARY KEY,
    user_id    INTEGER REFERENCES "user" (id),
    product_id INTEGER REFERENCES product (id),
    quantity   INTEGER,
    added_at   DATE
);