-- Users Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(255),
    otp INT,
    phone VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_username (username)
);
-- Add Is verified Field
ALTER TABLE `users`
ADD `is_verified` TINYINT NOT NULL DEFAULT '0'
AFTER `phone`;
-- Projects Table
CREATE TABLE Projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    project_head INT,
    FOREIGN KEY (project_head) REFERENCES Users(user_id),
    -- Updated to match Users table
    INDEX idx_project_name (name)
);
-- Members Table
CREATE TABLE Members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- You might want to clarify the purpose of this column
    user_id INT,
    project_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE
);
-- Task Table
CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    status VARCHAR(45),
    due_date DATE,
    priority ENUM('High', 'Medium', 'Low'),
    project_id INT,
    -- Updated column name to match Projects table
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);
-- TaskComments Table
CREATE TABLE TaskComment (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    comment_text TEXT,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES Task(task_id) -- Updated table name to match Task table
);
-- TaskAttachments Table
CREATE TABLE TaskAttachments (
    attachment_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    file_path VARCHAR(255),
    FOREIGN KEY (task_id) REFERENCES Task(task_id) -- Updated table name to match Task table
);