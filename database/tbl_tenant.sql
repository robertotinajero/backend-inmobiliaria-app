CREATE TABLE tbl_tenant (
    id_tenant                 INT AUTO_INCREMENT PRIMARY KEY,
    firstname                 VARCHAR(50) NOT NULL UNIQUE,
    lastname                  VARCHAR(50) NOT NULL UNIQUE,
    curp                      VARCHAR(50),
    rfc                       VARCHAR(50),
    phone                     INT(10),
    email                     VARCHAR(50),
    fg_active	              INT(11) NOT NULL,
    id_user_last_modification VARCHAR(255) DEFAULT NULL,
    created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_tenant
    ADD COLUMN curp VARCHAR(100) AFTER lastname,
    ADD COLUMN rfc VARCHAR(100) AFTER curp;