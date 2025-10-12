// services/contract.services.js
import { pool } from '../config/db.js';
import { createScheduledPayments } from './payments.service.js';

/**
 * Obtener todos los contratos activos
 */
export async function getContracts() {
  const [rows] = await pool.query(
    `SELECT 
      c.*, 
      CONCAT(l.firstname, ' ', l.lastname) AS landlord_name,
      CONCAT(t.firstname, ' ', t.lastname) AS tenant_name,
      p.nm_property AS property_name
    FROM tbl_contract c
    INNER JOIN tbl_landlord l ON c.id_landlord = l.id_landlord
    INNER JOIN tbl_tenant t ON c.id_tenant = t.id_tenant
    INNER JOIN tbl_properties p ON c.id_property = p.id_property
    WHERE c.fg_active = 1`
  );
  return rows;
}

/**
 * Obtener contrato por ID
 */
export async function getContractById(id_contract) {
  const [rows] = await pool.query(
    `SELECT 
      c.*, 
      CONCAT(l.firstname, ' ', l.lastname) AS landlord_name,
      CONCAT(t.firstname, ' ', t.lastname) AS tenant_name,
      p.nm_property AS property_name
    FROM tbl_contract c
    INNER JOIN tbl_landlord l ON c.id_landlord = l.id_landlord
    INNER JOIN tbl_tenant t ON c.id_tenant = t.id_tenant
    INNER JOIN tbl_properties p ON c.id_property = p.id_property
    WHERE c.id_contract = ? AND c.fg_active = 1`,
    [id_contract]
  );
  return rows[0] || null;
}

/**
 * Obtiene el ultimo folio de un contracto
 */
export async function getLastFolio() {
  const [rows] = await pool.query(
    `SELECT folio 
     FROM tbl_contract 
     WHERE folio IS NOT NULL 
     ORDER BY id_contract DESC 
     LIMIT 1`
  );

  if (rows.length === 0) {
    // Si no hay contratos aún, empezamos desde cero
    const year = new Date().getFullYear();
    const nextFolio = `CT-${year}-0001`;
    return { folio: nextFolio };
  }

  const lastFolio = rows[0].folio; // ej: "CT-2025-0007"
  const parts = lastFolio.split('-');
  const year = new Date().getFullYear();

  let nextNumber = 1;
  if (parts.length >= 3) {
    nextNumber = parseInt(parts[2]) + 1;
  }

  const nextFolio = `CT-${year}-${String(nextNumber).padStart(4, '0')}`;
  return { folio: nextFolio };
};

/**
 * Crear contrato
 */
export async function createContract(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_contract 
      (folio, dt_start, dt_end, monthly_rent, security_deposit, payment_day, penalty, status, 
       id_landlord, id_tenant, id_property, guarantor_name, guarantor_contact, notes, fg_active, id_user_last_modification, dt_timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW())`,
    [
      data.folio,
      data.dt_start,
      data.dt_end || null,
      data.monthly_rent,
      data.security_deposit,
      data.payment_day,
      data.penalty || null,
      data.status || 'Activo',
      data.id_landlord,
      data.id_tenant,
      data.id_property,
      data.guarantor_name || null,
      data.guarantor_contact || null,
      data.notes || null,
      data.id_user_last_modification || null,
    ]
  );
  const id_contract = result.insertId;

  // 2. Generar pagos programados
  await createScheduledPayments({
    id_contract,
    start_date: data.dt_start,
    end_date: data.dt_end,
    monthly_rent: data.monthly_rent,
  });

  return { id_contract };
}

/**
 * Actualizar contrato
 */
export async function updateContract(id_contract, data) {
  await pool.query(
    `UPDATE tbl_contract SET
      folio = ?, dt_start = ?, dt_end = ?, monthly_rent = ?, security_deposit = ?, payment_day = ?, penalty = ?, status = ?,
      id_landlord = ?, id_tenant = ?, id_property = ?, guarantor_name = ?, guarantor_contact = ?, notes = ?, 
      id_user_last_modification = ?, dt_timestamp = NOW()
     WHERE id_contract = ?`,
    [
      data.folio,
      data.dt_start,
      data.dt_end || null,
      data.monthly_rent,
      data.security_deposit,
      data.payment_day,
      data.penalty || null,
      data.status,
      data.id_landlord,
      data.id_tenant,
      data.id_property,
      data.guarantor_name || null,
      data.guarantor_contact || null,
      data.notes || null,
      data.id_user_last_modification || null,
      id_contract,
    ]
  );
}

/**
 * Borrado lógico de contrato
 */
export async function deleteContract(id_contract, userId) {
  await pool.query(
    `UPDATE tbl_contract 
     SET fg_active = 0, id_user_last_modification = ?, dt_timestamp = NOW()
     WHERE id_contract = ?`,
    [userId, id_contract]
  );
}
