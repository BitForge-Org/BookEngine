import { Router } from 'express';
import providerRoutes from '../modules/provider/provider.routes';

const router = Router();

router.use('/providers', providerRoutes);

export default router;