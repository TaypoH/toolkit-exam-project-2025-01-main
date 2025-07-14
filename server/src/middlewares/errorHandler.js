const logError = require('../utils/errorLogger');

module.exports = (err, req, res, next) => {
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }

  logError({
    message: err.message || 'Unknown error',
    code: err.code || 500,
    stackTrace: err.stack || {},
  });

  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code).send(err.message);
  }
};
