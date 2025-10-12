import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as unitController from "../controllers/units.controller.js";

const router = Router();

router.get("/"          , authMiddleware, unitController.getUnits);
router.get("/subunits"  , authMiddleware, unitController.getSubUnits);
router.get("/:id"       , authMiddleware, unitController.getUnitById);
router.get("/parent/:id", authMiddleware, unitController.getUnitsByParent);
router.post("/"         , authMiddleware, unitController.createUnit);
router.patch("/:id"     , authMiddleware, unitController.updateUnit);
router.delete("/:id"    , authMiddleware, unitController.deleteUnit);

export default router;
