const express = require("express");
const asset = require('./controllers/asset.controller');
const user = require('./controllers/user.controller');
const like = require('./controllers/like.controller');
const middleware = require("./middleware");

const router = express.Router();
var multer  = require('multer');
var uploadPhoto = multer({ dest: './public/assets/'});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/')
    },
    filename: function (req, file, cb) {
      var filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      cb(null, filename);
    }
  });
var uploadFile = multer({ storage: storage });

router.post('/login', user.login);

module.exports = router;