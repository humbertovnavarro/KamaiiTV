"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressServer_1 = require("./expressServer");
const ioServer_1 = __importDefault(require("./ioServer"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./lib/logger"));
dotenv_1.default.config();
(0, ioServer_1.default)(expressServer_1.httpServer);
if (require.main === module) {
    try {
        expressServer_1.httpServer.listen(process.env.PORT);
        logger_1.default.logInfo(`Listening on port ${process.env.PORT}`);
    }
    catch (err) {
        logger_1.default.logFatal("Error starting server", err);
        process.exit(1);
    }
}
exports.default = expressServer_1.httpServer;
