"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../lib/db"));
const argon2_1 = __importDefault(require("argon2"));
const tokens_1 = require("../../lib/tokens");
const validators_1 = require("../../lib/validators");
const logger_1 = __importDefault(require("../../lib/logger"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let registration;
        let hash;
        if ((0, validators_1.isUserRegistration)(req.body)) {
            registration = req.body;
        }
        else {
            logger_1.default.logInfo("Bad registration data.", req.body);
            return res.sendStatus(400);
        }
        const { userName, email, password } = registration;
        try {
            hash = yield argon2_1.default.hash(password);
            const dbRes = yield db_1.default.query(`
        INSERT INTO users(userName, email, hash)
        VALUES (?, ?, ?)
        returning userId;
      `, [userName, email, hash]);
            const { userId } = dbRes.rows[0];
            const sign = {
                userId,
                userName
            };
            const token = (0, tokens_1.signToken)(sign);
            if (!token) {
                logger_1.default.logError("Failed to sign token");
                return res.sendStatus(500);
            }
            return res.json(token);
        }
        catch (err) {
            logger_1.default.logError(err);
            return res.sendStatus(500);
        }
    });
}
exports.default = register;
