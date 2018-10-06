const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  if(env === 'production') delete err.stack; // remove stack trace in production

  res.status(err.status);
  res.locals.err = err;

  console.log('this is the error below');
  console.log(err.status);
  res.render(`statics/${err.status}`);
  next(err);
}

module.exports = errorHandler;
