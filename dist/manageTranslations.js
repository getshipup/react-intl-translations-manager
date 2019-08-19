"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _mkdirp = require("mkdirp");

var _path = _interopRequireDefault(require("path"));

var _chalk = require("chalk");

var _readFile = _interopRequireDefault(require("./readFile"));

var _printer = require("./printer");

var _readMessageFiles = _interopRequireDefault(require("./readMessageFiles"));

var _createSingleMessagesFile = _interopRequireDefault(require("./createSingleMessagesFile"));

var _printResults = _interopRequireDefault(require("./printResults"));

var _stringify = _interopRequireDefault(require("./stringify"));

var _core = _interopRequireDefault(require("./core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        No existing ", " file found.\n        A new one is created.\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultJSONOptions = {
  space: 2,
  trailingNewline: false
};

var _default = function _default(_ref) {
  var messagesDirectory = _ref.messagesDirectory,
      translationsDirectory = _ref.translationsDirectory,
      _ref$whitelistsDirect = _ref.whitelistsDirectory,
      whitelistsDirectory = _ref$whitelistsDirect === void 0 ? translationsDirectory : _ref$whitelistsDirect,
      _ref$languages = _ref.languages,
      languages = _ref$languages === void 0 ? [] : _ref$languages,
      _ref$defaultLanguage = _ref.defaultLanguage,
      defaultLanguage = _ref$defaultLanguage === void 0 ? '' : _ref$defaultLanguage,
      _ref$singleMessagesFi = _ref.singleMessagesFile,
      singleMessagesFile = _ref$singleMessagesFi === void 0 ? false : _ref$singleMessagesFi,
      _ref$detectDuplicateI = _ref.detectDuplicateIds,
      detectDuplicateIds = _ref$detectDuplicateI === void 0 ? true : _ref$detectDuplicateI,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === void 0 ? true : _ref$sortKeys,
      _ref$jsonOptions = _ref.jsonOptions,
      jsonOptions = _ref$jsonOptions === void 0 ? {} : _ref$jsonOptions,
      _ref$overridePrinters = _ref.overridePrinters,
      overridePrinters = _ref$overridePrinters === void 0 ? {} : _ref$overridePrinters,
      _ref$overrideCoreMeth = _ref.overrideCoreMethods,
      overrideCoreMethods = _ref$overrideCoreMeth === void 0 ? {} : _ref$overrideCoreMeth;

  if (!messagesDirectory || !translationsDirectory) {
    throw new Error('messagesDirectory and translationsDirectory are required');
  }

  var defaultPrinters = {
    printDuplicateIds: function printDuplicateIds(duplicateIds) {
      (0, _printer.header)('Duplicate ids:');

      if (duplicateIds.length) {
        duplicateIds.forEach(function (id) {
          console.log('  ', "Duplicate message id: ".concat((0, _chalk.red)(id)));
        });
      } else {
        console.log((0, _chalk.green)('  No duplicate ids found, great!'));
      }

      (0, _printer.footer)();
    },
    printLanguageReport: function printLanguageReport(langResults) {
      (0, _printer.header)("Maintaining ".concat((0, _chalk.yellow)(langResults.languageFilename), ":"));
      (0, _printResults.default)(_objectSpread({}, langResults.report, {
        sortKeys: sortKeys
      }));
    },
    printNoLanguageFile: function printNoLanguageFile(langResults) {
      (0, _printer.subheader)("\n        No existing ".concat(langResults.languageFilename, " translation file found.\n        A new one is created.\n      "));
    },
    printNoLanguageWhitelistFile: function printNoLanguageWhitelistFile(langResults) {
      (0, _printer.subheader)(""(_templateObject2(), langResults)(_templateObject()));
    }
  };

  var printers = _objectSpread({}, defaultPrinters, overridePrinters);

  var stringifyOpts = _objectSpread({}, defaultJSONOptions, jsonOptions, {
    sortKeys: sortKeys
  });

  var defaultCoreMethods = {
    provideExtractedMessages: function provideExtractedMessages() {
      return (0, _readMessageFiles.default)(messagesDirectory);
    },
    outputSingleFile: function outputSingleFile(combinedFiles) {
      if (singleMessagesFile) {
        (0, _createSingleMessagesFile.default)({
          messages: combinedFiles,
          directory: translationsDirectory,
          sortKeys: sortKeys
        });
      }
    },
    outputDuplicateKeys: function outputDuplicateKeys(duplicateIds) {
      if (!detectDuplicateIds) return;
      printers.printDuplicateIds(duplicateIds);
    },
    beforeReporting: function beforeReporting() {
      (0, _mkdirp.sync)(translationsDirectory);
      (0, _mkdirp.sync)(whitelistsDirectory);
    },
    provideLangTemplate: function provideLangTemplate(lang) {
      var languageFilename = "".concat(lang, ".json");

      var languageFilepath = _path.default.join(translationsDirectory, languageFilename);

      var whitelistFilename = "whitelist_".concat(lang, ".json");

      var whitelistFilepath = _path.default.join(whitelistsDirectory, whitelistFilename);

      return {
        lang: lang,
        languageFilename: languageFilename,
        languageFilepath: languageFilepath,
        whitelistFilename: whitelistFilename,
        whitelistFilepath: whitelistFilepath
      };
    },
    provideTranslationsFile: function provideTranslationsFile(langResults) {
      var jsonFile = (0, _readFile.default)(langResults.languageFilepath);
      return jsonFile ? JSON.parse(jsonFile) : undefined;
    },
    provideWhitelistFile: function provideWhitelistFile(langResults) {
      var jsonFile = (0, _readFile.default)(langResults.whitelistFilepath);
      return jsonFile ? JSON.parse(jsonFile) : undefined;
    },
    reportLanguage: function reportLanguage(langResults) {
      if (langResults.lang === defaultLanguage) {
        langResults.report.untranslated = [];
      }

      if (!langResults.report.noTranslationFile && !langResults.report.noWhitelistFile) {
        printers.printLanguageReport(langResults);
        (0, _fs.writeFileSync)(langResults.languageFilepath, (0, _stringify.default)(langResults.report.fileOutput, stringifyOpts));
        (0, _fs.writeFileSync)(langResults.whitelistFilepath, (0, _stringify.default)(langResults.report.whitelistOutput, stringifyOpts));
      } else {
        if (langResults.report.noTranslationFile) {
          printers.printNoLanguageFile(langResults);
          (0, _fs.writeFileSync)(langResults, (0, _stringify.default)(langResults.report.fileOutput, stringifyOpts));
        }

        if (langResults.report.noWhitelistFile) {
          printers.printNoLanguageWhitelistFile(langResults);
          (0, _fs.writeFileSync)(langResults.whitelistFilepath, (0, _stringify.default)([], stringifyOpts));
        }
      }
    },
    afterReporting: function afterReporting() {}
  };
  (0, _core.default)(languages, _objectSpread({}, defaultCoreMethods, overrideCoreMethods));
};

exports.default = _default;