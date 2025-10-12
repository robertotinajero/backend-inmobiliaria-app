// services/property.services.js
import { pool } from '../config/db.js';

/**
 * Obtener todas las propiedades activas
 */
export async function getUnits() {
  const [rows] = await pool.query(`SELECT * FROM tbl_units WHERE fg_active = 1`);
  return rows;
}

export async function getSubUnits() {
  const [rows] = await pool.query(`SELECT * FROM tbl_units WHERE fg_active = 1 AND parent_id IS NOT NULL`);
  return rows;
}

/**
 * Obtener propiedad por ID
 */
export async function getUnitById(id_units) {
  const [rows] = await pool.query(`SELECT * FROM tbl_units WHERE id_unit = ? AND fg_active = 1`,[id_units]);
  return rows[0] || null;
}

// Obtener subunidades de una unidad padre
export const getUnitsByParent = async (parentId) => {
  const [rows] = await pool.query(
    "SELECT * FROM tbl_units WHERE parent_id = ?",
    [parentId]
  );
  return rows;
};

/**
 * Crear propiedad
 */
// Crear propiedad
export async function createUnit(data) {
  Object.keys(data).forEach((key) => {
    if (data[key] === "") data[key] = null;
  });
  const [result] = await pool.query(
    `INSERT INTO tbl_units 
    (parent_id, nm_unit, type, size, rooms, street, colony, municipality, state, postal_code, status, fg_active, id_user_last_modification, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
    [
      data.parent_id,
      data.nm_unit,
      data.type,
      data.size,
      data.rooms,
      data.street,
      data.colony,
      data.municipality,
      data.state,
      data.postal_code,
      data.status,
      data.fg_active,
      data.id_user_last_modification,
      data.created_at,
      data.updated_at,
    ]
  );
  return result.insertId;
}

/**
 * Actualizar units
 */
export async function updateUnit(id_units, data) {
  await pool.query(
    `UPDATE tbl_units SET
      parent_id = ?, nm_unit = ?, type = ?, size = ?, rooms = ?, address = ?, municipality = ?, state = ?, postal_code = ?, status = ?, fg_active = ?, id_user_last_modification = ?, created_at = ?, updated_at = ?
     WHERE id_unit = ?`,
    [
      data.parent_id,
      data.nm_unit,
      data.type,
      data.size,
      data.rooms,
      data.address,
      data.municipality,
      data.state,
      data.postal_code,
      data.status,
      data.fg_active,
      data.id_user_last_modification,
      data.created_at,
      data.updated_at,
      id_units,
    ]
  );
}

/**
 * Borrado lógico de propiedad
 */
export async function deleteUnit(id_units, userId) {
  await pool.query(
    `UPDATE tbl_units 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_unit = ?`,
    [userId, id_units]
  );
}
