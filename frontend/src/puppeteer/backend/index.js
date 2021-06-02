var express = require("express");
var app = express();
var cors = require('cors')
var functions = require('../index');

app.use(cors());

app.get("/testing/:player", async (req, res, next) => {
    console.log(req.params);
    let result = await functions.test(req.params).then().catch();
    res.json(result);
});

app.get("/player/:username", async (req, res, next) => {
    console.log(req.params);
    let result = await functions.getKnownPlayer(req.params).then().catch();
    res.json(result);
});

app.get("/xhr/:username", async (req, res, next) => {
    console.log(req.params);
    let result = await functions.getXHR(req.params).then().catch();
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});