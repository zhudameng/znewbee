"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputRecordPicker = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _TableSelectorProvider = require("../../../block-provider/TableSelectorProvider");

var _collectionManager = require("../../../collection-manager");

var _core = require("../../core");

var _hooks = require("../../hooks");

var _action = require("../action");

var _useFieldNames = require("./useFieldNames");

var _excluded = ["onRowSelectionChange", "rowKey"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RecordPickerContext = /*#__PURE__*/(0, _react2.createContext)(null);

var useTableSelectorProps = function useTableSelectorProps() {
  var _useContext = (0, _react2.useContext)(RecordPickerContext),
      multiple = _useContext.multiple,
      value = _useContext.value,
      setSelectedRows = _useContext.setSelectedRows,
      selectedRows = _useContext.selectedRows;

  var _useTsp = (0, _TableSelectorProvider.useTableSelectorProps)(),
      _onRowSelectionChange = _useTsp.onRowSelectionChange,
      rowKey = _useTsp.rowKey,
      others = _objectWithoutProperties(_useTsp, _excluded);

  return _objectSpread(_objectSpread({}, others), {}, {
    rowKey: rowKey,
    rowSelection: {
      type: multiple ? 'checkbox' : 'radio',
      defaultSelectedRowKeys: selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.map(function (item) {
        return item[rowKey || 'id'];
      }),
      selectedRowKeys: selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.map(function (item) {
        return item[rowKey || 'id'];
      })
    },
    onRowSelectionChange: function onRowSelectionChange(selectedRowKeys, selectedRows) {
      _onRowSelectionChange === null || _onRowSelectionChange === void 0 ? void 0 : _onRowSelectionChange(selectedRowKeys, selectedRows);
      setSelectedRows === null || setSelectedRows === void 0 ? void 0 : setSelectedRows(selectedRows);
    }
  });
};

var usePickActionProps = function usePickActionProps() {
  var _useActionContext = (0, _action.useActionContext)(),
      setVisible = _useActionContext.setVisible;

  var _useContext2 = (0, _react2.useContext)(RecordPickerContext),
      multiple = _useContext2.multiple,
      selectedRows = _useContext2.selectedRows,
      onChange = _useContext2.onChange;

  return {
    onClick: function onClick() {
      if (multiple) {
        onChange(selectedRows);
      } else {
        onChange((selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows[0]) || null);
      }

      setVisible(false);
    }
  };
};

var useAssociation = function useAssociation(props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  var association = props.association;

  var _useCollection = (0, _collectionManager.useCollection)(),
      getField = _useCollection.getField;

  if (association) {
    return association;
  }

  return getField(fieldSchema.name);
};

var InputRecordPicker = function InputRecordPicker(props) {
  var value = props.value,
      multiple = props.multiple,
      _onChange = props.onChange;
  var fieldNames = (0, _useFieldNames.useFieldNames)(props);

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var fieldSchema = (0, _react.useFieldSchema)();
  var collectionField = useAssociation(props);
  var compile = (0, _hooks.useCompile)();
  var options = (Array.isArray(value) ? value : value ? [value] : []).map(function (option) {
    var label = option[fieldNames.label];
    return _objectSpread(_objectSpread({}, option), {}, _defineProperty({}, fieldNames.label, compile(label)));
  });

  var _useState3 = (0, _react2.useState)(options),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedRows = _useState4[0],
      setSelectedRows = _useState4[1];

  var values = options === null || options === void 0 ? void 0 : options.map(function (option) {
    return option[fieldNames.value];
  });
  return /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_antd.Select, {
    size: props.size,
    mode: multiple ? 'multiple' : props.mode,
    fieldNames: fieldNames,
    onDropdownVisibleChange: function onDropdownVisibleChange(open) {
      setVisible(true);
    },
    allowClear: true,
    onChange: function onChange(changed) {
      if (!changed) {
        _onChange(null);

        setSelectedRows([]);
      } else if (!(changed === null || changed === void 0 ? void 0 : changed.length)) {
        _onChange(null);

        setSelectedRows([]);
      } else if (Array.isArray(changed)) {
        var _values = options === null || options === void 0 ? void 0 : options.filter(function (option) {
          return changed.includes(option[fieldNames.value]);
        });

        _onChange(_values);

        setSelectedRows(_values);
      }
    },
    options: options,
    value: multiple ? values : values === null || values === void 0 ? void 0 : values[0],
    open: false
  }), /*#__PURE__*/_react2.default.createElement(RecordPickerContext.Provider, {
    value: {
      multiple: multiple,
      onChange: _onChange,
      selectedRows: selectedRows,
      setSelectedRows: setSelectedRows
    }
  }, /*#__PURE__*/_react2.default.createElement(_collectionManager.CollectionProvider, {
    allowNull: true,
    name: collectionField === null || collectionField === void 0 ? void 0 : collectionField.target
  }, /*#__PURE__*/_react2.default.createElement(_action.ActionContext.Provider, {
    value: {
      openMode: 'drawer',
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react2.default.createElement(_core.FormProvider, null, /*#__PURE__*/_react2.default.createElement(_core.SchemaComponentOptions, {
    scope: {
      useTableSelectorProps: useTableSelectorProps,
      usePickActionProps: usePickActionProps
    }
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    schema: fieldSchema,
    onlyRenderProperties: true
  })))))));
};

exports.InputRecordPicker = InputRecordPicker;