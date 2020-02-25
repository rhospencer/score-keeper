CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    f_name VARCHAR(50),
    l_name VARCHAR(50)
);

INSERT INTO users(username, f_name, l_name)
VALUES
    ('spencedog', 'Spencer', 'Rhoton');

CREATE TABLE login (
    user_login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    hash TEXT
);