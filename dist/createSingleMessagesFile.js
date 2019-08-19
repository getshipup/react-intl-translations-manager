"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _mkdirp = require("mkdirp");

var _stringify = _interopRequireDefault(require("./stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var messages = _ref.messages,
      directory = _ref.directory,
      _ref$fileName = _ref.fileName,
      fileName = _ref$fileName === void 0 ? 'defaultMessages.json' : _ref$fileName,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === void 0 ? true : _ref$sortKeys,
      _ref$jsonSpaceIndenta = _ref.jsonSpaceIndentation,
      jsonSpaceIndentation = _ref$jsonSpaceIndenta === void 0 ? 2 : _ref$jsonSpaceIndenta;

  if (!messages) {
    throw new Error('Messages are required');
  }

  if (!directory || typeof directory !== 'string' || directory.length === 0) {
    throw new Error('Directory is required');
  }

  var DIR = _path.default.join(directory, fileName);

  (0, _mkdirp.sync)(directory);
  (0, _fs.writeFileSync)(DIR, (0, _stringify.default)(messages, {
    space: jsonSpaceIndentation,
    sortKeys: sortKeys
  }));
};

exports.default = _default;