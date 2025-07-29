CREATE TABLE tbl_properties (
    id_property               INT AUTO_INCREMENT PRIMARY KEY,
    nm_property               VARCHAR(50) NOT NULL UNIQUE,
    type                      ENUM('Departamento','Bodega','Casa') NOT NULL,
    address                   VARCHAR(50) NOT NULL UNIQUE,
    description               TEXT,
    size                      DECIMAL(10,2),
    phone                     INT(10),
    status                    ENUM('Disponible','Ocupado','Mantenimiento') DEFAULT 'Disponible',
    fg_active	              INT(11) NOT NULL,
    id_user_last_modification VARCHAR(255) DEFAULT NULL,
    created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);