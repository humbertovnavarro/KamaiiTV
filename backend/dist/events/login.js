"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../lib/validators");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
function login(socket) {
    const token = socket.handshake.auth.token;
    if (token === "anonymous") {
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        if (!(0, validators_1.isUserToken)(decoded)) {
            return socket.emit("login_error", { status: "internal server error" });
        }
        socket.user = decoded;
        return socket.emit("login_success", { status: "ok" });
    }
    catch (err) {
        socket.emit("login_error", { status: "unauthorized" });
        socket.disconnect();
        return;
    }
}
exports.default = login;
