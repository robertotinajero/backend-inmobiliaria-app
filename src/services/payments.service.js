import { pool } from '../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM tbl_payments ORDER BY dt_created DESC');
  return rows;
};

export const getByContract = async (id_contract) => {
  const [rows] = await pool.query(
    'SELECT * FROM tbl_payments WHERE id_contract = ? ORDER BY no_payment',
    [id_contract]
  );
  return rows;
};

export const create = async (data) => {
  const {
    id_contract, no_payment, due_date,
    amount_due, amount_paid = 0, status = 'Pendiente', notes = null
  } = data;

  const [result] = await pool.query(
    `INSERT INTO tbl_payments 
     (id_contract, no_payment, due_date, amount_due, amount_paid, status, notes) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id_contract, no_payment, due_date, amount_due, amount_paid, status, notes]
  );
  return { id_payment: result.insertId };
};

export const update = async (id, data) => {
  const [result] = await pool.query('UPDATE tbl_payments SET ? WHERE id_payment = ?', [data, id]);
  return result;
};

export const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM tbl_payments WHERE id_payment = ?', [id]);
  return result;
};

export const getPaymentById = async (id_payment) => {
  const [rows] = await pool.query('SELECT * FROM tbl_payments WHERE id_payment = ?', [id_payment]);
  return rows[0] || null;
};

export const createScheduledPayments = async ({ id_contract, start_date, end_date, monthly_rent }) => {
  // Verificar si ya existen pagos
  const [existing] = await pool.query(
    'SELECT COUNT(*) AS total FROM tbl_payments WHERE id_contract = ?',
    [id_contract]
  );
  if (existing[0].total > 0) {
    throw new Error(`Pagos ya existen para el contrato ${id_contract}`);
  }

  const payments = [];
  const start = new Date(start_date);
  const end = new Date(end_date);

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) + 1;

  for (let i = 0; i < months; i++) {
    const due = new Date(start);
    due.setMonth(due.getMonth() + i);

    const due_date = due.toISOString().split('T')[0];

    payments.push([
      id_contract,
      i + 1, // no_payment
      due_date,
      monthly_rent,
      0, // amount_paid
      'Pendiente',
      null
    ]);
  }

  const [result] = await pool.query(
    `INSERT INTO tbl_payments 
     (id_contract, no_payment, due_date, amount_due, amount_paid, status, notes)
     VALUES ?`,
    [payments]
  );

  return { inserted: result.affectedRows };
};

export const updatePaymentStatuses = async () => {
  // Pagado
  await pool.query(`
    UPDATE tbl_payments 
    SET status = 'Pagado'
    WHERE amount_paid >= amount_due
  `);

  // Parcial
  await pool.query(`
    UPDATE tbl_payments 
    SET status = 'Parcial'
    WHERE amount_paid > 0 AND amount_paid < amount_due
  `);

  // Vencido
  await pool.query(`
    UPDATE tbl_payments 
    SET status = 'Vencido'
    WHERE amount_paid = 0 AND due_date < CURDATE()
  `);

  // Pendiente
  await pool.query(`
    UPDATE tbl_payments 
    SET status = 'Pendiente'
    WHERE amount_paid = 0 AND due_date >= CURDATE()
  `);
};

export async function saveReceiptInfo({ id_payment, filename, originalname, url }) {
  // Si tu tabla no tiene estas columnas, ver SQL más abajo
  const [res] = await pool.query(
    `UPDATE tbl_payments 
       SET receipt_filename = ?, 
           receipt_originalname = ?, 
           receipt_url = ?, 
           receipt_uploaded_at = NOW()
     WHERE id_payment = ?`,
    [filename, originalname, url, id_payment]
  );
  return res.affectedRows === 1;
}


