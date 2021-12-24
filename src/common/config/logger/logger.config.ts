import console from 'console';
import * as winston from 'winston';
export const format = winston.format;
const util = require('util');
import { MyCustomLevels } from '../../constants/common.constants';
export const myCustomLevels = {
  levels: {
    error: MyCustomLevels.levels.error,
    warn: MyCustomLevels.levels.warn,
    info: MyCustomLevels.levels.info,
    http: MyCustomLevels.levels.http,
    verbose: MyCustomLevels.levels.verbose,
    debug: MyCustomLevels.levels.debug,
    silly: MyCustomLevels.levels.silly,
  },
  colors: {
    error: MyCustomLevels.colors.error,
    warn: MyCustomLevels.colors.warn,
    info: MyCustomLevels.colors.info,
    http: MyCustomLevels.colors.http,
    verbose: MyCustomLevels.colors.verbose,
    debug: MyCustomLevels.colors.debug,
    silly: MyCustomLevels.colors.silly,
  },
};

const formatOutput = format.printf((info) => {
  info.message =
    typeof info.message === 'object'
      ? JSON.stringify(info.message, null, 3)
      : info.message;
  return `[${info.timestamp}] ${info.level} :> ${info.message || ''}`;
});

const formatLevel = format((info) => {
  info.level = info.level.toUpperCase().padEnd(7, '-');
  return info;
});
const formatStack = format((info) => {
  if (info.stack) {
    info.message = util.format(info.message, '\n [errorx64]', info.stack);
  }
  return info;
});

export const LoggerConfig = {
  levels: myCustomLevels.levels, //custom lever
  level: 'info', //default info
  format: format.combine(format.errors({ stack: 'true' }), format.timestamp()),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        formatLevel(),
        formatStack(),
        winston.format.timestamp(),
        format.colorize({
          all: true,
        }),
        formatOutput,
      ),
    }),
  ],
};
