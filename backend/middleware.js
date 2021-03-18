const logger = require('./winston');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

exports.routerErrorHandler = (err, req, res, next) => {
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
  try {
    const { nickname } = jwt.verify(token, secret_key);
    req.tokenNickname = nickname;
    next()
  } catch(e) {
    const error = new Error(err);
    error.message = 'Wrong token'
    error.status = 403;
    next(error)
  }
}
