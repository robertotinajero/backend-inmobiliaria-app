// services/tenant.services.js
import { pool } from '../config/db.js';
import fs from 'fs';
import path from 'path';

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
      (firstname, lastname, curp, rfc, phone, email, reference1_name, reference1_phone, reference2_name, reference2_phone, fg_active, id_user_last_modification, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [
      firstname, lastname, curp, rfc, phone || null, email || null,
      referenceName1 || null, referencePhone1 || null, referenceName2 || null, referencePhone2 || null,
      req.user?.id || null, // id_user_last_modification
    ]
  );
  return result.insertId;
}

export const createTenantWithFiles = async (req) => {
  const {
    firstname, lastname, curp, rfc, phone, email,
    referenceName1, referencePhone1, referenceName2, referencePhone2,
  } = req.body;

  // 1️⃣ Crear tenant en DB sin archivos para obtener ID
  const [result] = await pool.query(
    `INSERT INTO tbl_tenant 
      (firstname, lastname, curp, rfc, phone, email, reference1_name, reference1_phone, reference2_name, reference2_phone, fg_active, id_user_last_modification, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [
      firstname, lastname, curp, rfc, phone || null, email || null,
      referenceName1 || null, referencePhone1 || null, referenceName2 || null, referencePhone2 || null,
      req.user?.id || null, // id_user_last_modification
    ]
  );

  const tenantId = result.insertId;
  const tenantFolder = `uploads/tenants/${tenantId}`;

  // 2️⃣ Crear carpeta definitiva
  if (!fs.existsSync(tenantFolder)) {
    fs.mkdirSync(tenantFolder, { recursive: true });
  }

  // 3️⃣ Mover archivos de temp a carpeta definitiva
  const files = {};
  ['ine', 'comprobante', 'estadoCuenta'].forEach((field) => {
    if (req.files?.[field]) {
      const file = req.files[field][0];
      const oldPath = file.path;
      const newPath = path.join(tenantFolder, file.filename);
      fs.renameSync(oldPath, newPath);
      files[field] = file.filename;
    } else {
      files[field] = null;
    }
  });

  // 4️⃣ Actualizar DB con nombres de archivos
  await pool.query(
    `UPDATE tbl_tenant
     SET ine=?, comprobante=?, estado_cuenta=?
     WHERE id_tenant=?`,
    [files.ine, files.comprobante, files.estadoCuenta, tenantId]
  );

  return {
    id: tenantId,
    firstname,
    lastname,
    fg_active: 1,
    referenceName1,
    referencePhone1,
    referenceName2,
    referencePhone2,
    ...files,
  };
};

/**
 * Actualizar inquilino
 */
export async function updateTenant(id_tenant, data) {
  await pool.query(
    `UPDATE tbl_tenant SET
      firstname = ?, lastname = ?, curp = ?, rfc = ?, phone = ?, email = ?, reference1_name, reference1_phone, reference2_name, reference2_phone, id_user_last_modification = ?, updated_at = NOW()
     WHERE id_tenant = ?`,
    [
      data.firstname,
      data.lastname,
      data.curp,
      data.rfc,
      data.phone || null,
      data.email || null,
      data.reference1_name || null, 
      data.reference1_phone || null, 
      data.reference2_name || null, 
      data.reference2_phone || null,
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
