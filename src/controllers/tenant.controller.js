// controllers/tenant.controller.js
import {
  getTenants,
  getTenantById,
  createTenant,
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
    const newId = await createTenant(req.body);
    res.status(201).json({ id: newId });
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
