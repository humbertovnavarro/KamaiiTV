"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserTokenSignable = exports.isUserLogin = exports.isUserRegistration = exports.isUserToken = exports.isPositiveInt = void 0;
function isPositiveInt(value) {
    return typeof value === "number"
        && value % 1 === 0
        && value > 0;
}
exports.isPositiveInt = isPositiveInt;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserToken(data) {
    if (typeof data !== "object") {
        return false;
    }
    return Object.keys(data).length === 4
        && typeof data.username === "string"
        && isPositiveInt(data.id)
        && isPositiveInt(data.iat)
        && isPositiveInt(data.exp);
}
exports.isUserToken = isUserToken;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserRegistration(data) {
    if (typeof data !== "object") {
        return false;
    }
    return Object.keys(data).length === 4
        && typeof data.userName === "string"
        && typeof data.email === "string"
        && typeof data.password === "string";
}
exports.isUserRegistration = isUserRegistration;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserLogin(data) {
    if (typeof data !== "object") {
        return false;
    }
    const numKeys = Object.keys(data).length;
    return numKeys === 2 || numKeys === 3
        && typeof data.userName === "string"
        && (typeof data.email === "string" || typeof data.password === "string");
}
exports.isUserLogin = isUserLogin;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserTokenSignable(data) {
    if (typeof data !== "object") {
        return false;
    }
    const numKeys = Object.keys(data).length;
    return numKeys === 2 || numKeys === 3
        && typeof data.userName === "string"
        && (typeof data.email === "string" || typeof data.password === "string");
}
exports.isUserTokenSignable = isUserTokenSignable;
