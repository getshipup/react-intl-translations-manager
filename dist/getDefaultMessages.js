"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// FROM:
//
// const files = [
//   {
//     path: 'src/components/Foo.json',
//     descriptors: [
//       {
//         id: 'foo_ok',
//         description: 'Ok text',
//         defaultMessage: 'OK',
//       },
//       {
//         id: 'foo_ok',
//         description: 'Submit text',
//         defaultMessage: 'Submit',
//       },
//       {
//         id: 'foo_cancel',
//         description: 'Cancel text',
//         defaultMessage: 'Cancel',
//       },
//     ],
//   },
// ];
//
// TO:
//
// TODO: figure out what message gets returned for duplicate ids
//
// const result = {
//   messages: {
//     foo_ok: 'OK | Submit',
//     foo_cancel: 'Cancel',
//   },
//   duplicateIds: [
//     'foo_ok',
//   ],
// };
var _default = function _default(files) {
  if (!files) throw new Error('Files are required');
  return files.reduce(function (fileAcc, _ref) {
    var descriptors = _ref.descriptors;
    var duplicateIds = fileAcc.duplicateIds;
    return {
      messages: descriptors.reduce(function (descAcc, _ref2) {
        var id = _ref2.id,
            defaultMessage = _ref2.defaultMessage;

        if (descAcc[id] !== undefined) {
          duplicateIds.push(id);
        }

        return _objectSpread({}, descAcc, _defineProperty({}, id, defaultMessage));
      }, fileAcc.messages),
      duplicateIds: duplicateIds
    };
  }, {
    messages: {},
    duplicateIds: []
  });
};

exports.default = _default;