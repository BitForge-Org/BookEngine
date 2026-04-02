import { Router } from 'express';
import providerRoutes from '../modules/provider/provider.routes';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/providers', providerRoutes);

export default router;