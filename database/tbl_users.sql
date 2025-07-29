CREATE TABLE tbl_users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    token VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(255),
    id_role INT NOT NULL,
    id_department INT NOT NULL,
    fg_active	INT(11) DEFAULT 1,
    id_user_last_modification varchar(255) DEFAULT NULL,
    dt_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_role) REFERENCES tbl_roles(id_role),
    FOREIGN KEY (id_department) REFERENCES tbl_departments(id_department)
);