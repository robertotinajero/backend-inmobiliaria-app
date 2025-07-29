// routes/landlord.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetLandlords,
  handleGetLandlordById,
  handleCreateLandlord,
  handleUpdateLandlord,
  handleDeleteLandlord,
} from '../controllers/landlord.controller.js';

const router = Router();

router.get('/'      , authMiddleware, handleGetLandlords);
router.get('/:id'   , authMiddleware, handleGetLandlordById);
router.post('/'     , authMiddleware, handleCreateLandlord);
router.put('/:id'   , authMiddleware, handleUpdateLandlord);
router.delete('/:id', authMiddleware, handleDeleteLandlord);

export default router;
