const express = require("express");
const asset = require('./controllers/asset.controller');
const user = require('./controllers/user.controller');
const like = require('./controllers/like.controller');
const middleware = require("./middleware");

const router = express.Router();

router.post('/login', user.login);

module.exports = router;