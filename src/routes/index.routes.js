import { Router } from 'express';
import authRoute from './auth.routes.js'
import userRoutes from "./user.routes.js";
import contractRoutes from './contract.routes.js';
import propertyRoutes from './property.routes.js';
import tenantRoutes from './tenant.routes.js';
import landlordRoutes from './landlord.routes.js';
import departmentRoutes from './department.routes.js';
import roleRoutes from './roles.routes.js';
import paymentsRoutes from './payments.routes.js';

const router = Router();

// Agrupamos todas las rutas por recurso
router.use('/auth/login'    , authRoute);
router.use("/users"         , userRoutes);
router.use('/contracts'     , contractRoutes);
router.use('/properties'    , propertyRoutes);
router.use('/tenants'       , tenantRoutes);
router.use('/landlords'     , landlordRoutes);
router.use('/departments'   , departmentRoutes);
router.use('/roles'         , roleRoutes);
router.use('/payments'      , paymentsRoutes);

export default router;
