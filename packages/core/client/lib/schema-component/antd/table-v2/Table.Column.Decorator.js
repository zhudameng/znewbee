"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColumnSchema = exports.TableColumnDecorator = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../../../");

var _TableColumn = require("./Table.Column.ActionBar");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useColumnSchema = function useColumnSchema() {
  var _useCollection = (0, _.useCollection)(),
      getField = _useCollection.getField;

  var compile = (0, _.useCompile)();
  var columnSchema = (0, _react.useFieldSchema)();
  var fieldSchema = columnSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'CollectionField') {
      return s;
    }

    return buf;
  }, null);

  if (!fieldSchema) {
    return {};
  }

  var collectionField = getField(fieldSchema.name);
  return {
    columnSchema: columnSchema,
    fieldSchema: fieldSchema,
    collectionField: collectionField,
    uiSchema: compile(collectionField === null || collectionField === void 0 ? void 0 : collectionField.uiSchema)
  };
};

exports.useColumnSchema = useColumnSchema;

var TableColumnDecorator = function TableColumnDecorator(props) {
  var Designer = (0, _.useDesigner)();
  var field = (0, _react.useField)();

  var _useColumnSchema = useColumnSchema(),
      fieldSchema = _useColumnSchema.fieldSchema,
      uiSchema = _useColumnSchema.uiSchema,
      collectionField = _useColumnSchema.collectionField;

  var _useDesignable = (0, _.useDesignable)(),
      refresh = _useDesignable.refresh;

  var compile = (0, _.useCompile)();
  (0, _react2.useLayoutEffect)(function () {
    if (field.title) {
      return;
    }

    if (!fieldSchema) {
      return;
    }

    if (uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title) {
      field.title = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title;
    }
  }, [uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title]);
  return /*#__PURE__*/_react2.default.createElement(_.SortableItem, {
    className: _TableColumn.designerCss
  }, /*#__PURE__*/_react2.default.createElement(Designer, {
    fieldSchema: fieldSchema,
    uiSchema: uiSchema,
    collectionField: collectionField
  }), field.title || compile(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title));
};

exports.TableColumnDecorator = TableColumnDecorator;