CREATE TABLE social_user (
user_id SERIAL PRIMARY KEY,
user_name varchar(255) NOT NULL,
user_email varchar(255) NOT NULL UNIQUE,
user_password varchar(255) NOT NULL
)

CREATE TABLE social_user (
user_id SERIAL PRIMARY KEY,
user_name varchar(255) NOT NULL,
user_email varchar(255) NOT NULL UNIQUE,
user_password varchar(255) NOT NULL
)