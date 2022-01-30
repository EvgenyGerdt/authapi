const express = require('express');
const authJwt = require('../middlewares/authJwt.middleware');
const { getUser } = require('../controllers/user.controller');

const router = express.Router();

router.route('/:id').get([authJwt.verifyToken], getUser);

module.exports = router;