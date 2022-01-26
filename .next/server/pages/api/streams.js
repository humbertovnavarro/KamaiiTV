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
  exports.id = "pages/api/streams";
  exports.ids = ["pages/api/streams"];
  exports.modules = {
    /***/ "@prisma/client":
      /*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
      /***/ (module) => {
        module.exports = require("@prisma/client");

        /***/
      },

    /***/ "./pages/api/streams.ts":
      /*!******************************!*\
  !*** ./pages/api/streams.ts ***!
  \******************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handler(req, res) {\n    const streams = await prisma.stream.findMany();\n    res.status(200).json(streams);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9hcGkvc3RyZWFtcy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDcUQ7QUFDckQsS0FBSyxDQUFDQyxNQUFNLEdBQUcsR0FBRyxDQUFDRCx3REFBWTtBQUNoQixlQUFlRSxPQUFPLENBQ25DQyxHQUFtQixFQUNuQkMsR0FBOEIsRUFDOUIsQ0FBQztJQUNELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEtBQUssQ0FBQ0osTUFBTSxDQUFDSyxNQUFNLENBQUNDLFFBQVE7SUFDNUNILEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDSixPQUFPO0FBQzlCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYW1haWl0dnR3by8uL3BhZ2VzL2FwaS9zdHJlYW1zLnRzPzYxMmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50LCBTdHJlYW0gfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcclxuICByZXM6IE5leHRBcGlSZXNwb25zZTxTdHJlYW1bXT5cclxuKSB7XHJcbiAgY29uc3Qgc3RyZWFtcyA9IGF3YWl0IHByaXNtYS5zdHJlYW0uZmluZE1hbnkoKTtcclxuICByZXMuc3RhdHVzKDIwMCkuanNvbihzdHJlYW1zKTtcclxufVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInN0cmVhbXMiLCJzdHJlYW0iLCJmaW5kTWFueSIsInN0YXR1cyIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/streams.ts\n'
        );

        /***/
      },
  };
  // load runtime
  var __webpack_require__ = require("../../webpack-api-runtime.js");
  __webpack_require__.C(exports);
  var __webpack_exec__ = (moduleId) =>
    __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_exec__("./pages/api/streams.ts");
  module.exports = __webpack_exports__;
})();
