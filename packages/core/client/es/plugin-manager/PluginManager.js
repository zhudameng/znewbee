var _excluded = ["selected", "icon", "title"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu, Spin, Tooltip } from 'antd';
import cls from 'classnames';
import { get } from 'lodash';
import React, { createContext, useContext } from 'react';
import { useAPIClient, useRequest } from '../api-client';
import { PluginManagerContext } from './context';
export var usePrefixCls = function usePrefixCls(tag, props) {
  var _useContext = useContext(ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  return getPrefixCls(tag, props === null || props === void 0 ? void 0 : props.prefixCls);
};
export var PluginManager = function PluginManager() {
  return null;
};
var ToolbarItemContext = /*#__PURE__*/createContext(null);

var splitItems = function splitItems(items) {
  var pinned = [];
  var unpinned = [];

  var _iterator = _createForOfIteratorHelper(items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (item.pin) {
        pinned.push(item);
      } else {
        unpinned.push(item);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [pinned, unpinned];
};

PluginManager.Toolbar = function (props) {
  var _useContext2 = useContext(PluginManagerContext),
      components = _useContext2.components;

  var _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items;

  var _splitItems = splitItems(items),
      _splitItems2 = _slicedToArray(_splitItems, 2),
      pinned = _splitItems2[0],
      unpinned = _splitItems2[1];

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement(Menu, {
    style: {
      width: '100%'
    },
    selectable: false,
    mode: 'horizontal',
    theme: 'dark'
  }, pinned.map(function (item, index) {
    var Action = get(components, item.component);
    return Action && /*#__PURE__*/React.createElement(ToolbarItemContext.Provider, {
      key: index,
      value: item
    }, /*#__PURE__*/React.createElement(Action, null));
  }), unpinned.length > 0 && /*#__PURE__*/React.createElement(Menu.SubMenu, {
    popupClassName: 'pm-sub-menu',
    key: 'more',
    title: /*#__PURE__*/React.createElement(MoreOutlined, null)
  }, unpinned.map(function (item, index) {
    var Action = get(components, item.component);
    return Action && /*#__PURE__*/React.createElement(ToolbarItemContext.Provider, {
      key: index,
      value: item
    }, /*#__PURE__*/React.createElement(Action, null));
  }), unpinned.length > 0 && /*#__PURE__*/React.createElement(Menu.Divider, {
    key: 'divider'
  }), /*#__PURE__*/React.createElement(Menu.Item, {
    key: 'plugins',
    disabled: true,
    icon: /*#__PURE__*/React.createElement(SettingOutlined, null)
  }, "\u7BA1\u7406\u63D2\u4EF6"))));
};

PluginManager.Toolbar.Item = function (props) {
  var item = useContext(ToolbarItemContext);

  var selected = props.selected,
      icon = props.icon,
      title = props.title,
      others = _objectWithoutProperties(props, _excluded);

  var prefix = usePrefixCls();
  var className = cls(_defineProperty({}, "".concat(prefix, "-menu-item-selected"), selected));

  if (item.pin) {
    return /*#__PURE__*/React.createElement(Tooltip, {
      title: title
    }, /*#__PURE__*/React.createElement(Menu.Item, _objectSpread(_objectSpread({}, others), {}, {
      className: className,
      eventKey: item.component
    }), icon));
  }

  return /*#__PURE__*/React.createElement(Menu.Item, _objectSpread(_objectSpread({}, others), {}, {
    className: className,
    eventKey: item.component,
    icon: icon
  }), title);
};

export var RemotePluginManagerToolbar = function RemotePluginManagerToolbar() {
  var api = useAPIClient();

  var _useRequest = useRequest({
    resource: 'plugins',
    action: 'getPinned'
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(PluginManager.Toolbar, {
    items: data === null || data === void 0 ? void 0 : data.data
  });
};