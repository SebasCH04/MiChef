import express from 'express';
import { getRecomendations, toggleFavorite, searchAllRecipes, getUserData, updateUserProfile  } from '../Controllers/home.Controller.js';

const router = express.Router();

router.get('/recommendations', getRecomendations);
router.post('/toggleFavorite', toggleFavorite);
router.get('/searchRecipes', searchAllRecipes);
router.get('/userData', getUserData);
router.put('/updateProfile', updateUserProfile);


export default router;