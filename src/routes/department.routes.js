// routes/department.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetDepartments,
  handleGetDepartmentById,
  handleCreateDepartment,
  handleUpdateDepartment,
  handleDeleteDepartment,
} from '../controllers/department.controller.js';

const router = Router();

router.get('/'      , authMiddleware, handleGetDepartments);
router.get('/:id'   , authMiddleware, handleGetDepartmentById);
router.post('/'     , authMiddleware, handleCreateDepartment);
router.put('/:id'   , authMiddleware, handleUpdateDepartment);
router.delete('/:id', authMiddleware, handleDeleteDepartment);

export default router;
