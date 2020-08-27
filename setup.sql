CREATE table IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR (32) NOT NULL
);

CREATE table IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(120) NOT NULL,
    middle_name VARCHAR(120),
    last_name VARCHAR(120) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL REFERENCES roles (id)

);

CREATE table IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(560) NOT NULL,
    project_manager_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE table IF NOT EXISTS project_users (
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE table IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    assignee_id INT REFERENCES users(id) ON DELETE CASCADE,
    description VARCHAR(1000),
    previous_assigned_to INT REFERENCES users(id),
    deadline DATE
);

CREATE table IF NOT EXISTS tagged_users(
    task_id INT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO roles (role) VALUES ('admin'),('project_manager'),('team_lead'),('engineer');

INSERT INTO
    users (
    email,
    first_name,
    last_name,
    password,
    role_id)
    VALUES('sysaadmin@gmail.com','admin','admin','$2b$10$aqbvEe0.owGGMuDdhwvxpepyPhJJ5qiX382d6q1mr5GLuopSC2z4O',1);

