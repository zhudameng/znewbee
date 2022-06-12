"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLayout = AuthLayout;

var _css = require("@emotion/css");

var _react = _interopRequireDefault(require("react"));

var _systemSettings = require("../../../system-settings");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function AuthLayout(props) {
  var _useSystemSettings = (0, _systemSettings.useSystemSettings)(),
      data = _useSystemSettings.data;

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundImage: "url('http://zhudameng.natapp1.cc/storage/uploads/login-bg.png')",
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      margin: 'auto',
      maxWidth: 400,
      marginRight: '15%',
      paddingTop: '55vh'
    }
  }, props.children, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          position: absolute;\n          left:0,\n          right:0,\n          bottom:0,\n          top:0,\n          margin:'auto',\n        "])))
  })));
}