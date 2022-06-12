"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _plugin.default;
  }
});

var _plugin = _interopRequireDefault(require("./plugin"));

var _repositories = require("./repositories");

Object.keys(_repositories).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _repositories[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _repositories[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }