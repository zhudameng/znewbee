"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _react2 = _interopRequireDefault(require("react"));

var _defaultFieldNames = require("./defaultFieldNames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ReadPretty = function ReadPretty(props) {
  var _props$fieldNames = props.fieldNames,
      fieldNames = _props$fieldNames === void 0 ? _defaultFieldNames.defaultFieldNames : _props$fieldNames;
  var values = (0, _shared.toArr)(props.value);
  var len = values.length;
  var field = (0, _react.useField)();
  var dataSource = field.dataSource;
  var data = [];

  var _iterator = _createForOfIteratorHelper(values),
      _step;

  try {
    var _loop = function _loop() {
      var item = _step.value;

      if (_typeof(item) === 'object') {
        data.push(item);
      } else {
        var _dataSource;

        var curr = (_dataSource = dataSource) === null || _dataSource === void 0 ? void 0 : _dataSource.find(function (v) {
          return v[fieldNames.value] === item;
        });
        dataSource = (curr === null || curr === void 0 ? void 0 : curr[fieldNames.children]) || [];
        data.push(curr || {
          label: item,
          value: item
        });
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return /*#__PURE__*/_react2.default.createElement("div", null, data.map(function (item, index) {
    return /*#__PURE__*/_react2.default.createElement("span", {
      key: index
    }, _typeof(item) === 'object' ? item[fieldNames.label] : item, len > index + 1 && ' / ');
  }));
};

exports.ReadPretty = ReadPretty;