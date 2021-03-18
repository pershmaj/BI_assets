const logger = require('./winston');
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.routerErrorHandler = (err, req, res, next) => {
  console.log(err)
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
}

exports.isAuth = (req, res, next) => {
  let token = '';
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
  }
  // Unauthorized
  if(!token) {
    const error = new Error();
    error.status = 401;
    error.message = 'No token in request'
    next(error)
  }
  jwt.verify(token, config.secret_key, (err) => {
    if(err) {
      //Forbidden
      const error = new Error(err);
      error.message = 'Wrong token'
      error.status = 403;
      next(error)
    } else {
      //OK
      next();
    }
  })
}
