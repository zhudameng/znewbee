"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _mimeMatch() {
  const data = _interopRequireDefault(require("mime-match"));

  _mimeMatch = function _mimeMatch() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(file, options = '*', ctx) {
  return options.toString().split(',').some((0, _mimeMatch().default)(file.mimetype));
}