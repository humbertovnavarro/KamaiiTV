"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/user/register";
exports.ids = ["pages/api/user/register"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),

/***/ "./pages/api/user/register.ts":
/*!************************************!*\
  !*** ./pages/api/user/register.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! argon2 */ \"argon2\");\n/* harmony import */ var argon2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(argon2__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function handler(req, res) {\n    const { username , hashedPassword , email  } = req.body;\n    if (!username || typeof username != 'string') {\n        return res.status(400).send({\n            error: \"Invalid username\"\n        });\n    }\n    if (!hashedPassword || typeof hashedPassword != 'string') {\n        return res.send({\n            error: \"Invalid password\"\n        });\n    }\n    if (!email || typeof email != 'string') {\n        return res.send({\n            error: \"Invalid email\"\n        });\n    }\n    const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    const password = await argon2__WEBPACK_IMPORTED_MODULE_1___default().hash(hashedPassword);\n    const exists = await prisma.user.findFirst({\n        where: {\n            usernameLower: {\n                equals: username.toLowerCase()\n            }\n        },\n        select: {\n            username: true\n        }\n    });\n    if (exists) {\n        return res.status(409).send({\n            error: `Username \"${exists.username}\" already exists`\n        });\n    }\n    const user = await prisma.user.create({\n        data: {\n            username,\n            usernameLower: username.toLowerCase(),\n            password\n        },\n        select: {\n            id: true\n        }\n    });\n    await prisma.email.create({\n        data: {\n            email: email,\n            userId: user.id\n        }\n    });\n    res.status(200).json({\n        error: \"ok\"\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvdXNlci9yZWdpc3Rlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2QztBQUdsQjtBQUNaLGVBQWVFLE9BQU8sQ0FDbkNDLEdBQW1CLEVBQ25CQyxHQUF5QyxFQUN6QyxDQUFDO0lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsUUFBUSxHQUFFQyxjQUFjLEdBQUVDLEtBQUssRUFBQyxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssSUFBSTtJQUVwRCxFQUFFLEdBQUdILFFBQVEsSUFBSSxNQUFNLENBQUNBLFFBQVEsSUFBSSxDQUFRLFNBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUNELEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDLENBQUM7WUFDM0JDLEtBQUssRUFBRSxDQUFrQjtRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUNELEVBQUUsR0FBR0wsY0FBYyxJQUFJLE1BQU0sQ0FBQ0EsY0FBYyxJQUFJLENBQVEsU0FBRSxDQUFDO1FBQ3pELE1BQU0sQ0FBQ0YsR0FBRyxDQUFDTSxJQUFJLENBQUMsQ0FBQztZQUNmQyxLQUFLLEVBQUUsQ0FBa0I7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFDRCxFQUFFLEdBQUdKLEtBQUssSUFBSSxNQUFNLENBQUNBLEtBQUssSUFBSSxDQUFRLFNBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUNILEdBQUcsQ0FBQ00sSUFBSSxDQUFDLENBQUM7WUFDZkMsS0FBSyxFQUFFLENBQWU7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFDRCxLQUFLLENBQUNDLE1BQU0sR0FBRyxHQUFHLENBQUNaLHdEQUFZO0lBQy9CLEtBQUssQ0FBQ2EsUUFBUSxHQUFHLEtBQUssQ0FBQ1osa0RBQVcsQ0FBQ0ssY0FBYztJQUNqRCxLQUFLLENBQUNTLE1BQU0sR0FBRyxLQUFLLENBQUNILE1BQU0sQ0FBQ0ksSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztRQUMxQ0MsS0FBSyxFQUFFLENBQUM7WUFDTkMsYUFBYSxFQUFFLENBQUM7Z0JBQ2RDLE1BQU0sRUFBRWYsUUFBUSxDQUFDZ0IsV0FBVztZQUM5QixDQUFDO1FBQ0gsQ0FBQztRQUNEQyxNQUFNLEVBQUUsQ0FBQztZQUNQakIsUUFBUSxFQUFFLElBQUk7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFDRCxFQUFFLEVBQUVVLE1BQU0sRUFBRSxDQUFDO1FBQ1gsTUFBTSxDQUFDWCxHQUFHLENBQUNLLE1BQU0sQ0FBQyxHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFDO1lBQzNCQyxLQUFLLEdBQUcsVUFBVSxFQUFFSSxNQUFNLENBQUNWLFFBQVEsQ0FBQyxnQkFBZ0I7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFDRCxLQUFLLENBQUNXLElBQUksR0FBRyxLQUFLLENBQUNKLE1BQU0sQ0FBQ0ksSUFBSSxDQUFDTyxNQUFNLENBQUMsQ0FBQztRQUNyQ0MsSUFBSSxFQUFFLENBQUM7WUFDTG5CLFFBQVE7WUFDUmMsYUFBYSxFQUFFZCxRQUFRLENBQUNnQixXQUFXO1lBQ25DUixRQUFRO1FBQ1YsQ0FBQztRQUNEUyxNQUFNLEVBQUUsQ0FBQztZQUNQRyxFQUFFLEVBQUUsSUFBSTtRQUNWLENBQUM7SUFDSCxDQUFDO0lBQ0QsS0FBSyxDQUFDYixNQUFNLENBQUNMLEtBQUssQ0FBQ2dCLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCQyxJQUFJLEVBQUUsQ0FBQztZQUNMakIsS0FBSyxFQUFFQSxLQUFLO1lBQ1ptQixNQUFNLEVBQUVWLElBQUksQ0FBQ1MsRUFBRTtRQUNqQixDQUFDO0lBQ0gsQ0FBQztJQUNEckIsR0FBRyxDQUFDSyxNQUFNLENBQUMsR0FBRyxFQUFFa0IsSUFBSSxDQUFDLENBQUM7UUFDcEJoQixLQUFLLEVBQUUsQ0FBSTtJQUNiLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FtYWlpdHZ0d28vLi9wYWdlcy9hcGkvdXNlci9yZWdpc3Rlci50cz9hNmMxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIi4uL190eXBlcy5kLlwiO1xuaW1wb3J0IGFyZ29uMiBmcm9tIFwiYXJnb24yXCI7XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxSZXNwb25zZTx1bmRlZmluZWQ+PlxuKSB7XG4gIGNvbnN0IHsgdXNlcm5hbWUsIGhhc2hlZFBhc3N3b3JkLCBlbWFpbCB9ID0gcmVxLmJvZHk7XG5cbiAgaWYgKCF1c2VybmFtZSB8fCB0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgZXJyb3I6IFwiSW52YWxpZCB1c2VybmFtZVwiXG4gICAgfSlcbiAgfVxuICBpZiAoIWhhc2hlZFBhc3N3b3JkIHx8IHR5cGVvZiBoYXNoZWRQYXNzd29yZCAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXMuc2VuZCh7XG4gICAgICBlcnJvcjogXCJJbnZhbGlkIHBhc3N3b3JkXCJcbiAgICB9KVxuICB9XG4gIGlmICghZW1haWwgfHwgdHlwZW9mIGVtYWlsICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHJlcy5zZW5kKHtcbiAgICAgIGVycm9yOiBcIkludmFsaWQgZW1haWxcIlxuICAgIH0pXG4gIH1cbiAgY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuICBjb25zdCBwYXNzd29yZCA9IGF3YWl0IGFyZ29uMi5oYXNoKGhhc2hlZFBhc3N3b3JkKTtcbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZEZpcnN0KHtcbiAgICB3aGVyZToge1xuICAgICAgdXNlcm5hbWVMb3dlcjoge1xuICAgICAgICBlcXVhbHM6IHVzZXJuYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIHVzZXJuYW1lOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKGV4aXN0cykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuc2VuZCh7XG4gICAgICBlcnJvcjogYFVzZXJuYW1lIFwiJHtleGlzdHMudXNlcm5hbWV9XCIgYWxyZWFkeSBleGlzdHNgXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdXNlcm5hbWUsXG4gICAgICB1c2VybmFtZUxvd2VyOiB1c2VybmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlXG4gICAgfVxuICB9KVxuICBhd2FpdCBwcmlzbWEuZW1haWwuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBlbWFpbDogZW1haWwsXG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfVxuICB9KVxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgZXJyb3I6IFwib2tcIlxuICB9KVxufVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImFyZ29uMiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ1c2VybmFtZSIsImhhc2hlZFBhc3N3b3JkIiwiZW1haWwiLCJib2R5Iiwic3RhdHVzIiwic2VuZCIsImVycm9yIiwicHJpc21hIiwicGFzc3dvcmQiLCJoYXNoIiwiZXhpc3RzIiwidXNlciIsImZpbmRGaXJzdCIsIndoZXJlIiwidXNlcm5hbWVMb3dlciIsImVxdWFscyIsInRvTG93ZXJDYXNlIiwic2VsZWN0IiwiY3JlYXRlIiwiZGF0YSIsImlkIiwidXNlcklkIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/user/register.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/user/register.ts"));
module.exports = __webpack_exports__;

})();