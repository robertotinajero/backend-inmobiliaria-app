// services/tenant.services.js
import { pool } from '../config/db.js';

/**
 * Obtener todos los inquilinos activos
 */
export async function getTenants() {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_tenant WHERE fg_active = 1`
  );
  return rows;
}

/**
 * Obtener inquilino por ID
 */
export async function getTenantById(id_tenant) {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_tenant WHERE id_tenant = ? AND fg_active = 1`,
    [id_tenant]
  );
  return rows[0] || null;
}

/**
 * Crear inquilino
 */
export async function createTenant(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_tenant 
      (firstname, lastname, phone, email, fg_active, id_user_last_modification, created_at, updated_at)
     VALUES (?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [
      data.firstname,
      data.lastname,
      data.phone || null,
      data.email || null,
      data.id_user_last_modification || null,
    ]
  );
  return result.insertId;
}

/**
 * Actualizar inquilino
 */
export async function updateTenant(id_tenant, data) {
  await pool.query(
    `UPDATE tbl_tenant SET
      firstname = ?, lastname = ?, phone = ?, email = ?, id_user_last_modification = ?, updated_at = NOW()
     WHERE id_tenant = ?`,
    [
      data.firstname,
      data.lastname,
      data.phone || null,
      data.email || null,
      data.id_user_last_modification || null,
      id_tenant,
    ]
  );
}

/**
 * Borrado lógico de inquilino
 */
export async function deleteTenant(id_tenant, userId) {
  await pool.query(
    `UPDATE tbl_tenant 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_tenant = ?`,
    [userId, id_tenant]
  );
}
