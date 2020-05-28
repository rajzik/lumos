"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.another = exports.Ahoj = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseBase"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldLooseKey"));

const test = '';

class Ahoj {
  constructor() {
    Object.defineProperty(this, _totally, {
      writable: true,
      value: 'test'
    });
  }

  get Totally() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _totally)[_totally];
  }

}

exports.Ahoj = Ahoj;

var _totally = (0, _classPrivateFieldLooseKey2.default)("totally");

const another = a => {
  return a ?? '';
};

exports.another = another;
var _default = test;
exports.default = _default;
