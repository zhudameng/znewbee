"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instructions = exports.default = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

var _prompt = _interopRequireDefault(require("./prompt"));

var _calculation = _interopRequireDefault(require("./calculation"));

var _condition = _interopRequireDefault(require("./condition"));

var _parallel = _interopRequireDefault(require("./parallel"));

var _query = _interopRequireDefault(require("./query"));

var _create = _interopRequireDefault(require("./create"));

var _update = _interopRequireDefault(require("./update"));

var _destroy = _interopRequireDefault(require("./destroy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const instructions = new (_utils().Registry)();
exports.instructions = instructions;
instructions.register('prompt', _prompt.default);
instructions.register('calculation', _calculation.default);
instructions.register('condition', _condition.default);
instructions.register('parallel', _parallel.default);
instructions.register('query', _query.default);
instructions.register('create', _create.default);
instructions.register('update', _update.default);
instructions.register('destroy', _destroy.default);
var _default = instructions;
exports.default = _default;
