import * as unitService from "../services/units.service.js";

/**
 * GET /units
 */
export const getUnits = async (req, res) => {
  try {
    const units = await unitService.getUnits();
    res.status(200).json(units);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al obtener las unidades" });
  }
};

/**
 * GET /subunits
 */
export const getSubUnits = async (req, res) => {
  try {
    const units = await unitService.getSubUnits();
    res.status(200).json(units);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al obtener las subunidades" });
  }
};

/**
 * GET /units/:id
 */
export const getUnitById = async (req, res) => {
  try {
    const unit = await unitService.getUnitById(req.params.id);
    if (!unit) return res.status(404).json({ error: "Unidad no encontrada" });
    res.status(200).json(unit);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al obtener la unidad" });
  }
};

// Obtener subunidades por id del padre
export const getUnitsByParent = async (req, res) => {
  try {
    const units = await unitService.getUnitsByParent(req.params.id);
    res.status(200).json(units);
  } catch (err) {
    console.error("Error al obtener subunidades:", err);
    res.status(500).json({ error: "Error al obtener subunidades" });
  }
};


/**
 * POST /units
 */
export const createUnit = async (req, res) => {
  try {
    const newUnit = await unitService.createUnit(req.body);
    res.status(201).json({ message: "Propiedad creada", newUnit });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Error al crear la unidad" });
  }
};

/**
 * PUT /units/:id
 */
export const updateUnit = async (req, res) => {
  try {
    const updated = await unitService.updateUnit(req.paramsid, req.body);
    res.status(200).json({message: "Unidad actualizada"});
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la unidad" });
  }
};

/**
 * DELETE /units/:id
 */
export const deleteUnit = async (req, res) => {
  try {
    await unitService.deleteUnit(req.params.id, req.user?.id || null);
    res.status(200).json({ message: "Unidad eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la unidad" });
  }
};
