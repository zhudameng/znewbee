"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KanbanCard = void 0;

var _css = require("@emotion/css");

var _antd = require("@formily/antd");

var _react = require("@formily/react");

var _antd2 = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("..");

var _2 = require("../..");

var _recordProvider = require("../../../record-provider");

var _SchemaComponentOptions = require("../../core/SchemaComponentOptions");

var _context = require("./context");

var _templateObject;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormItem = (0, _react.observer)(function (props) {
  return /*#__PURE__*/_react2.default.createElement(_.BlockItem, _objectSpread({}, props));
});
var KanbanCard = (0, _react.observer)(function (props) {
  var _useContext = (0, _react2.useContext)(_context.KanbanCardContext),
      setDisableCardDrag = _useContext.setDisableCardDrag,
      cardViewerSchema = _useContext.cardViewerSchema,
      card = _useContext.card,
      cardField = _useContext.cardField,
      columnIndex = _useContext.columnIndex,
      cardIndex = _useContext.cardIndex;

  var fieldSchema = (0, _react.useFieldSchema)();

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, /*#__PURE__*/_react2.default.createElement(_antd2.Card, {
    onClick: function onClick(e) {
      setVisible(true);
    },
    bordered: false,
    hoverable: true,
    style: {
      cursor: 'pointer',
      overflow: 'hidden'
    },
    // bodyStyle={{ paddingBottom: 0 }}
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-card-body {\n            padding: 16px;\n          }\n          .nb-row-divider {\n            height: 16px;\n            margin-top: -16px;\n            &:last-child {\n              margin-top: 0;\n            }\n          }\n          .ant-description-input {\n            text-overflow: ellipsis;\n            width: 100%;\n            overflow: hidden;\n          }\n          .ant-description-textarea {\n            text-overflow: ellipsis;\n            width: 100%;\n            overflow: hidden;\n          }\n          .ant-formily-item {\n            margin-bottom: 12px;\n          }\n          .nb-grid-row:last-of-type {\n            .nb-grid-col {\n              .nb-form-item:last-of-type {\n                .ant-formily-item {\n                  margin-bottom: 0;\n                }\n              }\n            }\n          }\n        "])))
  }, /*#__PURE__*/_react2.default.createElement(_SchemaComponentOptions.SchemaComponentOptions, {
    components: {}
  }, /*#__PURE__*/_react2.default.createElement(_2.DndContext, {
    onDragStart: function onDragStart() {
      setDisableCardDrag(true);
    },
    onDragEnd: function onDragEnd() {
      setDisableCardDrag(false);
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
    layout: 'vertical'
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: cardField.address.concat("".concat(columnIndex, ".cards.").concat(cardIndex)),
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))), cardViewerSchema && /*#__PURE__*/_react2.default.createElement(_.ActionContext.Provider, {
    value: {
      openMode: 'drawer',
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react2.default.createElement(_recordProvider.RecordProvider, {
    record: card
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: cardField.address.concat("".concat(columnIndex, ".cardViewer.").concat(cardIndex)),
    schema: cardViewerSchema,
    onlyRenderProperties: true
  }))));
});
exports.KanbanCard = KanbanCard;