const { verifiedToken } = require('./auth.jwt');
const { checkUser } = require('./auth.models');
var isAuth = (req, res, next) => {
    const accessToken = req.query['access_token'];
    if (!accessToken) {
        return res.status(401).json({
            "error": "where is the access token?"
        });
    }
    var checkAccessToken = verifiedToken(accessToken);
    if (!checkAccessToken) {
        return res.status(401).json({
            "error": "where is the access token?"
        });
    }
    return next();
};

module.exports = isAuth;