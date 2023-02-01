const bcrypt = require('bcrypt');
const { checkPassword, checkUser, insertUser } = require('./auth.models');
const { generateAccessToken } = require('./auth.jwt');

exports.login = (req, res, next) => {
    var user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).json({
            "error": "Not has fields username or password!"
        });
    }
    checkPassword(user.username, (password) => {
        if (!password) {
            return res.status(400).json({
                "error": "Not has user!"
            });
        }
        bcrypt.compare(user.password, password, (err, result) => {
            if (result == false) {
                return res.status(400).json({
                    "error": "password is wrong"
                });
            }
            var accessToken = generateAccessToken(user.username);
            return res.json({
                "status": "success",
                "access_token": accessToken
            });
        });
    });
};

exports.register = (req, res, next) => {
    var user = req.body;
    if (!user.username || !user.password1 || !user.password2) {
        return res.status(400).json({
            "error": "Not has fields username or password1 or password2"
        });
    }
    if (user.password1 != user.password2) {
        return res.status(400).json({
            "error": "password1 not equal password2"
        });
    }
    checkUser(user.username, (result) => {
        if (result) {
            return res.status(400).json({
                "error": "user is already"
            });
        }
        bcrypt.hash(user.password1, 10, (err, result) => {
            if (err) throw err;
            user.password = result;
            insertUser(user, (result) => {
                return res.json({
                    "status": "success",
                    user
                });
            });
        });
    });

};