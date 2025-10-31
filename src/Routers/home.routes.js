import express from 'express';
import { getRecomendations, toggleFavorite, searchAllRecipes  } from '../Controllers/home.Controller.js';

const router = express.Router();

router.get('/recommendations', getRecomendations);
router.post('/toggleFavorite', toggleFavorite);
router.get('/searchRecipes', searchAllRecipes);


export default router;