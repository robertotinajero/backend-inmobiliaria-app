// controllers/department.controller.js
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../services/department.services.js';

/**
 * GET /departments
 */
export async function handleGetDepartments(req, res) {
  try {
    const departments = await getDepartments();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
}

/**
 * GET /departments/:id
 */
export async function handleGetDepartmentById(req, res) {
  try {
    const department = await getDepartmentById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener departamento' });
  }
}

/**
 * POST /departments
 */
export async function handleCreateDepartment(req, res) {
  try {
    const newId = await createDepartment(req.body);
    res.status(201).json({ id: newId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear departamento' });
  }
}

/**
 * PUT /departments/:id
 */
export async function handleUpdateDepartment(req, res) {
  try {
    await updateDepartment(req.params.id, req.body);
    res.json({ message: 'Departamento actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar departamento' });
  }
}

/**
 * DELETE /departments/:id
 */
export async function handleDeleteDepartment(req, res) {
  try {
    await deleteDepartment(req.params.id, req.user?.id || null);
    res.json({ message: 'Departamento eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar departamento' });
  }
}
