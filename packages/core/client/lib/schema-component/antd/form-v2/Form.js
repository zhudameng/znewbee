"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _antd = require("@formily/antd");

var _core = require("@formily/core");

var _react = require("@formily/react");

var _utils = require("@znewbee/utils");

var _antd2 = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("..");

var _2 = require("../..");

var _useProps2 = require("../../hooks/useProps");

var _excluded = ["form", "children"],
    _excluded2 = ["form", "children"],
    _excluded3 = ["form"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FormComponent = function FormComponent(props) {
  var form = props.form,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)(); // TODO: component 里 useField 会与当前 field 存在偏差

  var f = (0, _2.useAttach)(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  return /*#__PURE__*/_react2.default.createElement(_react.FieldContext.Provider, {
    value: undefined
  }, /*#__PURE__*/_react2.default.createElement(_react.FormContext.Provider, {
    value: form
  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, _objectSpread({
    layout: 'vertical'
  }, others), /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: f.address,
    schema: fieldSchema,
    onlyRenderProperties: true
  }))));
};

var Def = function Def(props) {
  return props.children;
};

var FormDecorator = function FormDecorator(props) {
  var form = props.form,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded2);

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)(); // TODO: component 里 useField 会与当前 field 存在偏差

  var f = (0, _2.useAttach)(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  var Component = (0, _2.useComponent)(fieldSchema['x-component'], Def);
  return /*#__PURE__*/_react2.default.createElement(_react.FieldContext.Provider, {
    value: undefined
  }, /*#__PURE__*/_react2.default.createElement(_react.FormContext.Provider, {
    value: form
  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, _objectSpread({
    layout: 'vertical'
  }, others), /*#__PURE__*/_react2.default.createElement(_react.FieldContext.Provider, {
    value: f
  }, /*#__PURE__*/_react2.default.createElement(Component, _objectSpread({}, field.componentProps), /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: f.address,
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))));
};

var WithForm = function WithForm(props) {
  var form = props.form;
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useActionContext = (0, _.useActionContext)(),
      setFormValueChanged = _useActionContext.setFormValueChanged;

  (0, _react2.useEffect)(function () {
    var id = (0, _utils.uid)();
    form.addEffects(id, function () {
      (0, _core.onFormInputChange)(function (form) {
        setFormValueChanged === null || setFormValueChanged === void 0 ? void 0 : setFormValueChanged(true);
      });
    });
    return function () {
      form.removeEffects(id);
    };
  }, []);
  return fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/_react2.default.createElement(FormDecorator, _objectSpread({}, props)) : /*#__PURE__*/_react2.default.createElement(FormComponent, _objectSpread({}, props));
};

var WithoutForm = function WithoutForm(props) {
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useActionContext2 = (0, _.useActionContext)(),
      setFormValueChanged = _useActionContext2.setFormValueChanged;

  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)({
      effects: function effects() {
        (0, _core.onFormInputChange)(function (form) {
          setFormValueChanged(true);
        });
      }
    });
  }, []);
  return fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/_react2.default.createElement(FormDecorator, _objectSpread({
    form: form
  }, props)) : /*#__PURE__*/_react2.default.createElement(FormComponent, _objectSpread({
    form: form
  }, props));
};

var Form = (0, _react.observer)(function (props) {
  var field = (0, _react.useField)();

  var _useProps = (0, _useProps2.useProps)(props),
      form = _useProps.form,
      others = _objectWithoutProperties(_useProps, _excluded3);

  return /*#__PURE__*/_react2.default.createElement("form", null, /*#__PURE__*/_react2.default.createElement(_antd2.Spin, {
    spinning: field.loading || false
  }, form ? /*#__PURE__*/_react2.default.createElement(WithForm, _objectSpread({
    form: form
  }, others)) : /*#__PURE__*/_react2.default.createElement(WithoutForm, _objectSpread({}, others))));
});
exports.Form = Form;
