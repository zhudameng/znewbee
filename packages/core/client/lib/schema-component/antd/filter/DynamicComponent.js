"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicComponent = void 0;

var _core = require("@formily/core");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _react2 = _interopRequireWildcard(require("react"));

var _core2 = require("../../core");

var _hooks = require("../../hooks");

var _context = require("./context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DynamicComponent = function DynamicComponent(props) {
  var _useContext = (0, _react2.useContext)(_context.FilterContext),
      dynamicComponent = _useContext.dynamicComponent;

  var component = (0, _hooks.useComponent)(dynamicComponent);
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)({
      values: {
        value: props.value
      },
      effects: function effects() {
        (0, _core.onFieldValueChange)('value', function (field) {
          var _props$onChange;

          props === null || props === void 0 ? void 0 : (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, field.value);
        });
      }
    });
  }, [JSON.stringify(props.schema), JSON.stringify(props.value)]);

  var renderSchemaComponent = function renderSchemaComponent() {
    var _props$schema;

    return /*#__PURE__*/_react2.default.createElement(_react.FieldContext.Provider, {
      value: null
    }, /*#__PURE__*/_react2.default.createElement(_core2.SchemaComponent, {
      schema: _objectSpread(_objectSpread({
        'x-component': 'Input'
      }, props.schema), {}, {
        'x-component-props': (0, _shared.merge)((props === null || props === void 0 ? void 0 : (_props$schema = props.schema) === null || _props$schema === void 0 ? void 0 : _props$schema['x-component-props']) || {}, {
          style: {
            minWidth: 150
          }
        }),
        name: 'value',
        'x-read-pretty': false,
        'x-validator': undefined,
        'x-decorator': undefined
      })
    }));
  };

  return /*#__PURE__*/_react2.default.createElement(_react.FormContext.Provider, {
    value: form
  }, component ? /*#__PURE__*/_react2.default.createElement(component, {
    value: props.value,
    onChange: props === null || props === void 0 ? void 0 : props.onChange,
    renderSchemaComponent: renderSchemaComponent
  }) : renderSchemaComponent());
};

exports.DynamicComponent = DynamicComponent;