const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routerUsers = require('./src/users/users.routes');
const routerAuth = require('./src/auth/auth.routes');
const routerOauth2 = require('./src/oauth2/oauth2.routes');
const app = express();
const port = 8000;

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use('/user', routerUsers);
app.use('/auth', routerAuth);
app.use('/oauth2', routerOauth2);
// app.get('/get', (req, res, next) => {
//     const jwt = require('jsonwebtoken');
//     var payload = {
//         id: 1,
//         username: "quan",
//         exp: Math.floor(Date.now() / 1000) + (60 * 60),
//         iat: Math.floor(Date.now() / 1000) - 30
//     }
//     var secretKey = "abcd1234"
//     var token = jwt.sign(payload, secretKey);
//     console.log(token);
//     var decoded = jwt.decode(token, { complete: true });
//     res.json(decoded)
// });
app.get('/hello', (req, res, next) => {
    res.send('hello!');
});

app.listen(port, () => {
    console.log(`Run server with port ${port}`);
});