"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteSchemaComponent = void 0;

var _core = require("@formily/core");

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _apiClient = require("../../api-client");

var _hooks = require("../hooks");

var _FormProvider = require("./FormProvider");

var _SchemaComponent = require("./SchemaComponent");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultTransform = function defaultTransform(s) {
  return s;
};

var RequestSchemaComponent = function RequestSchemaComponent(props) {
  var noForm = props.noForm,
      onlyRenderProperties = props.onlyRenderProperties,
      hidden = props.hidden,
      scope = props.scope,
      uid = props.uid,
      components = props.components,
      _onSuccess = props.onSuccess,
      _props$schemaTransfor = props.schemaTransform,
      schemaTransform = _props$schemaTransfor === void 0 ? defaultTransform : _props$schemaTransfor;

  var _useSchemaComponentCo = (0, _hooks.useSchemaComponentContext)(),
      reset = _useSchemaComponentCo.reset;

  var conf = {
    url: "/uiSchemas:".concat(onlyRenderProperties ? 'getProperties' : 'getJsonSchema', "/").concat(uid)
  };
  var form = (0, _react.useMemo)(function () {
    return (0, _core.createForm)();
  }, [uid]);

  var _useRequest = (0, _apiClient.useRequest)(conf, {
    refreshDeps: [uid],
    onSuccess: function onSuccess(data) {
      _onSuccess && _onSuccess(data);
      reset && reset();
    }
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  if (hidden) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return noForm ? /*#__PURE__*/_react.default.createElement(_SchemaComponent.SchemaComponent, {
    memoized: true,
    components: components,
    scope: scope,
    schema: schemaTransform((data === null || data === void 0 ? void 0 : data.data) || {})
  }) : /*#__PURE__*/_react.default.createElement(_FormProvider.FormProvider, {
    form: form
  }, /*#__PURE__*/_react.default.createElement(_SchemaComponent.SchemaComponent, {
    memoized: true,
    components: components,
    scope: scope,
    schema: schemaTransform((data === null || data === void 0 ? void 0 : data.data) || {})
  }));
};

var RemoteSchemaComponent = function RemoteSchemaComponent(props) {
  return props.uid ? /*#__PURE__*/_react.default.createElement(RequestSchemaComponent, _objectSpread({}, props)) : null;
};

exports.RemoteSchemaComponent = RemoteSchemaComponent;