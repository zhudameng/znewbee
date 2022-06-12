"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.actionDesignerCss = exports.Action = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../..");

var _icon = require("../../../icon");

var _common = require("../../common");

var _hooks = require("../../hooks");

var _useProps2 = require("../../hooks/useProps");

var _Action = _interopRequireDefault(require("./Action.Container"));

var _Action2 = require("./Action.Designer");

var _Action3 = require("./Action.Drawer");

var _Action4 = require("./Action.Link");

var _Action5 = require("./Action.Modal");

var _Action6 = require("./Action.Page");

var _context = require("./context");

var _hooks2 = require("./hooks");

var _excluded = ["popover", "confirm", "containerRefKey", "component", "useAction", "className", "disabled", "icon", "title"];

var _templateObject, _templateObject2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var actionDesignerCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    color: #44a85d;\n    > .general-schema-designer {\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06);\n    border: 0;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: #f18b62;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
exports.actionDesignerCss = actionDesignerCss;
var Action = (0, _react.observer)(function (props) {
  var _fieldSchema$xCompon;

  var popover = props.popover,
      confirm = props.confirm,
      containerRefKey = props.containerRefKey,
      component = props.component,
      _props$useAction = props.useAction,
      useAction = _props$useAction === void 0 ? _hooks2.useA : _props$useAction,
      className = props.className,
      disabled = props.disabled,
      icon = props.icon,
      title = props.title,
      others = _objectWithoutProperties(props, _excluded);

  var _useProps = (0, _useProps2.useProps)(props),
      _onClick = _useProps.onClick;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react2.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      formValueChanged = _useState4[0],
      setFormValueChanged = _useState4[1];

  var Designer = (0, _hooks.useDesigner)();
  var field = (0, _react.useField)();

  var _useAction = useAction(),
      run = _useAction.run;

  var fieldSchema = (0, _react.useFieldSchema)();
  var compile = (0, _hooks.useCompile)();
  var designerProps = fieldSchema['x-designer-props'];
  var openMode = fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon['openMode'];

  var renderButton = function renderButton() {
    var _field$data;

    return /*#__PURE__*/_react2.default.createElement(_common.SortableItem, _objectSpread(_objectSpread({}, others), {}, {
      loading: field === null || field === void 0 ? void 0 : (_field$data = field.data) === null || _field$data === void 0 ? void 0 : _field$data.loading,
      icon: /*#__PURE__*/_react2.default.createElement(_icon.Icon, {
        type: icon
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var onOk = function onOk() {
          _onClick === null || _onClick === void 0 ? void 0 : _onClick(e);
          setVisible(true);
          run();
        };

        if (confirm) {
          _antd.Modal.confirm(_objectSpread(_objectSpread({}, confirm), {}, {
            onOk: onOk
          }));
        } else {
          onOk();
        }
      },
      component: component || _antd.Button,
      className: (0, _classnames.default)(className, actionDesignerCss)
    }), title || compile(fieldSchema.title), /*#__PURE__*/_react2.default.createElement(Designer, _objectSpread({}, designerProps)));
  };

  return /*#__PURE__*/_react2.default.createElement(_context.ActionContext.Provider, {
    value: {
      button: renderButton(),
      visible: visible,
      setVisible: setVisible,
      formValueChanged: formValueChanged,
      setFormValueChanged: setFormValueChanged,
      openMode: openMode,
      containerRefKey: containerRefKey
    }
  }, popover && /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    onlyRenderProperties: true,
    schema: fieldSchema
  }), !popover && renderButton(), !popover && props.children);
});
exports.Action = Action;
Action.Popover = (0, _react.observer)(function (props) {
  var _useActionContext = (0, _.useActionContext)(),
      button = _useActionContext.button,
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  return /*#__PURE__*/_react2.default.createElement(_antd.Popover, _objectSpread(_objectSpread({}, props), {}, {
    destroyTooltipOnHide: true,
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    },
    content: props.children
  }), button);
});
Action.Popover.Footer = (0, _react.observer)(function (props) {
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        display: flex;\n        justify-content: flex-end;\n        width: 100%;\n      "])))
  }, props.children);
});
Action.Link = _Action4.ActionLink;
Action.Designer = _Action2.ActionDesigner;
Action.Drawer = _Action3.ActionDrawer;
Action.Modal = _Action5.ActionModal;
Action.Container = _Action.default;
Action.Page = _Action6.ActionPage;
var _default = Action;
exports.default = _default;