const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/loginLimiter');

const userCtrl = require('../controllers/userController');


router.post('/signup', userCtrl.signup);
router.post('/login',limiter, userCtrl.login);


module.exports = router;