"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaComponent = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireWildcard(require("react"));

var _SchemaComponentOptions = require("./SchemaComponentOptions");

var _excluded = ["components", "scope", "schema"],
    _excluded2 = ["schema"],
    _excluded3 = ["memoized"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toSchema(schema) {
  if (_react.Schema.isSchemaInstance(schema)) {
    return schema;
  }

  if (schema.name) {
    return new _react.Schema({
      type: 'object',
      properties: _defineProperty({}, schema.name, schema)
    });
  }

  return new _react.Schema(schema);
}

var useMemoizedSchema = function useMemoizedSchema(schema) {
  return (0, _react2.useMemo)(function () {
    return toSchema(schema);
  }, []);
};

var RecursionSchemaComponent = function RecursionSchemaComponent(props) {
  var components = props.components,
      scope = props.scope,
      schema = props.schema,
      others = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react2.default.createElement(_SchemaComponentOptions.SchemaComponentOptions, {
    inherit: true,
    components: components,
    scope: scope
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, _objectSpread(_objectSpread({}, others), {}, {
    schema: toSchema(schema)
  })));
};

var MemoizedSchemaComponent = function MemoizedSchemaComponent(props) {
  var schema = props.schema,
      others = _objectWithoutProperties(props, _excluded2);

  var s = useMemoizedSchema(schema);
  return /*#__PURE__*/_react2.default.createElement(RecursionSchemaComponent, _objectSpread(_objectSpread({}, others), {}, {
    schema: s
  }));
};

var SchemaComponent = function SchemaComponent(props) {
  var memoized = props.memoized,
      others = _objectWithoutProperties(props, _excluded3);

  if (memoized) {
    return /*#__PURE__*/_react2.default.createElement(MemoizedSchemaComponent, _objectSpread({}, others));
  }

  return /*#__PURE__*/_react2.default.createElement(RecursionSchemaComponent, _objectSpread({}, others));
};

exports.SchemaComponent = SchemaComponent;