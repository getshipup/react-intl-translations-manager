"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = require("chalk");

var _printer = require("./printer");

var _compareByKey = _interopRequireDefault(require("./compareByKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var deleted = _ref.deleted,
      untranslated = _ref.untranslated,
      added = _ref.added,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === void 0 ? true : _ref$sortKeys;

  if (!(deleted.length || added.length || untranslated.length)) {
    console.log((0, _chalk.green)('  Perfectly maintained, no remarks!'));
    (0, _printer.newLine)();
  } else {
    if (deleted.length) {
      var items = sortKeys ? deleted.sort(_compareByKey.default) : deleted;
      (0, _printer.subheader)('Deleted keys:');
      items.forEach(function (_ref2) {
        var key = _ref2.key,
            message = _ref2.message;
        return console.log("  ".concat((0, _chalk.red)(key), ": ").concat((0, _chalk.cyan)(message)));
      });
      (0, _printer.newLine)();
    }

    if (untranslated.length) {
      var _items = sortKeys ? untranslated.sort(_compareByKey.default) : untranslated;

      (0, _printer.subheader)('Untranslated keys:');

      _items.forEach(function (_ref3) {
        var key = _ref3.key,
            message = _ref3.message;
        return console.log("  ".concat((0, _chalk.yellow)(key), ": ").concat((0, _chalk.cyan)(message)));
      });

      (0, _printer.newLine)();
    }

    if (added.length) {
      var _items2 = sortKeys ? added.sort(_compareByKey.default) : added;

      (0, _printer.subheader)('Added keys:');

      _items2.forEach(function (_ref4) {
        var key = _ref4.key,
            message = _ref4.message;
        return console.log("  ".concat((0, _chalk.green)(key), ": ").concat((0, _chalk.cyan)(message)));
      });

      (0, _printer.newLine)();
    }
  }
};

exports.default = _default;