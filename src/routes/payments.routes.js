import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getAllPayments,
  getPaymentsByContract,
  createPayment,
  updatePayment,
  deletePayment,
  uploadReceiptHandler,
} from '../controllers/payments.controller.js';
import { uploadReceiptMulter } from '../middlewares/upload.multer.js';

const router = Router();

router.get('/'                     , authMiddleware, getAllPayments);
router.get('/contract/:id_contract', authMiddleware, getPaymentsByContract);
router.post('/'                    , authMiddleware, createPayment);
router.put('/:id_payment'          , authMiddleware, updatePayment);

// Orden recomendado: 1) auth → 2) multer → 3) handler
router.put(
  '/receipts/:id_payment',
  authMiddleware,
  (req, res, next) => {
    uploadReceiptMulter(req, res, (err) => {
      if (err) {
        return res.status(400).json({ ok: false, message: err.message || 'Error al subir archivo' });
      }
      next();
    });
  },
  uploadReceiptHandler
);

router.delete('/:id_payment'       , authMiddleware, deletePayment);

export default router;
