"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validators_1 = require("./validators");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES;
function signToken(signable) {
    const signOpts = {
        expiresIn: TOKEN_EXPIRES
    };
    return jsonwebtoken_1.default.sign(signable, TOKEN_SECRET, signOpts);
}
exports.signToken = signToken;
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    if ((0, validators_1.isUserToken)(decoded)) {
        return decoded;
    }
    return null;
}
exports.verifyToken = verifyToken;
