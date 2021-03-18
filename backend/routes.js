const express = require("express");
const controllers = require("./controllers")
const middleware = require("./middleware")

const router = express.Router();

router.post('/login', controllers.login);

module.exports = router;