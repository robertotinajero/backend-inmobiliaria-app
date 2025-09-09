import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getAllPayments,
  getPaymentsByContract,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/payments.controller.js';

const router = Router();

router.get('/'                     , authMiddleware, getAllPayments);
router.get('/contract/:id_contract', authMiddleware, getPaymentsByContract);
router.post('/'                    , authMiddleware, createPayment);
router.put('/:id_payment'          , authMiddleware, updatePayment);
router.delete('/:id_payment'       , authMiddleware, deletePayment);

export default router;
