// src/routes/user.routes.js
import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas protegidas
router.get("/"      , authMiddleware, getUsers);
router.get("/:id"   , authMiddleware, getUserById);
router.post("/"     , authMiddleware, createUser);
router.put("/:id"   , authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
