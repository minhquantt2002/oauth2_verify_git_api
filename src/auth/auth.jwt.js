const jwt = require('jsonwebtoken');

const secretKey = "abcd1234";
const header = {
    alg: "HS256",
    typ: "JWT"
};

exports.verifiedToken = (accessToken) => {
    var decoded = jwt.decode(accessToken, { complete: true });
    if (decoded.header.alg != header.alg || decoded.header.typ != header.typ) {
        return false;
    }
    // expired access token
    try {
        var encodeCheck = jwt.sign(
            decoded.payload,
            secretKey,
            { algorithm: decoded.header.alg }
        );
    } catch (err) {
        return false;
    }
    if (encodeCheck.split('.')[2] !== decoded.signature) {
        return false;
    }
    return true;
};

exports.generateAccessToken = (username) => {
    var payload = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        iat: Math.floor(Date.now() / 1000) - 30
    }
    var accessToken = jwt.sign(
        payload,
        secretKey,
        { algorithm: header.alg }
    );
    return accessToken;
};
