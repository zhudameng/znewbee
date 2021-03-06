"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableRowSelection = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _react2 = _interopRequireDefault(require("react"));

var _Table = require("./Table.Void");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toArr = function toArr(value) {
  return (0, _shared.isArr)(value) ? value : (0, _shared.isValid)(value) ? [value] : [];
};

var TableRowSelection = (0, _react.observer)(function (props) {
  var _props$rowKey = props.rowKey,
      rowKey = _props$rowKey === void 0 ? 'id' : _props$rowKey,
      objectValue = props.objectValue;
  var field = (0, _react.useField)();

  var rowSelection = _objectSpread(_objectSpread({
    type: 'checkbox'
  }, props.rowSelection), {}, {
    selectedRowKeys: toArr(field.value).map(function (val) {
      return _typeof(val) === 'object' ? val[rowKey] : val;
    }),
    onChange: function onChange(selectedRowKeys, selectedRows) {
      if (rowSelection.type === 'checkbox') {
        props.onChange(objectValue ? selectedRows : selectedRowKeys);
      } else {
        props.onChange(_toConsumableArray(objectValue ? selectedRows : selectedRowKeys).shift());
      }
    }
  });

  return /*#__PURE__*/_react2.default.createElement(_Table.TableVoid, _objectSpread(_objectSpread({}, props), {}, {
    rowSelection: rowSelection
  }));
});
exports.TableRowSelection = TableRowSelection;