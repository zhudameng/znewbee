"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _collection = _interopRequireDefault(require("./collection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(plugin) {
  const triggers = plugin.triggers;
  triggers.register('collection', new _collection.default(plugin)); // triggers.register('schedule', new Schedule(plugin));
}