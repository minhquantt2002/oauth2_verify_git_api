const express = require('express');
const controllersAuth = require('./auth.controllers');
const router = express.Router();

router.post('/login', controllersAuth.login);

router.post('/register', controllersAuth.register);

module.exports = router;