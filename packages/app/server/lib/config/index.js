"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("./database"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _resourcer = _interopRequireDefault(require("./resourcer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  database: _database.default,
  resourcer: _resourcer.default,
  plugins: _plugins.default
};
exports.default = _default;