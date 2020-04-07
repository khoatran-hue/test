var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, label, timestamp, printf } = format;

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);

require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/clone_build_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });
 
  transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });

const logger = createLogger({
    // level: 'info',
    format: combine(
      label({ label: 'main' }),
      timestamp(),
      myFormat
    ),
    transports:  transport

  });

module.exports = logger;