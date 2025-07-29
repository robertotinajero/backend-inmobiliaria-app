import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetTenants,
  handleGetTenantById,
  handleCreateTenant,
  handleUpdateTenant,
  handleDeleteTenant,
} from '../controllers/tenant.controller.js';

const router = Router();

router.get('/'      , authMiddleware, handleGetTenants);
router.get('/:id'   , authMiddleware, handleGetTenantById);
router.post('/'     , authMiddleware, handleCreateTenant);
router.put('/:id'   , authMiddleware, handleUpdateTenant);
router.delete('/:id', authMiddleware, handleDeleteTenant);

export default router;
