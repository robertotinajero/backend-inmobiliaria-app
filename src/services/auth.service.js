import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

/**
 * Valida credenciales y retorna el usuario junto con sus roles
 * @param {string} email 
 * @param {string} password 
 * @returns {object|null}
 */
export const loginUser = async (email, password) => {
  try {
    // Buscar usuario por correo
    const [users] = await pool.query(`
      SELECT * FROM tbl_users WHERE email = ?
    `, [email]);

    if (users.length === 0) return null;

    const user = users[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    // Obtener roles del usuario
    const [roles] = await pool.query(`
      SELECT r.* 
      FROM tbl_roles r
      JOIN user_roles ur ON r.id_role = ur.id_role
      WHERE ur.id_user = ?
    `, [user.id_user]);

    // Añadir roles al objeto de usuario
    user.roles = roles;

    // Opcional: eliminar el password antes de retornar
    delete user.password;

    return user;
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
};
