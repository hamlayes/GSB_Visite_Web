const mongoose = require('mongoose');
const encryption = require('mongoose-encryption');

require('dotenv').config();

const VisiteurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    tel: String,
    email: String,
    password: String,
    date_embauche: Date,
    visite: String,
});

VisiteurSchema.plugin(encryption, { secret: process.env.ENCRYPTION_KEY, encryptedFields: ['nom', 'prenom', 'tel', 'date_embauche'] });

module.exports = mongoose.model('Visiteur', VisiteurSchema);
