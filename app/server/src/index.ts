import { Router } from 'express';
import healthCheckRoutes from './healthcheck/infrastructure/routes/healthcheck.route';
import authRoutes from './auth/infrastructure/routes/auth.route';
import topicRoutes from './topics/infrastructure/routes/topic.routes';
import categoryRoutes from './categories/infrastructure/routes/category.routes';

const router = Router();

router.use(healthCheckRoutes)
router.use(authRoutes)
router.use('/topic', topicRoutes)
router.use('/category', categoryRoutes)

export default router;
