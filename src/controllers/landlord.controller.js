// controllers/landlord.controller.js
import {
  getLandlords,
  getLandlordById,
  createLandlord,
  updateLandlord,
  deleteLandlord,
} from '../services/landlord.services.js';

/**
 * GET /landlords
 */
export async function handleGetLandlords(req, res) {
  try {
    const landlords = await getLandlords();
    res.json(landlords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener arrendadores' });
  }
}

/**
 * GET /landlords/:id
 */
export async function handleGetLandlordById(req, res) {
  try {
    const landlord = await getLandlordById(req.params.id);
    if (!landlord) {
      return res.status(404).json({ error: 'Arrendador no encontrado' });
    }
    res.json(landlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener arrendador' });
  }
}

/**
 * POST /landlords
 */
export async function handleCreateLandlord(req, res) {
  try {
    const newId = await createLandlord(req.body);
    res.status(201).json({ id: newId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear arrendador' });
  }
}

/**
 * PUT /landlords/:id
 */
export async function handleUpdateLandlord(req, res) {
  try {
    await updateLandlord(req.params.id, req.body);
    res.json({ message: 'Arrendador actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar arrendador' });
  }
}

/**
 * DELETE /landlords/:id
 */
export async function handleDeleteLandlord(req, res) {
  try {
    await deleteLandlord(req.params.id, req.user?.id || null);
    res.json({ message: 'Arrendador eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar arrendador' });
  }
}
