INSERT INTO users (username, f_name, l_name)
VALUES 
    ($1, $2, $3)
RETURNING user_id;