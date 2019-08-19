"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.subheader = exports.header = exports.newLine = void 0;

var _chalk = require("chalk");

var newLine = function newLine() {
  return console.log(' ');
};

exports.newLine = newLine;

var header = function header(title) {
  console.log(_chalk.bold.underline(title));
  newLine();
};

exports.header = header;

var subheader = function subheader(title) {
  return console.log(title);
};

exports.subheader = subheader;

var footer = function footer() {
  newLine();
};

exports.footer = footer;