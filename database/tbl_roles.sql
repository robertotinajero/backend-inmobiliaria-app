CREATE TABLE tbl_roles (
  id_role INT AUTO_INCREMENT PRIMARY KEY,
  nm_role VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(100),
  fg_active	INT(11) NOT NULL,
  id_user_last_modification varchar(255) DEFAULT NULL,
  dt_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);