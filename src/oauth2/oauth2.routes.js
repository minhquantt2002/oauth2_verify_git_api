const express = require("express");
const axios = require("axios");
const cors = require("cors");
const router = express();

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

router.use(cors({ credentials: true, origin: true }));

router.get("/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.json({
            "access_token" : response.data.access_token
        });
    });
});

module.exports = router;
