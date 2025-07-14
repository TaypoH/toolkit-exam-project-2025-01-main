/**
 * Daily log archiving script.
 * Crontab example: 0 0 * * * /usr/bin/node /absolute/path/to/server/src/utils/archiveLogs.js
 */

const fs = require('fs').promises;
const path = require('path');
const CONSTANTS = require('../constants');

const logsDir = path.join(__dirname, '../../', CONSTANTS.LOGS_DIR);
const sourceLog = path.join(logsDir, CONSTANTS.ERROR_LOG_FILE);
const archiveLog = path.join(
  logsDir,
  `${CONSTANTS.ARCHIVE_LOG_PREFIX}${new Date().toISOString().slice(0, 10)}${CONSTANTS.ARCHIVE_LOG_EXT}`
);

async function archiveLogs() {
  try {
    const data = await fs.readFile(sourceLog, 'utf8');
    if (!data.trim()) return;

    const transformed = data
      .trim()
      .split('\n')
      .map(line => {
        try {
          const { message, code, time } = JSON.parse(line);
          return JSON.stringify({ message, code, time });
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    await fs.writeFile(archiveLog, transformed.join('\n') + '\n');
    await fs.truncate(sourceLog, 0);
  } catch (err) {
    console.error('Error in log archiving:', err);
  }
}

archiveLogs();
