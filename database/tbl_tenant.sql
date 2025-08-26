CREATE TABLE tbl_tenant (
    id_tenant                 INT AUTO_INCREMENT PRIMARY KEY,
    firstname                 VARCHAR(50) NOT NULL UNIQUE,
    lastname                  VARCHAR(50) NOT NULL UNIQUE,
    curp                      VARCHAR(50),
    rfc                       VARCHAR(50),
    phone                     VARCHAR(15),
    email                     VARCHAR(50),
    fg_active	              INT(11) NOT NULL,
    id_user_last_modification VARCHAR(255) DEFAULT NULL,
    created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tbl_tenant (
  id_tenant                  INT AUTO_INCREMENT PRIMARY KEY,
  firstname                  VARCHAR(80)  NOT NULL,
  lastname                   VARCHAR(80)  NOT NULL,
  curp                       CHAR(18)     NULL,
  rfc                        VARCHAR(13)  NULL,            -- 13 persona física (12 moral)
  phone                      VARCHAR(20)  NULL,
  email                      VARCHAR(191) NULL,            -- 191 por compatibilidad con índices utf8mb4
  fg_active                  TINYINT      NOT NULL DEFAULT 1, -- 0/1
  id_user_last_modification  INT UNSIGNED NULL,
  created_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_tenant_curp (curp),
  UNIQUE KEY uq_tenant_rfc  (rfc),
  UNIQUE KEY uq_tenant_email (email),
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;