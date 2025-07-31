// controllers/property.controller.js
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/property.services.js';

/**
 * GET /properties
 */
export async function handleGetProperties(req, res) {
  try {
    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
}

/**
 * GET /properties/:id
 */
export async function handleGetPropertyById(req, res) {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    res.json(property);
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener propiedad' });
  }
}

/**
 * POST /properties
 */
export async function handleCreateProperty(req, res) {
  try {
    const id_property = await createProperty(req.body);
    res.status(201).json({ message: "Propiedad creada", id_property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear propiedad' });
  }
}

/**
 * PUT /properties/:id
 */
export async function handleUpdateProperty(req, res) {
  try {
    await updateProperty(req.params.id, req.body);
    res.status(200).json({ message: "Propiedad actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar propiedad' });
  }
}

/**
 * DELETE /properties/:id
 */
export async function handleDeleteProperty(req, res) {
  try {
    await deleteProperty(req.params.id, req.user?.id || null);
    res.status(200).json({ message: "Propiedad eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar propiedad' });
  }
}
