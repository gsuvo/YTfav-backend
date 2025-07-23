require('dotenv').config();
const express = require('express');
const db =require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const resetRoutes = require('./routes/reset.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const cors = require('cors');


const app = express();

// Cambia la URL por la de tu frontend real en Vercel
const allowedOrigins = ['https://y-tfav-backend.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

//rutas
app.use('/auth', authRoutes);
app.use('/auth', resetRoutes);
app.use('/favorites', favoritesRoutes);


const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () =>
    console.log(`Servidor en http://localhost:${process.env.PORT}`)
  );
}

// Exporta el handler para Vercel
module.exports = app;
