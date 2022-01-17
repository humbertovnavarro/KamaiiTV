"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = exports.FileLogger = exports.ConsoleLogger = void 0;
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
var SimpleLoggerLevel;
(function (SimpleLoggerLevel) {
    SimpleLoggerLevel[SimpleLoggerLevel["DEBUG"] = 0] = "DEBUG";
    SimpleLoggerLevel[SimpleLoggerLevel["INFO"] = 1] = "INFO";
    SimpleLoggerLevel[SimpleLoggerLevel["WARN"] = 2] = "WARN";
    SimpleLoggerLevel[SimpleLoggerLevel["ERROR"] = 3] = "ERROR";
    SimpleLoggerLevel[SimpleLoggerLevel["FATAL"] = 4] = "FATAL";
})(SimpleLoggerLevel || (SimpleLoggerLevel = {}));
class SimpleLogger {
    constructor(opts) {
        this.opts = opts;
    }
    log(level, message) {
        if (this.logFunctions) {
            this.logFunctions.forEach(func => func(level, message));
        }
    }
    use(logFunction) {
        if (!this.logFunctions) {
            this.logFunctions = [];
        }
        this.logFunctions.push(logFunction);
    }
    logInfo(...args) {
        if (this.opts.logLevel > SimpleLoggerLevel.INFO) {
            return;
        }
        this.log(SimpleLoggerLevel.INFO, JSON.stringify(args, null, 2));
    }
    logWarn(...args) {
        if (this.opts.logLevel > SimpleLoggerLevel.WARN) {
            return;
        }
        this.log(SimpleLoggerLevel.WARN, JSON.stringify(args, null, 2));
    }
    logError(...args) {
        if (this.opts.logLevel > SimpleLoggerLevel.ERROR) {
            return;
        }
        this.log(SimpleLoggerLevel.ERROR, JSON.stringify(args, null, 2));
    }
    logDebug(...args) {
        if (this.opts.logLevel > SimpleLoggerLevel.DEBUG) {
            return;
        }
        this.log(SimpleLoggerLevel.DEBUG, JSON.stringify(args, null, 2));
    }
    logFatal(...args) {
        if (this.opts.logLevel > SimpleLoggerLevel.FATAL) {
            return;
        }
        this.log(SimpleLoggerLevel.FATAL, JSON.stringify(args, null, 2));
    }
}
exports.default = SimpleLogger;
function Debug(message) {
    return colors_1.default.green(`[DEBUG] ${message}`);
}
function Info(message) {
    return colors_1.default.white(`[INFO] ${message}`);
}
function Warn(message) {
    return colors_1.default.yellow(`[WARN] ${message}`);
}
function Error(message) {
    return colors_1.default.red(`[ERROR] ${message}`);
}
function Fatal(message) {
    return colors_1.default.red(colors_1.default.bgWhite(` [FATAL] ${message}`));
}
function Colorize(level, message) {
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
function Logify(level, message) {
    return `[${new Date().toLocaleString()}] ${Colorize(level, message)}`;
}
function ConsoleLogger() {
    return function (level, message) {
        console.log(Logify(level, message));
    };
}
exports.ConsoleLogger = ConsoleLogger;
function FileLogger(filename, maxSize = 1024 * 1024) {
    fs_1.default.writeFile(filename, "", (err) => {
        console.log(err);
        return;
    });
    return function (level, message) {
        fs_1.default.stat(filename, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if (stats.size > maxSize) {
                fs_1.default.rename(filename, `${filename}.${new Date().toLocaleString()}`, (err) => {
                    console.error(err);
                });
            }
            fs_1.default.appendFile(filename, `${Logify(level, message)}\n`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    };
}
exports.FileLogger = FileLogger;
function CustomLogger(callback) {
    return function (level, message) {
        callback(level, Logify(level, message));
    };
}
exports.CustomLogger = CustomLogger;
