const Favorite = require('../models/favorite.model');

// Listar favoritos del usuario
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err });
  }
};

// Agregar favorito
exports.addFavorite = async (req, res) => {
  try {
    const { videoId, title, thumbnail } = req.body;
    const exists = await Favorite.findOne({ user: req.user.id, videoId });
    if (exists) {
      return res.status(400).json({ message: 'Video already in favorites' });
    }
    const favorite = new Favorite({
      user: req.user.id,
      videoId,
      title,
      thumbnail
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Error adding favorite', error: err });
  }
};

// Eliminar favorito
exports.removeFavorite = async (req, res) => {
  try {
    const { videoId } = req.params;
    await Favorite.deleteOne({ user: req.user.id, videoId });
    res.json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite', error: err });
  }
};
