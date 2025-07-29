// routes/contract.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetContracts,
  handleGetContractById,
  handleCreateContract,
  handleUpdateContract,
  handleDeleteContract,
} from '../controllers/contract.controller.js';

const router = Router();

router.get('/'      , authMiddleware, handleGetContracts);
router.get('/:id'   , authMiddleware, handleGetContractById);
router.post('/'     , authMiddleware, handleCreateContract);
router.put('/:id'   , authMiddleware, handleUpdateContract);
router.delete('/:id', authMiddleware, handleDeleteContract);

export default router;
