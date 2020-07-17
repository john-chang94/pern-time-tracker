CREATE DATABASE perntimetracker;

-- create extension if not exists "uuid-ossp";
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    details VARCHAR(255) NOT NULL,
    start_date DATE,
    due_date DATE
);

CREATE TABLE entries (
    entry_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    project_id INT NOT NULL,
    date DATE NOT NULL,
    hours_worked INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE user_projects (
    user_projects_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE weekly_timesheets (
    timesheet_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
    total_entries INT NOT NULL,
    total_hours INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO projects (project_name, details)
VALUES ('Project 1', 'Details coming soon')
VALUES ('Project 2', 'Details coming soooooon');

INSERT INTO user_projects (user_id, project_id)
VALUES ('b04f55ea-57fc-446a-8533-b69d55ff785b', 1)
VALUES ('b04f55ea-57fc-446a-8533-b69d55ff785b', 2)
VALUES ('6a972509-7d2e-4a57-8f00-a0712da6e5da', 2);

INSERT INTO weekly_timesheets (user_id, week_start, week_end, total_entries, total_hours)
VALUES ('b04f55ea-57fc-446a-8533-b69d55ff785b', '2020-06-28', '2020-07-04', 5, 38);

-- Example query to grab many to many relationships
SELECT u.first_name, p.project_id FROM users AS u
JOIN user_projects AS up
ON u.user_id = up.user_id
JOIN projects AS p
ON up.project_id = p.project_id
-- Add a WHERE clause for one user/project
WHERE u.user_id = 'b04f55ea-57fc-446a-8533-b69d55ff785b'