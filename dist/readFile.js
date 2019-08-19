"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _default = function _default(filename) {
  try {
    return (0, _fs.readFileSync)(filename, 'utf8');
  } catch (err) {
    return undefined;
  }
};

exports.default = _default;