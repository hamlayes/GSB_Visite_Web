const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Visiteur = require('../models/visiteur');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');


require('dotenv').config();
// Signup visiteur
exports.signup = [
    // Validate and sanitize fields.

    body('email').isEmail().withMessage('Veuillez entrer un email valide.').normalizeEmail(),
    body('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.')
    .trim(),

    asyncHandler(async (req, res, next) => {

        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send back the first error message
            return res.status(400).json({ error: errors.array()[0].msg });
        }


        const hash = await bcrypt.hash(req.body.password, 10);
        const visiteur = new Visiteur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            tel: req.body.tel,
            email: req.body.email,
            password: hash,
            date_embauche: req.body.date_embauche,
            visite: req.body.visite,

        });
        await visiteur.save();
        res.status(201).json({ message: 'Utilisateur créé !', visiteur_id: visiteur._id, lastEmail: visiteur.email });
    })
];


//Login visiteur


exports.login = asyncHandler(async (req, res, next) => {
    const visiteur = await Visiteur.findOne({ email: req.body.email });
    if (!visiteur) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    const valid = await bcrypt.compare(req.body.password, visiteur.password);
    if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
    res.status(200).json({
        visiteurId: visiteur._id,
        token: jwt.sign(
            { visiteurId: visiteur._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
    });
});
