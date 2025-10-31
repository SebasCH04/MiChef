import express from 'express';
import { getRecomendations, toggleFavorite } from '../Controllers/home.Controller.js';

const router = express.Router();

router.get('/recommendations', getRecomendations);
router.post('/toggleFavorite', toggleFavorite);

export default router;