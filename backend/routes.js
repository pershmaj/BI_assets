const express = require("express");
const asset = require('./controllers/asset.controller');
const user = require('./controllers/user.controller');
const like = require('./controllers/like.controller');
const middleware = require("./middleware");

const router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/')
    },
    filename: function (req, file, cb) {
      var filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      cb(null, filename);
    }
  });
var uploadPhoto= multer({ storage: storage });

router.post('/login', user.login);
router.post('/registration', user.registration);
router.put('/user/:id',middleware.isAuth, user.updateUser);

router.get('/asset', middleware.isAuth, asset.getAssets);
router.post('/asset', middleware.isAuth, uploadPhoto.single('asset'), asset.createAsset);
router.put('/asset/:id', middleware.isAuth, uploadPhoto.single('asset'), asset.updateAsset);
router.delete('/asset/:id', middleware.isAuth, asset.deleteAsset);

router.get('/like/:user_id/:asset_id', middleware.isAuth, like.doLike);

module.exports = router;