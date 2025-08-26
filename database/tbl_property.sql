CREATE TABLE tbl_properties (
    id_property INT AUTO_INCREMENT PRIMARY KEY,
    nm_property VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('Departamento','Bodega','Casa') NOT NULL,
    street VARCHAR(100) NOT NULL,
    colony VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    municipality VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    depto VARCHAR(100) NOT NULL,
    description TEXT,
    size DECIMAL(10,2),
    rooms TINYINT UNSIGNED NOT NULL DEFAULT 0,
    phone VARCHAR(15),
    status ENUM('Disponible','Ocupado','Mantenimiento') DEFAULT 'Disponible',
    fg_active INT(11) NOT NULL,
    id_user_last_modification VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_properties
  ADD COLUMN rooms TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER size;
    DROP COLUMN address,
    ADD COLUMN street VARCHAR(100) AFTER type,
    ADD COLUMN colony VARCHAR(100) AFTER street,
    ADD COLUMN postal_code VARCHAR(10) AFTER colony,
    ADD COLUMN municipality VARCHAR(100) AFTER postal_code,
    ADD COLUMN state VARCHAR(100) AFTER street,
    ADD COLUMN depto VARCHAR(100) AFTER state;