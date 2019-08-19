"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _glob = require("glob");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(messagesDirectory) {
  if (!messagesDirectory || typeof messagesDirectory !== 'string' || messagesDirectory.length === 0) {
    throw new Error('messagesDirectory is required');
  }

  var EXTRACTED_MESSAGES_DIR = _path.default.join(messagesDirectory, '/');

  var EXTRACTED_MESSAGES = _path.default.join(EXTRACTED_MESSAGES_DIR, '**/*.json');

  return (0, _glob.sync)(EXTRACTED_MESSAGES).map(function (filename) {
    return {
      path: filename.substring(EXTRACTED_MESSAGES_DIR.length),
      descriptors: JSON.parse((0, _fs.readFileSync)(filename, 'utf8'))
    };
  }).filter(function (file) {
    return file.descriptors.length > 0;
  });
};

exports.default = _default;