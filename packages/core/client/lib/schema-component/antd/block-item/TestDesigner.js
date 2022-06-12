"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestDesigner = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("../../common");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestDesigner = function TestDesigner() {
  var _useDesignable = (0, _hooks.useDesignable)(),
      remove = _useDesignable.remove;

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("a", {
    onClick: function onClick() {
      remove();
    }
  }, "\u5220\u9664"), /*#__PURE__*/_react.default.createElement(_common.DragHandler, null));
};

exports.TestDesigner = TestDesigner;