"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _2 = require("../../../");

var _useProps2 = require("../../hooks/useProps");

var _Menu = require("./Menu.Designer");

var _util = require("./util");

var _excluded = ["onSelect", "mode", "selectedUid", "defaultSelectedUid", "sideMenuRefScopeKey", "defaultSelectedKeys", "defaultOpenKeys"],
    _excluded2 = ["icon"],
    _excluded3 = ["icon"],
    _excluded4 = ["icon"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var subMenuDesignerCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n  margin-left: -24px;\n  margin-right: -34px;\n  padding: 0 34px 0 24px;\n  width: calc(100% + 58px);\n  &:hover {\n    color:green;\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    > .general-schema-designer {\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06);\n    border: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: #f18b62;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
var designerCss = (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-left: -20px;\n  margin-right: -20px;\n  padding: 0 20px;\n  width: calc(100% + 40px);\n  &:hover {\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    > .general-schema-designer {\n      background: #44A85D1A;\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: 44A85D1A;\n    border: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: #f18b62;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
var MenuModeContext = /*#__PURE__*/(0, _react2.createContext)(null);

var useSideMenuRef = function useSideMenuRef() {
  var _schema$xComponentP;

  var schema = (0, _react.useFieldSchema)();
  var scope = (0, _react2.useContext)(_react.SchemaExpressionScopeContext);
  var scopeKey = schema === null || schema === void 0 ? void 0 : (_schema$xComponentP = schema['x-component-props']) === null || _schema$xComponentP === void 0 ? void 0 : _schema$xComponentP['sideMenuRefScopeKey'];

  if (!scopeKey) {
    return;
  }

  return scope[scopeKey];
};

var MenuItemDesignerContext = /*#__PURE__*/(0, _react2.createContext)(null);
var Menu = (0, _react.observer)(function (props) {
  var _sideMenuRef$current;

  var _useProps = (0, _useProps2.useProps)(props),
      _onSelect = _useProps.onSelect,
      mode = _useProps.mode,
      selectedUid = _useProps.selectedUid,
      defaultSelectedUid = _useProps.defaultSelectedUid,
      sideMenuRefScopeKey = _useProps.sideMenuRefScopeKey,
      dSelectedKeys = _useProps.defaultSelectedKeys,
      dOpenKeys = _useProps.defaultOpenKeys,
      others = _objectWithoutProperties(_useProps, _excluded);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var Designer = (0, _.useDesigner)();
  var schema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _.useDesignable)(),
      refresh = _useDesignable.refresh;

  var api = (0, _2.useAPIClient)();

  var _useSchemaInitializer = (0, _2.useSchemaInitializer)(schema['x-initializer']),
      render = _useSchemaInitializer.render;

  var sideMenuRef = useSideMenuRef();

  var _useState = (0, _react2.useState)(function () {
    if (dSelectedKeys) {
      return dSelectedKeys;
    }

    if (defaultSelectedUid) {
      return (0, _util.findKeysByUid)(schema, defaultSelectedUid);
    }

    return [];
  }),
      _useState2 = _slicedToArray(_useState, 2),
      defaultSelectedKeys = _useState2[0],
      setDefaultSelectedKeys = _useState2[1];

  var _useState3 = (0, _react2.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react2.useState)(function () {
    if (['inline', 'mix'].includes(mode)) {
      return dOpenKeys || defaultSelectedKeys;
    }

    return dOpenKeys;
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      defaultOpenKeys = _useState6[0],
      setDefaultOpenKeys = _useState6[1];

  var _useState7 = (0, _react2.useState)(function () {
    var key = (defaultSelectedKeys === null || defaultSelectedKeys === void 0 ? void 0 : defaultSelectedKeys[0]) || null;

    if (mode === 'mix' && key) {
      var _schema$properties;

      var s = (_schema$properties = schema.properties) === null || _schema$properties === void 0 ? void 0 : _schema$properties[key];

      if (s['x-component'] === 'Menu.SubMenu') {
        return s;
      }
    }

    return null;
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      sideMenuSchema = _useState8[0],
      setSideMenuSchema = _useState8[1];

  (0, _react2.useEffect)(function () {
    var keys = (0, _util.findKeysByUid)(schema, selectedUid);
    setDefaultSelectedKeys(keys);

    if (['inline', 'mix'].includes(mode)) {
      setDefaultOpenKeys(dOpenKeys || keys);
    }

    var key = (keys === null || keys === void 0 ? void 0 : keys[0]) || null;

    if (mode === 'mix') {
      if (key) {
        var _schema$properties2;

        var s = (_schema$properties2 = schema.properties) === null || _schema$properties2 === void 0 ? void 0 : _schema$properties2[key];

        if (s['x-component'] === 'Menu.SubMenu') {
          setSideMenuSchema(s);
        }
      } else {
        setSideMenuSchema(null);
      }
    }
  }, [selectedUid]);
  (0, _react2.useEffect)(function () {
    if (['inline', 'mix'].includes(mode)) {
      setDefaultOpenKeys(defaultSelectedKeys);
    }
  }, [defaultSelectedKeys]);
  (0, _react2.useEffect)(function () {
    var sideMenuElement = sideMenuRef === null || sideMenuRef === void 0 ? void 0 : sideMenuRef.current;

    if (!sideMenuElement) {
      return;
    }

    sideMenuElement.style.display = (sideMenuSchema === null || sideMenuSchema === void 0 ? void 0 : sideMenuSchema['x-component']) === 'Menu.SubMenu' ? 'block' : 'none';
  }, [sideMenuSchema === null || sideMenuSchema === void 0 ? void 0 : sideMenuSchema.name, sideMenuRef]);

  var _useDesignable2 = (0, _.useDesignable)(),
      designable = _useDesignable2.designable;

  return /*#__PURE__*/_react2.default.createElement(_.DndContext, null, /*#__PURE__*/_react2.default.createElement(MenuItemDesignerContext.Provider, {
    value: Designer
  }, /*#__PURE__*/_react2.default.createElement(MenuModeContext.Provider, {
    value: mode
  }, /*#__PURE__*/_react2.default.createElement(_antd.Menu, _objectSpread(_objectSpread({}, others), {}, {
    style: {
      backgroundColor: '#44a85d' //zhudameng
      // width: mode === 'mix' ? '100%' : undefined,

    },
    className: (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n              .ant-menu-item:hover {\n                color:white;\n                > .ant-menu-title-content > div {\n\n                  .general-schema-designer {\n                    display: block;\n                  }\n                }\n              }\n            "]))),
    onSelect: function onSelect(info) {
      var s = schema.properties[info.key];

      if (mode === 'mix') {
        setSideMenuSchema(s);

        if (s['x-component'] !== 'Menu.SubMenu') {
          _onSelect && _onSelect(info);
        } else {
          var menuItemSchema = (0, _util.findMenuItem)(s);

          if (!menuItemSchema) {
            return;
          } // TODO


          setLoading(true);
          var keys = (0, _util.findKeysByUid)(schema, menuItemSchema['x-uid']);
          setDefaultSelectedKeys(keys);
          setTimeout(function () {
            setLoading(false);
          }, 100);
          _onSelect && _onSelect({
            key: menuItemSchema.name,
            item: {
              props: {
                schema: menuItemSchema
              }
            }
          });
        }
      } else {
        _onSelect && _onSelect(info);
      }
    },
    mode: mode === 'mix' ? 'horizontal' : mode,
    defaultOpenKeys: defaultOpenKeys,
    defaultSelectedKeys: defaultSelectedKeys,
    selectedKeys: defaultSelectedKeys
  }), designable && /*#__PURE__*/_react2.default.createElement(_antd.Menu.Item, {
    disabled: true,
    style: {
      padding: '0 8px',
      order: 9999,
      background: 'green'
    }
  }, render({
    style: {
      background: 'green'
    }
  })), props.children), loading ? null : mode === 'mix' && (sideMenuSchema === null || sideMenuSchema === void 0 ? void 0 : sideMenuSchema['x-component']) === 'Menu.SubMenu' && (sideMenuRef === null || sideMenuRef === void 0 ? void 0 : (_sideMenuRef$current = sideMenuRef.current) === null || _sideMenuRef$current === void 0 ? void 0 : _sideMenuRef$current.firstChild) && /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react2.default.createElement(MenuModeContext.Provider, {
    value: 'inline'
  }, /*#__PURE__*/_react2.default.createElement(_antd.Menu, {
    mode: 'inline',
    defaultOpenKeys: defaultOpenKeys,
    defaultSelectedKeys: defaultSelectedKeys,
    onSelect: function onSelect(info) {
      _onSelect && _onSelect(info);
    },
    style: {
      background: '#112a17'
    },
    //zhudameng
    className: (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n                      .ant-menu-item {\n                        background:#000220;\n                        color:gray;\n                        margin:-8px 0;\n                        > .ant-menu-title-content {\n\n                          margin-left: -24px;\n                          margin-right: -16px;\n                          padding: 0 20px 0 20px;\n                          > div {\n                            > .general-schema-designer {\n\n                              right: 6px !important;\n                            }\n                          }\n                        }\n                      }\n                      .ant-menu-submenu-title {\n                         color:white;\n                        .ant-menu-title-content {\n                          margin-left: -24px;\n                          margin-right: -34px;\n                          padding: 0 34px 0 24px;\n                          > div {\n\n                            > .general-schema-designer {\n\n                              right: 6px !important;\n                            }\n                            > span.anticon {\n\n                              margin-right: 10px;\n                            }\n                          }\n                        }\n                      }\n                    "])))
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    schema: sideMenuSchema,
    onlyRenderProperties: true
  }), render({
    style: {
      margin: 8
    },
    insert: function insert(s) {
      var dn = (0, _.createDesignable)({
        t: t,
        api: api,
        refresh: refresh,
        current: sideMenuSchema
      });
      dn.loadAPIClientEvents();
      dn.insertAdjacent('beforeEnd', s);
    }
  }))), sideMenuRef.current.firstChild))));
});
exports.Menu = Menu;
Menu.Item = (0, _react.observer)(function (props) {
  var icon = props.icon,
      others = _objectWithoutProperties(props, _excluded2);

  var schema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var Designer = (0, _react2.useContext)(MenuItemDesignerContext);
  return /*#__PURE__*/_react2.default.createElement(_antd.Menu.Item, _objectSpread(_objectSpread({}, others), {}, {
    key: schema.name,
    eventKey: schema.name,
    schema: schema
  }), /*#__PURE__*/_react2.default.createElement(_.SortableItem, {
    className: designerCss
  }, /*#__PURE__*/_react2.default.createElement(_2.Icon, {
    type: icon
  }), /*#__PURE__*/_react2.default.createElement("span", {
    className: (0, _css.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n            overflow: hidden;\n            text-overflow: ellipsis;\n            display: inline-block;\n            width: 100%;\n            vertical-align: middle;\n          "])))
  }, field.title), /*#__PURE__*/_react2.default.createElement(Designer, null)));
});
Menu.URL = (0, _react.observer)(function (props) {
  var icon = props.icon,
      others = _objectWithoutProperties(props, _excluded3);

  var schema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var Designer = (0, _react2.useContext)(MenuItemDesignerContext);
  return /*#__PURE__*/_react2.default.createElement(_antd.Menu.Item, _objectSpread(_objectSpread({}, others), {}, {
    key: schema.name,
    eventKey: schema.name,
    schema: schema,
    onClick: function onClick() {
      window.open(props.href, '_blank');
    }
  }), /*#__PURE__*/_react2.default.createElement(_.SortableItem, {
    className: designerCss
  }, /*#__PURE__*/_react2.default.createElement(_2.Icon, {
    type: icon
  }), /*#__PURE__*/_react2.default.createElement("span", {
    className: (0, _css.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n            overflow: hidden;\n            text-overflow: ellipsis;\n            display: inline-block;\n            width: 100%;\n            vertical-align: middle;\n          "])))
  }, field.title), /*#__PURE__*/_react2.default.createElement(Designer, null)));
});
Menu.SubMenu = (0, _react.observer)(function (props) {
  var icon = props.icon,
      others = _objectWithoutProperties(props, _excluded4);

  var schema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var mode = (0, _react2.useContext)(MenuModeContext);
  var Designer = (0, _react2.useContext)(MenuItemDesignerContext);

  if (mode === 'mix') {
    return /*#__PURE__*/_react2.default.createElement(Menu.Item, _objectSpread({}, props));
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Menu.SubMenu, _objectSpread(_objectSpread({}, others), {}, {
    key: schema.name,
    eventKey: schema.name,
    title: /*#__PURE__*/_react2.default.createElement(_.SortableItem, {
      className: subMenuDesignerCss
    }, /*#__PURE__*/_react2.default.createElement(_2.Icon, {
      type: icon
    }), field.title, /*#__PURE__*/_react2.default.createElement(Designer, null))
  }), /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    schema: schema,
    onlyRenderProperties: true
  }));
});
Menu.Designer = _Menu.MenuDesigner;