import { Router } from 'express';
import { healthCheck } from '../controllers/healthcheck.controller';

const router = Router();

router.get('/healthcheck', healthCheck);

export default router;
