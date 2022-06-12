"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterActionContext = exports.FilterAction = void 0;

var _css = require("@emotion/css");

var _core = require("@formily/core");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _core2 = require("../../core");

var _hooks = require("../../hooks");

var _useProps2 = require("../../hooks/useProps");

var _action = require("../action");

var _templateObject, _templateObject2;

var _excluded = ["options", "onSubmit", "onReset"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FilterActionContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.FilterActionContext = FilterActionContext;
var FilterAction = (0, _react.observer)(function (props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var field = (0, _react.useField)();

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useDesignable = (0, _hooks.useDesignable)(),
      designable = _useDesignable.designable,
      dn = _useDesignable.dn;

  var fieldSchema = (0, _react.useFieldSchema)();
  var form = (0, _react2.useMemo)(function () {
    return props.form || (0, _core.createForm)();
  }, []);

  var _useProps = (0, _useProps2.useProps)(props),
      options = _useProps.options,
      onSubmit = _useProps.onSubmit,
      onReset = _useProps.onReset,
      others = _objectWithoutProperties(_useProps, _excluded);

  return /*#__PURE__*/_react2.default.createElement(FilterActionContext.Provider, {
    value: {
      field: field,
      fieldSchema: fieldSchema,
      designable: designable,
      dn: dn
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd.Popover, {
    destroyTooltipOnHide: true,
    placement: 'bottomLeft',
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    },
    trigger: 'click',
    content: /*#__PURE__*/_react2.default.createElement("form", null, /*#__PURE__*/_react2.default.createElement(_core2.FormProvider, {
      form: form
    }, /*#__PURE__*/_react2.default.createElement(_core2.SchemaComponent, {
      schema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            enum: options || field.dataSource,
            default: fieldSchema.default,
            'x-component': 'Filter',
            'x-component-props': {}
          }
        }
      }
    }), /*#__PURE__*/_react2.default.createElement("div", {
      className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                  display: flex;\n                  justify-content: flex-end;\n                  width: 100%;\n                "])))
    }, /*#__PURE__*/_react2.default.createElement(_antd.Space, null, /*#__PURE__*/_react2.default.createElement(SaveConditions, null), /*#__PURE__*/_react2.default.createElement(_antd.Button, {
      onClick: function () {
        var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return form.reset();

                case 2:
                  onReset === null || onReset === void 0 ? void 0 : onReset(form.values);
                  field.title = t('Filter');
                  setVisible(false);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onClick() {
          return _onClick.apply(this, arguments);
        }

        return onClick;
      }()
    }, t('Reset')), /*#__PURE__*/_react2.default.createElement(_antd.Button, {
      type: 'primary',
      htmlType: 'submit',
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(form.values);
        setVisible(false);
      }
    }, t('Submit'))))))
  }, /*#__PURE__*/_react2.default.createElement(_action.Action, _objectSpread(_objectSpread({}, others), {}, {
    title: field.title
  }))));
});
exports.FilterAction = FilterAction;

var SaveConditions = function SaveConditions() {
  var _useContext = (0, _react2.useContext)(FilterActionContext),
      fieldSchema = _useContext.fieldSchema,
      field = _useContext.field,
      designable = _useContext.designable,
      dn = _useContext.dn;

  var form = (0, _react.useForm)();

  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  if (!designable) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Button, {
    type: 'dashed',
    className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        border-color: rgb(241, 139, 98);\n        color: rgb(241, 139, 98);\n      "]))),
    onClick: function onClick() {
      var defaultValue = _objectSpread({}, form.values.filter);

      fieldSchema.default = defaultValue;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          default: defaultValue
        }
      });
      dn.refresh();
    }
  }, t('Save conditions'));
};