"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _antd = require("@formily/antd");

var _core = require("@formily/core");

var _react = require("@formily/react");

var _antd2 = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../..");

var _apiClient = require("../../../api-client");

var _collectionManager = require("../../../collection-manager");

var _schemaSettings = require("../../../schema-settings");

var _schemaTemplates = require("../../../schema-templates");

var _excluded = ["form", "children"],
    _excluded2 = ["form", "children"],
    _excluded3 = ["request", "effects", "initialValue", "useValues"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

  var f = (0, _.useAttach)(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
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

  var f = (0, _.useAttach)(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  var Component = (0, _.useComponent)(fieldSchema['x-component'], Def);
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

var useRequestProps = function useRequestProps(props) {
  var request = props.request,
      initialValue = props.initialValue;

  if (request) {
    return request;
  }

  return function () {
    return Promise.resolve({
      data: initialValue
    });
  };
};

var useDef = function useDef() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _apiClient.useRequest)(useRequestProps(props), opts);
};

var FormBlockContext = /*#__PURE__*/(0, _react2.createContext)(null);
var Form = (0, _react.observer)(function (props) {
  var request = props.request,
      effects = props.effects,
      initialValue = props.initialValue,
      _props$useValues = props.useValues,
      useValues = _props$useValues === void 0 ? useDef : _props$useValues,
      others = _objectWithoutProperties(props, _excluded3);

  var fieldSchema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)({
      effects: effects
    });
  }, []);
  var result = useValues({
    uid: fieldSchema['x-uid'],
    onSuccess: function onSuccess(data) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return form.reset();

              case 2:
                form.setValues(data === null || data === void 0 ? void 0 : data.data);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, props);
  var parent = (0, _react2.useContext)(FormBlockContext);
  return /*#__PURE__*/_react2.default.createElement(FormBlockContext.Provider, {
    value: {
      parent: parent,
      form: form,
      result: result,
      field: field,
      fieldSchema: fieldSchema
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd2.Spin, {
    spinning: (result === null || result === void 0 ? void 0 : result.loading) || false
  }, fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/_react2.default.createElement(FormDecorator, _objectSpread({
    form: form
  }, others)) : /*#__PURE__*/_react2.default.createElement(FormComponent, _objectSpread({
    form: form
  }, others))));
});
exports.Form = Form;

Form.Designer = function () {
  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      title = _useCollection.title;

  var template = (0, _schemaTemplates.useSchemaTemplate)();
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Template, {
    componentName: 'Form',
    collectionName: name
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};