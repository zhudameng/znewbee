"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Password = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _PasswordStrength = require("./PasswordStrength");

var _excluded = ["value", "className", "checkStrength"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Password = (0, _react.connect)(function (props) {
  var value = props.value,
      className = props.className,
      checkStrength = props.checkStrength,
      others = _objectWithoutProperties(props, _excluded);

  var blockStyle = {
    position: 'absolute',
    zIndex: 1,
    height: 8,
    top: 0,
    background: '#fff',
    width: 1,
    transform: 'translate(-50%, 0)'
  };
  return /*#__PURE__*/_react2.default.createElement("span", {
    className: className
  }, /*#__PURE__*/_react2.default.createElement(_antd.Input.Password, _objectSpread(_objectSpread({}, others), {}, {
    value: value
  })), checkStrength && /*#__PURE__*/_react2.default.createElement(_PasswordStrength.PasswordStrength, {
    value: value
  }, function (score) {
    return /*#__PURE__*/_react2.default.createElement("div", {
      style: {
        background: '#e0e0e0',
        marginBottom: 3,
        position: 'relative'
      }
    }, /*#__PURE__*/_react2.default.createElement("div", {
      style: _objectSpread(_objectSpread({}, blockStyle), {}, {
        left: '20%'
      })
    }), /*#__PURE__*/_react2.default.createElement("div", {
      style: _objectSpread(_objectSpread({}, blockStyle), {}, {
        left: '40%'
      })
    }), /*#__PURE__*/_react2.default.createElement("div", {
      style: _objectSpread(_objectSpread({}, blockStyle), {}, {
        left: '60%'
      })
    }), /*#__PURE__*/_react2.default.createElement("div", {
      style: _objectSpread(_objectSpread({}, blockStyle), {}, {
        left: '80%'
      })
    }), /*#__PURE__*/_react2.default.createElement("div", {
      style: {
        position: 'relative',
        backgroundImage: '-webkit-linear-gradient(left, #ff5500, #ff9300)',
        transition: 'all 0.35s ease-in-out',
        height: 8,
        width: '100%',
        marginTop: 5,
        clipPath: "polygon(0 0,".concat(score, "% 0,").concat(score, "% 100%,0 100%)")
      }
    }));
  }));
}, (0, _react.mapReadPretty)(function (props) {
  if (!props.value) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  return /*#__PURE__*/_react2.default.createElement("div", null, "********");
}));
exports.Password = Password;
var _default = Password;
exports.default = _default;