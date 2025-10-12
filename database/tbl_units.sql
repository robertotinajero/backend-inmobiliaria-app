CREATE TABLE tbl_units (
  id_unit                   INT AUTO_INCREMENT PRIMARY KEY,
  parent_id                 INT NULL,                -- referencia a otra unidad (unidad padre)
  nm_unit                   VARCHAR(100) NOT NULL,   -- nombre: "Torre A", "Local 1", "Casa 12"
  type                      VARCHAR(50),             -- tipo: "Edificio", "Departamento", "Local"
  size                      INT,                     -- m²
  rooms                     INT,                     -- opcional
  address                   VARCHAR(255),            -- opcional (solo para unidades raíz)
  municipality              VARCHAR(100),
  state                     VARCHAR(100),
  postal_code               VARCHAR(10),
  status                    ENUM('Disponible','Ocupado','Inactivo') DEFAULT 'Disponible',
  fg_active	                INT NOT NULL,
  id_user_last_modification VARCHAR(255) DEFAULT NULL,
  created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES tbl_units(id_unit) ON DELETE CASCADE
);