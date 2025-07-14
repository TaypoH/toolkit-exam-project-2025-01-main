const fs = require('fs').promises;
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/error.log');

async function logError ({ message, code, stackTrace }) {
  const errorObject = {
    message,
    time: Date.now(),
    code,
    stackTrace,
  };
  try {
    await fs.appendFile(logFilePath, JSON.stringify(errorObject) + '\n');
  } catch (err) {
    console.error('Failed to write error log:', err);
  }
}

module.exports = logError;
