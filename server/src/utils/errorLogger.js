const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/error.log');

function logError ({ message, code, stackTrace }) {
  const errorObject = {
    message,
    time: Date.now(),
    code,
    stackTrace,
  };

  fs.appendFile(logFilePath, JSON.stringify(errorObject) + '\n', err => {
    if (err) {
      console.error('Failed to write error log:', err);
    }
  });
}

module.exports = logError;
