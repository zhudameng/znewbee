"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("../../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = (0, _react.observer)(function (props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      marginBottom: 20,
      padding: '0 20px',
      height: 50,
      lineHeight: '50px',
      background: '#f1f1f1'
    }
  }, "Block ", fieldSchema.title, /*#__PURE__*/_react2.default.createElement(_.DragHandler, null));
});
exports.Block = Block;