"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _apiClient = require("../../../api-client");

var _useProps2 = require("../../hooks/useProps");

var _context = require("./context");

var _FilterAction = require("./Filter.Action.Designer");

var _FilterAction2 = require("./FilterAction");

var _FilterGroup = require("./FilterGroup");

var _SaveDefaultValue = require("./SaveDefaultValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useDef = function useDef(options) {
  var field = (0, _react.useField)();
  return (0, _apiClient.useRequest)(function () {
    return Promise.resolve({
      data: field.dataSource
    });
  }, options);
};

var Filter = (0, _react.observer)(function (props) {
  var _props$useDataSource = props.useDataSource,
      useDataSource = _props$useDataSource === void 0 ? useDef : _props$useDataSource;

  var _useProps = (0, _useProps2.useProps)(props),
      options = _useProps.options,
      dynamicComponent = _useProps.dynamicComponent,
      className = _useProps.className;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  useDataSource({
    onSuccess: function onSuccess(data) {
      field.dataSource = (data === null || data === void 0 ? void 0 : data.data) || [];
    }
  });
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react2.default.createElement(_context.FilterContext.Provider, {
    value: {
      field: field,
      fieldSchema: fieldSchema,
      dynamicComponent: dynamicComponent,
      options: options || field.dataSource || []
    }
  }, /*#__PURE__*/_react2.default.createElement(_FilterGroup.FilterGroup, _objectSpread(_objectSpread({}, props), {}, {
    bordered: false
  }))));
});
exports.Filter = Filter;
Filter.SaveDefaultValue = _SaveDefaultValue.SaveDefaultValue;
Filter.Action = _FilterAction2.FilterAction;
Filter.Action.Designer = _FilterAction.FilterActionDesigner;