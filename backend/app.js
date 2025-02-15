const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const motifRoutes = require('./routes/motif');
const praticienRoutes = require('./routes/praticien');
const visiteRoutes = require('./routes/visite');
const visiteurRoutes = require('./routes/visiteur');

const app = express();

mongoose.connect('mongodb+srv://kylianpatry:YMvhH4HWsJbGrGj@kyliandatabaseexpressjs.fshpelw.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/motif', motifRoutes);
app.use('/api/praticien', praticienRoutes);
app.use('/api/visite', visiteRoutes);
app.use('/api/visiteur', visiteurRoutes);

module.exports = app;