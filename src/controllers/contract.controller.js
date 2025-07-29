// controllers/contract.controller.js
import {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
} from '../services/contract.services.js';

/**
 * GET /contracts
 */
export async function handleGetContracts(req, res) {
  try {
    const contracts = await getContracts();
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
}

/**
 * GET /contracts/:id
 */
export async function handleGetContractById(req, res) {
  try {
    const contract = await getContractById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contrato no encontrado' });
    }
    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener contrato' });
  }
}

/**
 * POST /contracts
 */
export async function handleCreateContract(req, res) {
  try {
    const newId = await createContract(req.body);
    res.status(201).json({ id: newId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear contrato' });
  }
}

/**
 * PUT /contracts/:id
 */
export async function handleUpdateContract(req, res) {
  try {
    await updateContract(req.params.id, req.body);
    res.json({ message: 'Contrato actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar contrato' });
  }
}

/**
 * DELETE /contracts/:id
 */
export async function handleDeleteContract(req, res) {
  try {
    await deleteContract(req.params.id, req.user?.id || null);
    res.json({ message: 'Contrato eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar contrato' });
  }
}
