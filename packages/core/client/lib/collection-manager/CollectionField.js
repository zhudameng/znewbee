"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CollectionField = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("..");

var _CollectionFieldProvider = require("./CollectionFieldProvider");

var _hooks = require("./hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: 初步适配
var InternalField = function InternalField(props) {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useCollectionField = (0, _hooks.useCollectionField)(),
      name = _useCollectionField.name,
      interfaceType = _useCollectionField.interface,
      uiSchema = _useCollectionField.uiSchema;

  var component = (0, _.useComponent)(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['x-component']);
  var compile = (0, _.useCompile)();

  var setFieldProps = function setFieldProps(key, value) {
    field[key] = typeof field[key] === 'undefined' ? value : field[key];
  };

  var setRequired = function setRequired() {
    if (typeof fieldSchema['required'] === 'undefined') {
      field.required = !!uiSchema['required'];
    }
  };

  var ctx = (0, _.useFormBlockContext)();
  (0, _react2.useEffect)(function () {
    if (ctx === null || ctx === void 0 ? void 0 : ctx.field) {
      ctx.field.added = ctx.field.added || new Set();
      ctx.field.added.add(fieldSchema.name);
    }
  }); // TODO: 初步适配

  (0, _react2.useEffect)(function () {
    if (!uiSchema) {
      return;
    }

    setFieldProps('content', uiSchema['x-content']);
    setFieldProps('title', uiSchema.title);
    setFieldProps('description', uiSchema.description);
    setFieldProps('initialValue', uiSchema.default);

    if (!field.validator && uiSchema['x-validator']) {
      field.validator = uiSchema['x-validator'];
    }

    field.readPretty = uiSchema['x-read-pretty'];
    setRequired(); // @ts-ignore

    field.dataSource = uiSchema.enum;
    var originalProps = compile(uiSchema['x-component-props']) || {};
    var componentProps = (0, _shared.merge)(originalProps, field.componentProps || {});
    field.component = [component, componentProps]; // if (interfaceType === 'input') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'textarea') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'markdown') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'attachment') {
    //   field.componentProps.size = 'small';
    // }
  }, [JSON.stringify(uiSchema)]);

  if (!uiSchema) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(component, props, props.children);
};

var CollectionField = (0, _react.connect)(function (props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(_CollectionFieldProvider.CollectionFieldProvider, {
    name: fieldSchema.name
  }, /*#__PURE__*/_react2.default.createElement(InternalField, _objectSpread({}, props)));
});
exports.CollectionField = CollectionField;
var _default = CollectionField;
exports.default = _default;