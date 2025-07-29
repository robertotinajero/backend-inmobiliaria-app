// routes/property.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetProperties,
  handleGetPropertyById,
  handleCreateProperty,
  handleUpdateProperty,
  handleDeleteProperty,
} from '../controllers/property.controller.js';

const router = Router();

router.get('/'      , authMiddleware, handleGetProperties);
router.get('/:id'   , authMiddleware, handleGetPropertyById);
router.post('/'     , authMiddleware, handleCreateProperty);
router.put('/:id'   , authMiddleware, handleUpdateProperty);
router.delete('/:id', authMiddleware, handleDeleteProperty);

export default router;
