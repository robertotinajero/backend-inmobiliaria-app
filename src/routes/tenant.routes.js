import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  handleGetTenants,
  handleGetTenantById,
  handleCreateTenant,
  handleUpdateTenant,
  handleDeleteTenant,
  handleDownloadTenantFile,
  getFileInfo
} from '../controllers/tenant.controller.js';
import { uploadFiles } from '../middlewares/upload.js';

const router = Router();

router.get('/'                            , authMiddleware, handleGetTenants);
router.get('/:id'                         , authMiddleware, handleGetTenantById);
router.put('/:id'                         , authMiddleware, handleUpdateTenant);
router.delete('/:id'                      , authMiddleware, handleDeleteTenant);
router.get('/:id/download/:file'          , authMiddleware, handleDownloadTenantFile);
router.get('/:id/fileinfo/:filename'      , authMiddleware, getFileInfo);


router.post(
  '/',
  authMiddleware,
  async (req, res, next) => {
    // Crear carpeta temporal
    req.tenantFolder = 'uploads/tenants/temp';
    next();
  },
  uploadFiles({
    folder: 'uploads/tenants/temp',
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    maxSize: 5 * 1024 * 1024,
  }).fields([
    { name: 'ine', maxCount: 1 },
    { name: 'comprobante', maxCount: 1 },
    { name: 'estadoCuenta', maxCount: 1 },
  ]),
  handleCreateTenant
);


export default router;
