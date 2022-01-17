"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../lib/tokens");
function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    try {
        (0, tokens_1.verifyToken)(req.headers.authorization);
        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
}
exports.default = auth;
