const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authjwt');
const favoriteController = require('../controllers/favorite.controller');

// Listar favoritos del usuario
router.get('/', authMiddleware, favoriteController.getFavorites);

// Agregar favorito
router.post('/', authMiddleware, favoriteController.addFavorite);

// Eliminar favorito
router.delete('/:videoId', authMiddleware, favoriteController.removeFavorite);

module.exports = router;
