"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const login_1 = __importDefault(require("./events/login"));
const join_1 = __importDefault(require("./events/join"));
function setup(server) {
    const IOOptions = {
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
            methods: "GET, POST",
        }
    };
    const io = new socket_io_1.Server(server, IOOptions);
    io.on("connection", (ioSocket) => {
        const socket = ioSocket;
        (0, login_1.default)(socket);
        (0, join_1.default)(socket);
    });
}
exports.default = setup;
