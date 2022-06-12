"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.designerCss = exports.TableColumnActionBar = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("../..");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var designerCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06) !important;\n    border: 0 !important;\n    top: -16px !important;\n    bottom: -16px !important;\n    left: -16px !important;\n    right: -16px !important;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: green;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
exports.designerCss = designerCss;
var TableColumnActionBar = (0, _react.observer)(function (props) {
  var Designer = (0, _.useDesigner)();
  return /*#__PURE__*/_react2.default.createElement(_.SortableItem, {
    className: designerCss
  }, /*#__PURE__*/_react2.default.createElement(Designer, null), props.children);
});
exports.TableColumnActionBar = TableColumnActionBar;