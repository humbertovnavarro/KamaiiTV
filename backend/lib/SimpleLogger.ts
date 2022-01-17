import colors from "colors";
import fs from "fs";
type SimpleLoggerOptions = {
  logLevel: SimpleLoggerLevel;
}
enum SimpleLoggerLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL
}
export default class SimpleLogger {
  opts: SimpleLoggerOptions;
  logFunctions?: Array<(level: SimpleLoggerLevel, message: unknown) => void>;
  constructor(opts: SimpleLoggerOptions) {
    this.opts = opts;
  }
  private log(level: SimpleLoggerLevel, message: unknown) {
    if(this.logFunctions) {
      this.logFunctions.forEach(func => func(level, message));
    }
  }
  use(logFunction: (level: SimpleLoggerLevel, message: unknown) => void) {
    if(!this.logFunctions) {
      this.logFunctions = [];
    }
    this.logFunctions.push(logFunction);
  }
  logInfo(...args: unknown[]) {
    if(this.opts.logLevel > SimpleLoggerLevel.INFO) {
      return;
    }
    this.log(SimpleLoggerLevel.INFO, JSON.stringify(args, null, 2));
  }
  logWarn(...args: unknown[]) {
    if (this.opts.logLevel > SimpleLoggerLevel.WARN) {
      return;
    }
    this.log(SimpleLoggerLevel.WARN, JSON.stringify(args, null, 2));
  }
  logError(...args: unknown[]) {
    if (this.opts.logLevel > SimpleLoggerLevel.ERROR) {
      return;
    }
    this.log(SimpleLoggerLevel.ERROR, JSON.stringify(args, null, 2));
  }
  logDebug(...args: unknown[]) {
    if (this.opts.logLevel > SimpleLoggerLevel.DEBUG) {
      return;
    }
    this.log(SimpleLoggerLevel.DEBUG, JSON.stringify(args, null, 2));
  }
  logFatal(...args: unknown[]) {
    if (this.opts.logLevel > SimpleLoggerLevel.FATAL) {
      return;
    }
    this.log(SimpleLoggerLevel.FATAL, JSON.stringify(args, null , 2));
  }
}
function Debug(message: unknown) {
  return colors.green(`[DEBUG] ${message}`);
}
function Info(message: unknown) {
  return colors.white(`[INFO] ${message}`);
}
function Warn(message: unknown) {
  return colors.yellow(`[WARN] ${message}`);
}
function Error(message: unknown) {
  return colors.red(`[ERROR] ${message}`);
}
function Fatal(message: unknown) {
  return colors.red(colors.bgWhite(` [FATAL] ${message}`));
}
function Colorize(level: SimpleLoggerLevel, message: unknown) {
  switch (level) {
  case SimpleLoggerLevel.DEBUG:
    return Debug(message);
  case SimpleLoggerLevel.INFO:
    return Info(message);
  case SimpleLoggerLevel.WARN:
    return Warn(message);
  case SimpleLoggerLevel.ERROR:
    return Error(message);
  case SimpleLoggerLevel.FATAL:
    return Fatal(message);
  }
}
function Logify(level: SimpleLoggerLevel, message: unknown) {
  return `[${new Date().toLocaleString()}]\n${message}\n`;
}
function ConsoleLogger() {
  return function(level: SimpleLoggerLevel, message: unknown) {
    console.log(Colorize(level, Logify(level, message)));
  };
}
function FileLogger(filename: string, maxSize: number = 1024 * 1024) {
  fs.writeFile(filename, "", (err) => {
    console.log(err);
    return;
  });
  return function(level: SimpleLoggerLevel, message: unknown) {
    fs.stat(filename, (err, stats) => {
      if(err) {
        console.error(err);
        return;
      }
      if(stats.size > maxSize) {
        fs.rename(filename, `${filename}.${new Date().toLocaleString()}`, (err) => {
          console.error(err);
        });
      }
      fs.appendFile(filename, `${Logify(level, message)}\n`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  };
}
function CustomLogger(callback: (level: SimpleLoggerLevel, message: unknown) => void) {
  return function(level: SimpleLoggerLevel, message: unknown) {
    callback(level, Logify(level, message));
  };
}
export { ConsoleLogger, FileLogger, CustomLogger };
