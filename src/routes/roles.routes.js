// src/routes/user.routes.js
import { Router } from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas protegidas
router.get("/"      , authMiddleware, getRoles);
router.get("/:id"   , authMiddleware, getRoleById);
router.post("/"     , authMiddleware, createRole);
router.put("/:id"   , authMiddleware, updateRole);
router.delete("/:id", authMiddleware, deleteRole);

export default router;
