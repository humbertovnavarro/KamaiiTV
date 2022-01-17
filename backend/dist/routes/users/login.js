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
const validators_1 = require("../../lib/validators");
const db_1 = __importDefault(require("../../lib/db"));
const tokens_1 = require("../../lib/tokens");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let login;
        let query;
        let search;
        if ((0, validators_1.isUserLogin)(req.body)) {
            login = req.body;
        }
        else {
            return res.sendStatus(400);
        }
        if (login.email) {
            query = `
      SELECT hash, userId, userName from users where "email" = ?
    `;
            search = login.email;
        }
        else if (login.userName) {
            query = `
      SELECT hash, userId, userName from users where "userName" = ?
    `;
            search = login.userName;
        }
        else {
            return res.sendStatus(500);
        }
        try {
            const dbRes = yield db_1.default.query(query, [search]);
            let sign;
            if ((0, validators_1.isUserTokenSignable)(dbRes.rows[0])) {
                sign = dbRes.rows[0];
            }
            else {
                return res.sendStatus(500);
            }
            const token = (0, tokens_1.signToken)(sign);
            return res.json(token);
        }
        catch (err) {
            return res.sendStatus(500);
        }
    });
}
exports.default = login;
