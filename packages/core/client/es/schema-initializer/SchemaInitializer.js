var _templateObject;

var _excluded = ["title", "insert", "wrap", "items", "insertPosition", "dropdown", "component", "style", "icon", "onSuccess"],
    _excluded2 = ["items", "children", "icon", "onClick"];

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { css } from '@emotion/css';
import { observer } from '@formily/react';
import { Button, Dropdown, Menu, Switch } from 'antd';
import classNames from 'classnames';
import React, { createContext, useContext, useState } from 'react';
import { Icon } from '../icon';
import { useCompile, useDesignable } from '../schema-component/hooks';

var defaultWrap = function defaultWrap(s) {
  return s;
};

export var SchemaInitializerItemContext = /*#__PURE__*/createContext(null);
export var SchemaInitializer = function SchemaInitializer() {
  return null;
};
SchemaInitializer.Button = observer(function (props) {
  var title = props.title,
      insert = props.insert,
      _props$wrap = props.wrap,
      wrap = _props$wrap === void 0 ? defaultWrap : _props$wrap,
      _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items,
      _props$insertPosition = props.insertPosition,
      insertPosition = _props$insertPosition === void 0 ? 'beforeEnd' : _props$insertPosition,
      dropdown = props.dropdown,
      component = props.component,
      style = props.style,
      icon = props.icon,
      onSuccess = props.onSuccess,
      others = _objectWithoutProperties(props, _excluded);

  var compile = useCompile();

  var _useDesignable = useDesignable(),
      insertAdjacent = _useDesignable.insertAdjacent,
      findComponent = _useDesignable.findComponent,
      designable = _useDesignable.designable;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var insertSchema = function insertSchema(schema) {
    if (props.insert) {
      props.insert(wrap(schema));
    } else {
      insertAdjacent(insertPosition, wrap(schema), {
        onSuccess: onSuccess
      });
    }
  };

  var renderItems = function renderItems(items) {
    return items === null || items === void 0 ? void 0 : items.map(function (item, indexA) {
      if (item.type === 'divider') {
        return /*#__PURE__*/React.createElement(Menu.Divider, {
          key: item.key || "item-".concat(indexA)
        });
      }

      if (item.type === 'item' && item.component) {
        var Component = findComponent(item.component);
        return Component && /*#__PURE__*/React.createElement(SchemaInitializerItemContext.Provider, {
          key: "item-".concat(indexA),
          value: {
            index: indexA,
            item: item,
            info: item,
            insert: insertSchema
          }
        }, /*#__PURE__*/React.createElement(Component, _objectSpread(_objectSpread({}, item), {}, {
          item: _objectSpread(_objectSpread({}, item), {}, {
            title: compile(item.title)
          }),
          insert: insertSchema
        })));
      }

      if (item.type === 'itemGroup') {
        var _item$children;

        return !!((_item$children = item.children) === null || _item$children === void 0 ? void 0 : _item$children.length) && /*#__PURE__*/React.createElement(Menu.ItemGroup, {
          key: item.key || "item-group-".concat(indexA),
          title: compile(item.title)
        }, renderItems(item.children));
      }

      if (item.type === 'subMenu') {
        var _item$children2;

        return !!((_item$children2 = item.children) === null || _item$children2 === void 0 ? void 0 : _item$children2.length) && /*#__PURE__*/React.createElement(Menu.SubMenu, {
          key: item.key || "item-group-".concat(indexA),
          title: compile(item.title)
        }, renderItems(item.children));
      }
    });
  };

  var menu = /*#__PURE__*/React.createElement(Menu, null, renderItems(items));

  if (!designable && props.designable !== true) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Dropdown, _objectSpread(_objectSpread({
    className: classNames('nb-schema-initializer-button'),
    openClassName: "nb-schema-initializer-button-open",
    overlayClassName: classNames('nb-schema-initializer-button-overlay', css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-dropdown-menu-item-group-list {\n            max-height: 40vh;\n            overflow: auto;\n          }\n        "])))),
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    }
  }, dropdown), {}, {
    overlay: menu
  }), component ? component : /*#__PURE__*/React.createElement(Button, _objectSpread(_objectSpread({
    type: 'dashed',
    style: _objectSpread({
      borderColor: '#f18b62',
      color: '#f18b62'
    }, style)
  }, others), {}, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      type: icon
    })
  }), compile(props.children || props.title)));
});

SchemaInitializer.Item = function (props) {
  var _useContext = useContext(SchemaInitializerItemContext),
      index = _useContext.index,
      info = _useContext.info;

  var compile = useCompile();

  var _props$items2 = props.items,
      items = _props$items2 === void 0 ? [] : _props$items2,
      _props$children = props.children,
      children = _props$children === void 0 ? info === null || info === void 0 ? void 0 : info.title : _props$children,
      icon = props.icon,
      _onClick = props.onClick,
      others = _objectWithoutProperties(props, _excluded2);

  if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
    var renderMenuItem = function renderMenuItem(items) {
      if (!(items === null || items === void 0 ? void 0 : items.length)) {
        return null;
      }

      return items.map(function (item, indexA) {
        if (item.type === 'divider') {
          return /*#__PURE__*/React.createElement(Menu.Divider, {
            key: "divider-".concat(indexA)
          });
        }

        if (item.type === 'itemGroup') {
          return /*#__PURE__*/React.createElement(Menu.ItemGroup // @ts-ignore
          , {
            // @ts-ignore
            eventKey: item.key || "item-group-".concat(indexA),
            key: item.key || "item-group-".concat(indexA),
            title: compile(item.title)
          }, renderMenuItem(item.children));
        }

        if (item.type === 'subMenu') {
          return /*#__PURE__*/React.createElement(Menu.SubMenu // @ts-ignore
          , {
            // @ts-ignore
            eventKey: item.key || "sub-menu-".concat(indexA),
            key: item.key || "sub-menu-".concat(indexA),
            title: compile(item.title)
          }, renderMenuItem(item.children));
        }

        return /*#__PURE__*/React.createElement(Menu.Item, {
          eventKey: item.key,
          key: item.key,
          onClick: function onClick(info) {
            _onClick(_objectSpread(_objectSpread({}, info), {}, {
              item: item
            }));
          }
        }, compile(item.title));
      });
    };

    return (
      /*#__PURE__*/
      // @ts-ignore
      React.createElement(Menu.SubMenu, {
        eventKey: index,
        key: index,
        title: compile(children),
        icon: icon
      }, renderMenuItem(items))
    );
  }

  return /*#__PURE__*/React.createElement(Menu.Item, _objectSpread({
    eventKey: index,
    icon: icon,
    onClick: function onClick(opts) {
      _onClick(_objectSpread(_objectSpread({}, opts), {}, {
        item: info
      }));
    }
  }, others), compile(children));
};

SchemaInitializer.itemWrap = function (component) {
  return component;
};

SchemaInitializer.SwitchItem = function (props) {
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, {
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, props.title, " ", /*#__PURE__*/React.createElement(Switch, {
    style: {
      marginLeft: 20
    },
    size: 'small',
    checked: props.checked
  })));
};