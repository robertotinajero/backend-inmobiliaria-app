CREATE TABLE tbl_payments (
  id_payment           INT AUTO_INCREMENT PRIMARY KEY,
  id_contract          INT NOT NULL,
  no_payment           INT NOT NULL,                 -- 1..12
  due_date             DATE NOT NULL,               -- fecha de vencimiento
  amount_due           DECIMAL(12,2) NOT NULL,
  amount_paid          DECIMAL(12,2) NOT NULL DEFAULT 0,
  status               ENUM('Pendiente','Parcial','Pagado','Vencido') NOT NULL DEFAULT 'Pendiente',
  notes                TEXT NULL,
  dt_created           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dt_updated           TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_contract
    FOREIGN KEY (id_contract) REFERENCES tbl_contract(id_contract)
    ON DELETE CASCADE
);