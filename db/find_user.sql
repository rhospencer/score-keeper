SELECT l.user_id, u.username, l.hash FROM login l
JOIN users u on l.user_id = u.user_id
WHERE username = $1;