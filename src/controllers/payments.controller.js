// controllers/payments.controller.js
import * as paymentService from '../services/payments.service.js';

export const getAllPayments = async (req, res) => {
  const result = await paymentService.getAll();
  res.json(result);
};

export const getPaymentsByContract = async (req, res) => {
  const { id_contract } = req.params;
  const result = await paymentService.getByContract(id_contract);
  res.json(result);
};

export const createPayment = async (req, res) => {
  const data = req.body;
  const result = await paymentService.create(data);
  res.status(201).json(result);
};

export const updatePayment = async (req, res) => {
  const { id_payment } = req.params;
  const result = await paymentService.update(id_payment, req.body);
  res.json(result);
};

export const deletePayment = async (req, res) => {
  const { id_payment } = req.params;
  const result = await paymentService.remove(id_payment);
  res.json(result);
};

function getBaseUrl(req) {
  const envBase = process.env.PUBLIC_BASE_URL || process.env.BASE_URL;
  if (envBase) return envBase.replace(/\/+$/, '');
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  const host  = req.headers['x-forwarded-host']  || req.get('host');
  return `${proto}://${host}`;
}

export async function uploadReceiptHandler(req, res) {
  try {
    const id_payment = Number(req.params.id_payment);
    if (!id_payment || Number.isNaN(id_payment)) {
      return res.status(400).json({ ok: false, message: 'id_payment inválido' });
    }

    // Multer ya corrió y dejó el archivo en req.file
    if (!req.file) {
      return res.status(400).json({ ok: false, message: 'Archivo requerido (file)' });
    }

    const payment = await paymentService.getPaymentById(id_payment);
    if (!payment) {
      return res.status(404).json({ ok: false, message: 'Pago no encontrado' });
    }

    const baseUrl = getBaseUrl(req);
    const url = `${baseUrl}/uploads/receipts/${req.file.filename}`;

    const updated = await paymentService.saveReceiptInfo({
      id_payment,
      filename: req.file.filename,
      originalname: req.file.originalname,
      url,
    });

    if (!updated) {
      return res.status(500).json({ ok: false, message: 'No se pudo guardar el recibo en BD' });
    }

    return res.json({
      ok: true,
      id_payment,
      filename: req.file.filename,
      originalname: req.file.originalname,
      url,                    // <— úsala directo en el front
      uploaded_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('uploadReceiptHandler error:', err);
    return res.status(500).json({ ok: false, message: err?.message || 'Error interno' });
  }
}


