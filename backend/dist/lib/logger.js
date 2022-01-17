"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLogger_1 = __importDefault(require("./SimpleLogger"));
const SimpleLogger_2 = require("./SimpleLogger");
const logger = new SimpleLogger_1.default({
    logLevel: 1,
});
logger.use((0, SimpleLogger_2.ConsoleLogger)());
logger.use((0, SimpleLogger_2.FileLogger)("log.txt"));
exports.default = logger;
