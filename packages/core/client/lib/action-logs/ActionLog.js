"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionLog = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("..");

var _schemaComponent = require("../schema-component");

var _ActionLog = require("./ActionLog.Designer");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionLog = function ActionLog() {
  var schema = (0, _utils.createSchema)();
  return /*#__PURE__*/_react2.default.createElement(_schemaComponent.SchemaComponent, {
    schema: schema,
    name: schema.name
  });
};

exports.ActionLog = ActionLog;
ActionLog.Designer = _ActionLog.ActionLogDesigner;
ActionLog.Field = (0, _react.observer)(function (props) {
  var _value$uiSchema;

  var value = props.value;
  return /*#__PURE__*/_react2.default.createElement("div", null, (value === null || value === void 0 ? void 0 : (_value$uiSchema = value.uiSchema) === null || _value$uiSchema === void 0 ? void 0 : _value$uiSchema.title) || (value === null || value === void 0 ? void 0 : value.name));
});
ActionLog.FieldValue = (0, _react.observer)(function (props) {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useCollection = (0, _.useCollection)(),
      getField = _useCollection.getField;

  var collectionField = getField(fieldSchema.name);

  if (!collectionField.uiSchema) {
    if (!field.value) {
      return /*#__PURE__*/_react2.default.createElement("div", null);
    }

    if (typeof field.value === 'boolean') {
      return /*#__PURE__*/_react2.default.createElement("div", null, field.value ? 'true' : 'false');
    }

    if (typeof field.value === 'string' || typeof field.value === 'number') {
      return /*#__PURE__*/_react2.default.createElement("div", null, field.value);
    }

    return /*#__PURE__*/_react2.default.createElement("pre", null, JSON.stringify(field.value, null, 2));
  }

  return /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    name: "actionLogFieldValue",
    schema: {
      type: 'void',
      properties: _defineProperty({}, collectionField.name, _objectSpread(_objectSpread({}, collectionField.uiSchema), {}, {
        default: field.value,
        'x-decorator': null,
        'x-read-pretty': true
      }))
    }
  });
});