"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../lib/validators");
function join(socket) {
    socket.on("join", (req) => {
        if (req === 0 && socket.publicRoom) {
            socket.leave(socket.publicRoom);
            socket.publicRoom = null;
        }
        if (!(0, validators_1.isPositiveInt)(req)) {
            return socket.emit("join_error", { status: "invalid room id" });
        }
        socket.join(req);
        socket.publicRoom = req;
        socket.emit("join_success", { status: "ok" });
    });
}
exports.default = join;
