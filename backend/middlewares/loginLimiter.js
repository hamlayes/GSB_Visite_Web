const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 10, // 15 minute
  max: 5, // Limite le nombre de requêtes par IP à 5 pendant la période spécifiée
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard. (15 min)',
});

module.exports = limiter;
