CREATE TABLE tbl_tenant (
    id_tenant                 INT AUTO_INCREMENT PRIMARY KEY,
    firstname                 VARCHAR(50) NOT NULL UNIQUE,
    lastname                  VARCHAR(50) NOT NULL UNIQUE,
    phone                     INT(10),
    email                     VARCHAR(50),
    fg_active	              INT(11) NOT NULL,
    id_user_last_modification VARCHAR(255) DEFAULT NULL,
    created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);