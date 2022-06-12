"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormBlockProps = exports.useFormBlockContext = exports.FormBlockProvider = exports.FormBlockContext = void 0;

var _core = require("@formily/core");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _BlockProvider = require("./BlockProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormBlockContext = /*#__PURE__*/(0, _react2.createContext)({});
exports.FormBlockContext = FormBlockContext;

var InternalFormBlockProvider = function InternalFormBlockProvider(props) {
  var action = props.action,
      readPretty = props.readPretty;
  var field = (0, _react.useField)();
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)({
      readPretty: readPretty
    });
  }, []);

  var _useBlockRequestConte = (0, _BlockProvider.useBlockRequestContext)(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service;

  if (service.loading) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react2.default.createElement(FormBlockContext.Provider, {
    value: {
      action: action,
      form: form,
      field: field,
      service: service,
      resource: resource
    }
  }, props.children);
};

var FormBlockProvider = function FormBlockProvider(props) {
  return /*#__PURE__*/_react2.default.createElement(_BlockProvider.BlockProvider, _objectSpread({}, props), /*#__PURE__*/_react2.default.createElement(InternalFormBlockProvider, _objectSpread({}, props)));
};

exports.FormBlockProvider = FormBlockProvider;

var useFormBlockContext = function useFormBlockContext() {
  return (0, _react2.useContext)(FormBlockContext);
};

exports.useFormBlockContext = useFormBlockContext;

var useFormBlockProps = function useFormBlockProps() {
  var ctx = useFormBlockContext();
  (0, _react2.useEffect)(function () {
    var _ctx$service, _ctx$service$data;

    ctx.form.setInitialValues((_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : (_ctx$service$data = _ctx$service.data) === null || _ctx$service$data === void 0 ? void 0 : _ctx$service$data.data);
  }, []);
  return {
    form: ctx.form
  };
};

exports.useFormBlockProps = useFormBlockProps;