"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableRowActionDesigner = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _schemaComponent = require("../../../schema-component");

var _schemaInitializer = require("../../../schema-initializer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRowActionDesigner = function TableRowActionDesigner(props) {
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useSchemaInitializer = (0, _schemaInitializer.useSchemaInitializer)(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  return /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer'
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 2,
    align: 'center'
  }, /*#__PURE__*/_react2.default.createElement(_schemaComponent.DragHandler, null, /*#__PURE__*/_react2.default.createElement(_icons.DragOutlined, null)), render())));
};

exports.TableRowActionDesigner = TableRowActionDesigner;