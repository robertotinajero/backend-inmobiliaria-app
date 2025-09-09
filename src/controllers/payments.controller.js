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
