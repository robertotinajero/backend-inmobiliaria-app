// services/department.services.js
import { pool } from '../config/db.js';

/**
 * Obtener todos los departamentos activos
 */
export async function getDepartments() {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_departments WHERE fg_active = 1`
  );
  return rows;
}

/**
 * Obtener departamento por ID
 */
export async function getDepartmentById(id_department) {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_departments WHERE id_department = ? AND fg_active = 1`,
    [id_department]
  );
  return rows[0] || null;
}

/**
 * Crear departamento
 */
export async function createDepartment(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_departments (nm_department, description, fg_active, id_user_last_modification)
     VALUES (?, ?, 1, ?)`,
    [
      data.nm_department,
      data.description || null,
      data.id_user_last_modification || null,
    ]
  );
  return result.insertId;
}

/**
 * Actualizar departamento
 */
export async function updateDepartment(id_department, data) {
  await pool.query(
    `UPDATE tbl_departments SET
      nm_department = ?, description = ?, id_user_last_modification = ?
     WHERE id_department = ?`,
    [
      data.nm_department,
      data.description || null,
      data.id_user_last_modification || null,
      id_department,
    ]
  );
}

/**
 * Borrado lógico de departamento
 */
export async function deleteDepartment(id_department, userId) {
  await pool.query(
    `UPDATE tbl_departments SET fg_active = 0, id_user_last_modification = ?
     WHERE id_department = ?`,
    [userId, id_department]
  );
}
