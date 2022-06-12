var _excluded = ["type", "component"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as antIcons from '@ant-design/icons';
import AntdIcon, { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
var IconFont;
export var icons = new Map();
export function registerIcon(type) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : IconFont;
  icons.set(type.toLowerCase(), icon);
}
export function hasIcon(type) {
  if (!type) {
    return false;
  }

  return icons.has(type.toLowerCase());
}
export function registerIcons(components) {
  Object.keys(components).forEach(function (type) {
    registerIcon(type, components[type]);
  });
}
Object.keys(antIcons).forEach(function (name) {
  if (name.endsWith('Outlined')) {
    registerIcon(name, antIcons[name]);
  }
});
export var Icon = function Icon(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? '' : _props$type,
      component = props.component,
      restProps = _objectWithoutProperties(props, _excluded);

  if (component) {
    return /*#__PURE__*/React.createElement(AntdIcon, _objectSpread({
      component: component
    }, restProps));
  }

  if (type && icons.has(type.toLowerCase())) {
    var IconComponent = icons.get(type.toLowerCase());
    return /*#__PURE__*/React.createElement(IconComponent, _objectSpread({}, restProps));
  }

  if (type && IconFont) {
    return /*#__PURE__*/React.createElement(IconFont, {
      type: type
    });
  }

  return null;
};

Icon.createFromIconfontCN = function (options) {
  IconFont = createFromIconfontCN(options);
};

Icon.register = function (icons) {
  registerIcons(icons);
};

export default Icon;