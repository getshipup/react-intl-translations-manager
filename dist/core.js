"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getDefaultMessages = _interopRequireDefault(require("./getDefaultMessages"));

var _getLanguageReport = _interopRequireDefault(require("./getLanguageReport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(languages, hooks) {
  var provideExtractedMessages = hooks.provideExtractedMessages,
      outputSingleFile = hooks.outputSingleFile,
      outputDuplicateKeys = hooks.outputDuplicateKeys,
      beforeReporting = hooks.beforeReporting,
      provideLangTemplate = hooks.provideLangTemplate,
      provideTranslationsFile = hooks.provideTranslationsFile,
      provideWhitelistFile = hooks.provideWhitelistFile,
      reportLanguage = hooks.reportLanguage,
      afterReporting = hooks.afterReporting;
  var extractedMessages = provideExtractedMessages();

  if (typeof outputSingleFile === 'function') {
    outputSingleFile(extractedMessages);
  }

  var defaultMessages = (0, _getDefaultMessages.default)(extractedMessages);

  if (typeof outputDuplicateKeys === 'function') {
    outputDuplicateKeys(defaultMessages.duplicateIds);
  }

  if (typeof beforeReporting === 'function') beforeReporting();
  languages.forEach(function (lang) {
    var langResults = provideLangTemplate(lang);
    var file = provideTranslationsFile(langResults);
    var whitelistFile = provideWhitelistFile(langResults);
    if (!file) langResults.noTranslationFile = true;
    if (!whitelistFile) langResults.noWhitelistFile = true;
    langResults.report = (0, _getLanguageReport.default)(defaultMessages.messages, file, whitelistFile);
    if (typeof reportLanguage === 'function') reportLanguage(langResults);
  });
  if (typeof afterReporting === 'function') afterReporting();
};

exports.default = _default;