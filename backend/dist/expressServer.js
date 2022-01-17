"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const login_1 = __importDefault(require("./routes/users/login"));
const register_1 = __importDefault(require("./routes/users/register"));
const test_1 = __importDefault(require("./routes/test"));
const express = (0, express_1.default)();
exports.express = express;
express.use(express_1.default.json());
express.post("/v1/users/login", login_1.default);
express.post("/v1/users/register", register_1.default);
express.get("/v1/test", test_1.default);
const httpServer = (0, http_1.createServer)(express);
exports.httpServer = httpServer;
