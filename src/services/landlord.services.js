// services/landlord.services.js
import { pool } from '../config/db.js';

/**
 * Obtener todos los arrendadores activos
 */
export async function getLandlords() {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_landlord WHERE fg_active = 1`
  );
  return rows;
}

/**
 * Obtener arrendador por ID
 */
export async function getLandlordById(id_landlord) {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_landlord WHERE id_landlord = ? AND fg_active = 1`,
    [id_landlord]
  );
  return rows[0] || null;
}

/**
 * Crear arrendador
 */
export async function createLandlord(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_landlord 
      (firstname, lastname, rfc, phone, email, fg_active, id_user_last_modification, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [
      data.firstname,
      data.lastname,
      data.rfc || null,
      data.phone || null,
      data.email || null,
      data.id_user_last_modification || null,
    ]
  );
  return result.insertId;
}

/**
 * Actualizar arrendador
 */
export async function updateLandlord(id_landlord, data) {
  await pool.query(
    `UPDATE tbl_landlord SET
      firstname = ?, lastname = ?, rfc = ?, phone = ?, email = ?, id_user_last_modification = ?, updated_at = NOW()
     WHERE id_landlord = ?`,
    [
      data.firstname,
      data.lastname,
      data.rfc || null,
      data.phone || null,
      data.email || null,
      data.id_user_last_modification || null,
      id_landlord,
    ]
  );
}

/**
 * Borrado lógico de arrendador
 */
export async function deleteLandlord(id_landlord, userId) {
  await pool.query(
    `UPDATE tbl_landlord 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_landlord = ?`,
    [userId, id_landlord]
  );
}
