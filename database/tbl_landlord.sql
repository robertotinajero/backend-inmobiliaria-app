
CREATE TABLE tbl_landlord (
  id_landlord               INT AUTO_INCREMENT PRIMARY KEY,
  firstname                 VARCHAR(50) NOT NULL UNIQUE,
  lastname                  VARCHAR(50) NOT NULL UNIQUE,
  rfc                       VARCHAR(100),
  phone                     VARCHAR(15),
  email                     VARCHAR(50),
  fg_active                 TINYINT NOT NULL,
  id_user_last_modification VARCHAR(255) DEFAULT NULL,
  created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);