const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth.controller');

router.route('/sign-up').post(register);
router.route('/sign-in').post(login);

module.exports = router;