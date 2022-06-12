"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("react"));

var _schemaInitializer = require("../../../schema-initializer");

var _common = require("../../common");

var _useDesigner = require("../../hooks/useDesigner");

var _Tabs = require("./Tabs.Designer");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tabs = (0, _react.observer)(function (props) {
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useSchemaInitializer = (0, _schemaInitializer.useSchemaInitializer)(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  return /*#__PURE__*/_react2.default.createElement(_common.DndContext, null, /*#__PURE__*/_react2.default.createElement(_antd.Tabs, {
    tabBarExtraContent: {
      right: render()
    }
  }, fieldSchema.mapProperties(function (schema, key) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Tabs.TabPane, {
      tab: /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
        name: key,
        schema: schema,
        onlyRenderSelf: true
      }),
      key: key
    }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
      name: key,
      schema: schema,
      onlyRenderProperties: true
    }));
  })));
});
exports.Tabs = Tabs;
var designerCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    color:#44a85d;\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    color:#31b989;\n    font:16px bold;\n    > .general-schema-designer {\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06);\n    border: 0;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: green;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
Tabs.TabPane = (0, _react.observer)(function (props) {
  var Designer = (0, _useDesigner.useDesigner)();
  var field = (0, _react.useField)();
  return /*#__PURE__*/_react2.default.createElement(_common.SortableItem, {
    className: (0, _classnames.default)('nb-action-link', designerCss, props.className)
  }, props.tab || field.title, /*#__PURE__*/_react2.default.createElement(Designer, null));
});
Tabs.Designer = _Tabs.TabsDesigner;