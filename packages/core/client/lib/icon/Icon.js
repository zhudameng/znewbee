"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Icon = void 0;
exports.hasIcon = hasIcon;
exports.icons = void 0;
exports.registerIcon = registerIcon;
exports.registerIcons = registerIcons;

var antIcons = _interopRequireWildcard(require("@ant-design/icons"));

var _react = _interopRequireDefault(require("react"));

var _excluded = ["type", "component"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var IconFont;
var icons = new Map();
exports.icons = icons;

function registerIcon(type) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : IconFont;
  icons.set(type.toLowerCase(), icon);
}

function hasIcon(type) {
  if (!type) {
    return false;
  }

  return icons.has(type.toLowerCase());
}

function registerIcons(components) {
  Object.keys(components).forEach(function (type) {
    registerIcon(type, components[type]);
  });
}

Object.keys(antIcons).forEach(function (name) {
  if (name.endsWith('Outlined')) {
    registerIcon(name, antIcons[name]);
  }
});

var Icon = function Icon(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? '' : _props$type,
      component = props.component,
      restProps = _objectWithoutProperties(props, _excluded);

  if (component) {
    return /*#__PURE__*/_react.default.createElement(antIcons.default, _objectSpread({
      component: component
    }, restProps));
  }

  if (type && icons.has(type.toLowerCase())) {
    var IconComponent = icons.get(type.toLowerCase());
    return /*#__PURE__*/_react.default.createElement(IconComponent, _objectSpread({}, restProps));
  }

  if (type && IconFont) {
    return /*#__PURE__*/_react.default.createElement(IconFont, {
      type: type
    });
  }

  return null;
};

exports.Icon = Icon;

Icon.createFromIconfontCN = function (options) {
  IconFont = (0, antIcons.createFromIconfontCN)(options);
};

Icon.register = function (icons) {
  registerIcons(icons);
};

var _default = Icon;
exports.default = _default;