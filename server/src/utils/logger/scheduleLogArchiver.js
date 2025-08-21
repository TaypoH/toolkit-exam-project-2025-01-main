const cron = require('node-cron');
const archiveLogs = require('./archiveLogs');

function scheduleLogArchiver () {
  const task = cron.schedule('0 0 * * *', () => {
    archiveLogs();
  });
  return task;
}

module.exports = scheduleLogArchiver;
