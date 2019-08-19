"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _compareByKey = _interopRequireDefault(require("./compareByKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(value, _ref) {
  var _ref$replacer = _ref.replacer,
      replacer = _ref$replacer === void 0 ? null : _ref$replacer,
      _ref$space = _ref.space,
      space = _ref$space === void 0 ? 2 : _ref$space,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === void 0 ? true : _ref$sortKeys,
      _ref$trailingNewline = _ref.trailingNewline,
      trailingNewline = _ref$trailingNewline === void 0 ? false : _ref$trailingNewline;
  return (sortKeys ? (0, _jsonStableStringify.default)(value, {
    replacer: replacer,
    space: space,
    cmp: _compareByKey.default
  }) : JSON.stringify(value, replacer, space)) + (trailingNewline ? '\n' : '');
};

exports.default = _default;