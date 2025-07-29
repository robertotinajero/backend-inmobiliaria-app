import { Router } from 'express';
import authRoute from './auth.routes.js'
import contractRoutes from './contract.routes.js';
import propertyRoutes from './property.routes.js';
import tenantRoutes from './tenant.routes.js';
import landlordRoutes from './landlord.routes.js';

const router = Router();

// Agrupamos todas las rutas por recurso
router.use('/auth/login' , authRoute);
router.use('/contracts' , contractRoutes);
router.use('/properties', propertyRoutes);
router.use('/tenants'   , tenantRoutes);
router.use('/landlords' , landlordRoutes);

export default router;