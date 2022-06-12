"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordProvider = exports.RecordIndexProvider = exports.RecordIndexContext = exports.RecordContext = void 0;
exports.useRecord = useRecord;
exports.useRecordIndex = useRecordIndex;
exports.useRecordIsOwn = void 0;

var _react = _interopRequireWildcard(require("react"));

var _user = require("../user");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RecordContext = /*#__PURE__*/(0, _react.createContext)({});
exports.RecordContext = RecordContext;
var RecordIndexContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.RecordIndexContext = RecordIndexContext;

var RecordProvider = function RecordProvider(props) {
  var record = props.record,
      children = props.children;

  var __parent = (0, _react.useContext)(RecordContext);

  return /*#__PURE__*/_react.default.createElement(RecordContext.Provider, {
    value: _objectSpread(_objectSpread({}, record), {}, {
      __parent: __parent
    })
  }, children);
};

exports.RecordProvider = RecordProvider;

var RecordIndexProvider = function RecordIndexProvider(props) {
  var index = props.index,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(RecordIndexContext.Provider, {
    value: index
  }, children);
};

exports.RecordIndexProvider = RecordIndexProvider;

function useRecord() {
  return (0, _react.useContext)(RecordContext);
}

function useRecordIndex() {
  return (0, _react.useContext)(RecordIndexContext);
}

var useRecordIsOwn = function useRecordIsOwn() {
  var _ctx$data, _ctx$data$data;

  var record = useRecord();
  var ctx = (0, _user.useCurrentUserContext)();

  if (!(record === null || record === void 0 ? void 0 : record.createdById)) {
    return false;
  }

  return (record === null || record === void 0 ? void 0 : record.createdById) === (ctx === null || ctx === void 0 ? void 0 : (_ctx$data = ctx.data) === null || _ctx$data === void 0 ? void 0 : (_ctx$data$data = _ctx$data.data) === null || _ctx$data$data === void 0 ? void 0 : _ctx$data$data.id);
};

exports.useRecordIsOwn = useRecordIsOwn;