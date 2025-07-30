// src/services/users/user.services.js
import { pool } from "../config/db.js";

// Obtener todos los usuarios activos
async function getUsers() {
  const [rows] = await pool.query(
    `SELECT u.*, r.nm_role AS role_name, d.nm_department AS department_name
     FROM tbl_users u
     INNER JOIN tbl_roles r ON u.id_role = r.id_role
     INNER JOIN tbl_departments d ON u.id_department = d.id_department
     WHERE u.fg_active = 1`
  );
  return rows;
}

// Obtener un usuario por ID
async function getUserById(id_user) {
  const [rows] = await pool.query(
    `SELECT u.*, r.nm_role AS role_name, d.nm_department AS department_name
     FROM tbl_users u
     INNER JOIN tbl_roles r ON u.id_role = r.id_role
     INNER JOIN tbl_departments d ON u.id_department = d.id_department
     WHERE u.id_user = ? AND u.fg_active = 1`,
    [id_user]
  );
  return rows[0] || null;
}

// Crear usuario
async function createUser(data) {
  const [result] = await pool.query(
    `INSERT INTO tbl_users 
    (firstname, lastname, username, email, password, phone, token, profile_image_url, id_role, id_department, id_user_last_modification)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.firstname,
      data.lastname,
      data.username,
      data.email,
      data.password,
      data.phone,
      data.token,
      data.profile_image_url,
      data.id_role,
      data.id_department,
      data.id_user_last_modification,
    ]
  );
  return result.insertId;
}

// Actualizar usuario
async function updateUser(id_user, data) {
  await pool.query(
    `UPDATE tbl_users SET
      firstname = ?, lastname = ?, username = ?, email = ?, phone = ?, token = ?, profile_image_url = ?, id_role = ?, id_department = ?, id_user_last_modification = ?
     WHERE id_user = ?`,
    [
      data.firstname,
      data.lastname,
      data.username,
      data.email,
      data.phone,
      data.token,
      data.profile_image_url,
      data.id_role,
      data.id_department,
      data.id_user_last_modification,
      id_user,
    ]
  );
}

// Borrado lógico de usuario
async function deleteUser(id_user, userId) {
  await pool.query(
    `UPDATE tbl_users 
     SET fg_active = 0, id_user_last_modification = ?
     WHERE id_user = ?`,
    [userId, id_user]
  );
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
