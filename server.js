require('dotenv').config();
const express = require('express');
const db =require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const resetRoutes = require('./routes/reset.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//rutas
app.use('/auth', authRoutes);
app.use('/auth', resetRoutes);
app.use('/favorites', favoritesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor en http://localhost:${process.env.PORT}`)
);
