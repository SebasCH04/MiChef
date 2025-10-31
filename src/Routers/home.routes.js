import express from 'express';
import { getRecomendations, toggleFavorite } from '../Controllers/home.Controller.js';

const router = express.Router();

router.get('/recomendations', getRecomendations);
router.post('/toggleFavorite', toggleFavorite);

export default router;