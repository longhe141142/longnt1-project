import {customLevel} from '../constants/interface'

export const RegValidate = {
  WHITESPACE_BETWEEN: /^(\w+\s?)*\s*$/,
  REMOVE_WHITESPACE_REG: /\s+/g,
};

export const MyCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'grey',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta',
  },
};

export const bcryptSalt = 9;
