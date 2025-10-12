// controllers/tenant.controller.js
import path from 'path';
import fs from 'fs';
import {
  getTenants,
  getTenantById,
  createTenantWithFiles,
  updateTenant,
  deleteTenant,
} from '../services/tenant.services.js';


/**
 * GET /tenants
 */
export async function handleGetTenants(req, res) {
  try {
    const tenants = await getTenants();
    res.json(tenants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener inquilinos' });
  }
}

/**
 * GET /tenants/:id
 */
export async function handleGetTenantById(req, res) {
  try {
    const tenant = await getTenantById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ error: 'Inquilino no encontrado' });
    }
    res.json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener inquilino' });
  }
}

/**
 * POST /tenants
 */
export async function handleCreateTenant(req, res) {
  try {
    const tenant = await createTenantWithFiles(req);
    res.status(201).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear inquilino' });
  }
}

/**
 * PUT /tenants/:id
 */
export async function handleUpdateTenant(req, res) {
  try {
    await updateTenant(req.params.id, req.body);
    res.json({ message: 'Inquilino actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar inquilino' });
  }
}

/**
 * DELETE /tenants/:id
 */
export async function handleDeleteTenant(req, res) {
  try {
    await deleteTenant(req.params.id, req.user?.id || null);
    res.json({ message: 'Inquilino eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar inquilino' });
  }
}

export async function handleDownloadTenantFile(req, res) {
  try {
    const { id, file } = req.params;

    const tenantFolder = path.join(process.cwd(), `uploads/tenants/${id}`);
    const filePath = path.join(tenantFolder, file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    res.download(filePath); // esto fuerza la descarga
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al descargar archivo' });
  }
}

export async function getFileInfo(req, res) {
  try {
    const { id, filename } = req.params;

    const tenantFolder = path.join(process.cwd(), `uploads/tenants/${id}`);
    const filePath = path.join(tenantFolder, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const stats = fs.statSync(filePath);
    const ext = path.extname(filename).replace(".", "").toUpperCase();

    res.json({
      name: filename,
      sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      extension: ext,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener información del archivo" });
  }
};
