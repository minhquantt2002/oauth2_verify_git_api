const express = require('express');
const isAuth = require('../auth/auth.middleware')
const router = express.Router();

router.get('/me', isAuth, (req, res, next) => {
    res.json({
        "status": "success"
    });
});

module.exports = router;
