"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveDefaultValue = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _hooks = require("../../hooks");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SaveDefaultValue = function SaveDefaultValue(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useDesignable = (0, _hooks.useDesignable)(),
      designable = _useDesignable.designable,
      dn = _useDesignable.dn,
      refresh = _useDesignable.refresh;

  var fieldSchema = (0, _react.useFieldSchema)();
  var form = (0, _react.useForm)();

  if (!designable) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Button, {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        border-color: rgb(241, 139, 98);\n        color: rgb(241, 139, 98);\n      "]))),
    type: 'dashed',
    onClick: function onClick() {
      var _fieldSchema$parent, _fieldSchema$parent$p, _fieldSchema$parent$p2, _fieldSchema$parent$p3;

      var filterSchema = fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$parent = fieldSchema.parent) === null || _fieldSchema$parent === void 0 ? void 0 : (_fieldSchema$parent$p = _fieldSchema$parent.parent) === null || _fieldSchema$parent$p === void 0 ? void 0 : (_fieldSchema$parent$p2 = _fieldSchema$parent$p.parent) === null || _fieldSchema$parent$p2 === void 0 ? void 0 : (_fieldSchema$parent$p3 = _fieldSchema$parent$p2.properties) === null || _fieldSchema$parent$p3 === void 0 ? void 0 : _fieldSchema$parent$p3.filter;

      if (!filterSchema) {
        return;
      }

      var defaultValue = form.values.filter;
      dn.emit('patch', {
        schema: {
          'x-uid': filterSchema['x-uid'],
          default: defaultValue
        }
      });
      dn.refresh();
      filterSchema.default = defaultValue;
      console.log('filterSchema', defaultValue);
    }
  }, t('Save conditions'));
};

exports.SaveDefaultValue = SaveDefaultValue;