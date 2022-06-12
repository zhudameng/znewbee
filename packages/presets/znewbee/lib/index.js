"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PresetNocobase = void 0;

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

class PresetNocobase extends _server().Plugin {
  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.PresetNocobase = PresetNocobase;
var _default = PresetNocobase;
exports.default = _default;
