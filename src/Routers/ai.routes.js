import { Router } from 'express';
import { aiChat } from '../Controllers/ai.Controller.js';

const router = Router();

// AI chat proxy route
router.post('/ai/chat', aiChat);

export default router;
