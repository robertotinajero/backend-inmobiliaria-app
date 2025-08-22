// src/services/users/user.services.js
import { pool } from "../config/db.js";

// Obtener todos los usuarios activos
async function getRoles() {
  const [rows] = await pool.query(
     `SELECT * FROM tbl_roles WHERE fg_active = 1`
  );
  return rows;
}

// Obtener un usuario por ID
async function getRoleById(id_user) {
  const [rows] = await pool.query(
    `SELECT * FROM tbl_role WHERE id_role = ? AND fg_active = 1`,
    [id_role]
  );
  return rows[0] || null;
}

// Crear usuario
async function createRole(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_roles
    (nm_role, fg_active, id_user_last_modification)
    VALUES (?, ?)`,
    [
      data.nm_role,
      data.id_user_last_modification,
    ]
  );
  return result.insertId;
}

// Actualizar usuario
async function updateRole(id_role, data) {
  await pool.query(
    `UPDATE tbl_role SET
      nm_role = ?
     WHERE id_role = ?`,
    [
      data.nm_role,
      id_role,
    ]
  );
}

// Borrado lógico de usuario
async function deleteRole(id_role, roleId) {
  await pool.query(
    `UPDATE tbl_roles 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_role = ?`,
    [roleId, id_role]
  );
}

export default {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
