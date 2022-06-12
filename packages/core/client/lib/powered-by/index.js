"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoweredBy = void 0;

var _css = require("@emotion/css");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PoweredBy = function PoweredBy() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      i18n = _useTranslation.i18n;

  var urls = {
    'en-US': 'https://www.znewbee.com',
    'zh-CN': 'https://cn.znewbee.com'
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        text-align: center;\n        color: rgba(0, 0, 0, 0.45);\n        a {\n          color: rgba(0, 0, 0, 0.45);\n          &:hover {\n            color: rgba(0, 0, 0, 0.85);\n          }\n        }\n      "])))
  }, "\u7531\u4E91\u679C\u4EA7\u4E1A\u5927\u8111\u63D0\u4F9B\u6280\u672F\u652F\u6301\u3002");
};

exports.PoweredBy = PoweredBy;
