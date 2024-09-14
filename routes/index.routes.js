import express from 'express';
const router = express.Router();

import userRoute from './user.routes.js';
import chatRoute from './chat.routes.js';
import adminRoute from './admin.routes.js';

router.use('/user', userRoute)
router.use('/chat', chatRoute)
router.use('/admin', adminRoute)





export default router;