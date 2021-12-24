export interface customLevel {
  levels: level;
  colors: colors;
}

interface level {
  error: Number;
  warn: Number;
  info: Number;
  http: Number;
  verbose: Number;
  debug: Number;
  silly: Number;
}

interface colors {
  error: string;
  warn: string;
  info: string;
  http: string;
  verbose: string;
  debug: string;
  silly: string;
}
