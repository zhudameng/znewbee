"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPrettyRecordPicker = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _blockProvider = require("../../../block-provider");

var _collectionManager = require("../../../collection-manager");

var _recordProvider = require("../../../record-provider");

var _core = require("../../core");

var _hooks = require("../../hooks");

var _action = require("../action");

var _useFieldNames = require("./useFieldNames");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReadPrettyRecordPicker = (0, _react.observer)(function (props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var fieldNames = (0, _useFieldNames.useFieldNames)(props);

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useCollection = (0, _collectionManager.useCollection)(),
      getField = _useCollection.getField;

  var collectionField = getField(fieldSchema.name);

  var _useState3 = (0, _react2.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      record = _useState4[0],
      setRecord = _useState4[1];

  var compile = (0, _hooks.useCompile)();
  return collectionField ? /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_blockProvider.BlockAssociationContext.Provider, {
    value: "".concat(collectionField.collectionName, ".").concat(collectionField.name)
  }, /*#__PURE__*/_react2.default.createElement(_collectionManager.CollectionProvider, {
    name: collectionField.target
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 0,
    split: /*#__PURE__*/_react2.default.createElement("span", {
      style: {
        marginRight: 4,
        color: '#aaa'
      }
    }, ", ")
  }, (0, _shared.toArr)(field.value).map(function (record, index) {
    return /*#__PURE__*/_react2.default.createElement("span", null, /*#__PURE__*/_react2.default.createElement("a", {
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setVisible(true);
        setRecord(record);
      }
    }, compile(record === null || record === void 0 ? void 0 : record[(fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.label) || 'label'])));
  })), /*#__PURE__*/_react2.default.createElement(_action.ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible,
      openMode: 'drawer'
    }
  }, /*#__PURE__*/_react2.default.createElement(_recordProvider.RecordProvider, {
    record: record
  }, /*#__PURE__*/_react2.default.createElement(_core.FormProvider, null, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))))) : null;
});
exports.ReadPrettyRecordPicker = ReadPrettyRecordPicker;