"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableColumn = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableColumn = function TableColumn(props) {
  var field = (0, _react.useField)();
  return /*#__PURE__*/_react2.default.createElement("div", null, field.title);
};

exports.TableColumn = TableColumn;