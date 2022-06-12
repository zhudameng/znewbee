"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;

function _deepmerge() {
  const data = _interopRequireDefault(require("deepmerge"));

  _deepmerge = function _deepmerge() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

function merge(obj1, obj2) {
  return (0, _deepmerge().default)(obj1, obj2, {
    arrayMerge: overwriteMerge
  });
}