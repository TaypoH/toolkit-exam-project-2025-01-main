const fs = require('fs').promises;
const path = require('path');
const CONSTANTS = require('../constants');

const logFilePath = path.join(__dirname, '../../', CONSTANTS.LOGS_DIR, CONSTANTS.ERROR_LOG_FILE);

async function logError({ message, code, stackTrace }) {
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
