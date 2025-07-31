// services/property.services.js
import { pool } from '../config/db.js';

/**
 * Obtener todas las propiedades activas
 */
export async function getProperties() {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_properties WHERE fg_active = 1`
  );
  return rows;
}

/**
 * Obtener propiedad por ID
 */
export async function getPropertyById(id_property) {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_properties WHERE id_property = ? AND fg_active = 1`,
    [id_property]
  );
  return rows[0] || null;
}

/**
 * Crear propiedad
 */
// Crear propiedad
export async function createProperty(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_properties 
    (nm_property, type, street, colony, postal_code, municipality, state, depto, description, size, rooms, phone, status, fg_active, id_user_last_modification)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
    [
      data.nm_property,
      data.type,
      data.street,
      data.colony,
      data.postal_code,
      data.municipality,
      data.state,
      data.depto,
      data.description,
      data.size,
      data.rooms,
      data.phone,
      data.status || "Disponible",
      data.id_user_last_modification,
    ]
  );
  return result.insertId;
}

/**
 * Actualizar propiedad
 */
export async function updateProperty(id_property, data) {
  await pool.query(
    `UPDATE tbl_properties SET
      nm_property = ?, type = ?, street = ?, colony = ?, postal_code = ?, municipality = ?, state = ?, depto = ?, description = ?, size = ?, rooms=?, phone = ?, status = ?, id_user_last_modification = ?
     WHERE id_property = ?`,
    [
      data.nm_property,
      data.type,
      data.street,
      data.colony,
      data.postal_code,
      data.municipality,
      data.state,
      data.depto,
      data.description,
      data.size,
      data.rooms,
      data.phone,
      data.status,
      data.id_user_last_modification,
      id_property,
    ]
  );
}

/**
 * Borrado lógico de propiedad
 */
export async function deleteProperty(id_property, userId) {
  await pool.query(
    `UPDATE tbl_properties 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_property = ?`,
    [userId, id_property]
  );
}
