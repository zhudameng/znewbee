"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockSchemaComponentProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _SchemaComponentOptions = require("../schema-component/core/SchemaComponentOptions");

var _BlockProvider = require("./BlockProvider");

var _CalendarBlockProvider = require("./CalendarBlockProvider");

var _DetailsBlockProvider = require("./DetailsBlockProvider");

var _FormBlockProvider = require("./FormBlockProvider");

var bp = _interopRequireWildcard(require("./hooks"));

var _KanbanBlockProvider = require("./KanbanBlockProvider");

var _TableBlockProvider = require("./TableBlockProvider");

var _TableFieldProvider = require("./TableFieldProvider");

var _TableSelectorProvider = require("./TableSelectorProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BlockSchemaComponentProvider = function BlockSchemaComponentProvider(props) {
  return /*#__PURE__*/_react.default.createElement(_SchemaComponentOptions.SchemaComponentOptions, {
    components: {
      CalendarBlockProvider: _CalendarBlockProvider.CalendarBlockProvider,
      TableFieldProvider: _TableFieldProvider.TableFieldProvider,
      TableBlockProvider: _TableBlockProvider.TableBlockProvider,
      TableSelectorProvider: _TableSelectorProvider.TableSelectorProvider,
      FormBlockProvider: _FormBlockProvider.FormBlockProvider,
      DetailsBlockProvider: _DetailsBlockProvider.DetailsBlockProvider,
      KanbanBlockProvider: _KanbanBlockProvider.KanbanBlockProvider,
      RecordLink: _BlockProvider.RecordLink
    },
    scope: _objectSpread(_objectSpread({}, bp), {}, {
      useSourceIdFromRecord: _BlockProvider.useSourceIdFromRecord,
      useSourceIdFromParentRecord: _BlockProvider.useSourceIdFromParentRecord,
      useParamsFromRecord: _BlockProvider.useParamsFromRecord,
      useCalendarBlockProps: _CalendarBlockProvider.useCalendarBlockProps,
      useFormBlockProps: _FormBlockProvider.useFormBlockProps,
      useDetailsBlockProps: _DetailsBlockProvider.useDetailsBlockProps,
      useTableFieldProps: _TableFieldProvider.useTableFieldProps,
      useTableBlockProps: _TableBlockProvider.useTableBlockProps,
      useTableSelectorProps: _TableSelectorProvider.useTableSelectorProps,
      useKanbanBlockProps: _KanbanBlockProvider.useKanbanBlockProps
    })
  }, props.children);
};

exports.BlockSchemaComponentProvider = BlockSchemaComponentProvider;