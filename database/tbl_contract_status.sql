CREATE TABLE tbl_contract_status (
  id_contract_status        INT AUTO_INCREMENT PRIMARY KEY,
  nm_status                 VARCHAR(50) NOT NULL UNIQUE,
  description               VARCHAR(100),
  fg_active	                INT(11) NOT NULL,
  id_user_last_modification VARCHAR(255) DEFAULT NULL,
  dt_timestamp              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);