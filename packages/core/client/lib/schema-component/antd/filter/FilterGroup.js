"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterGroup = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _context = require("./context");

var _FilterItems = require("./FilterItems");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FilterGroup = (0, _react.connect)(function (props) {
  var _props$bordered = props.bordered,
      bordered = _props$bordered === void 0 ? true : _props$bordered;
  var field = (0, _react.useField)();
  var remove = (0, _react2.useContext)(_context.RemoveConditionContext);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var keys = Object.keys(field.value || {});
  var logic = keys.includes('$or') ? '$or' : '$and';

  var setLogic = function setLogic(value) {
    var obj = field.value || {};
    field.value = _defineProperty({}, value, _toConsumableArray(obj[logic] || []));
  };

  return /*#__PURE__*/_react2.default.createElement(_context.FilterLogicContext.Provider, {
    value: logic
  }, /*#__PURE__*/_react2.default.createElement("div", {
    style: bordered ? {
      position: 'relative',
      border: '1px dashed #dedede',
      padding: 14,
      marginBottom: 8
    } : {
      position: 'relative',
      marginBottom: 8
    }
  }, remove && /*#__PURE__*/_react2.default.createElement("a", null, /*#__PURE__*/_react2.default.createElement(_icons.CloseCircleOutlined, {
    style: {
      position: 'absolute',
      right: 10,
      top: 10,
      color: '#bfbfbf'
    },
    onClick: function onClick() {
      return remove();
    }
  })), /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/_react2.default.createElement(_reactI18next.Trans, null, 'Meet ', /*#__PURE__*/_react2.default.createElement(_antd.Select, {
    style: {
      width: 'auto'
    },
    value: logic,
    onChange: function onChange(value) {
      setLogic(value);
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd.Select.Option, {
    value: '$and'
  }, "All"), /*#__PURE__*/_react2.default.createElement(_antd.Select.Option, {
    value: '$or'
  }, "Any")), ' conditions in the group')), /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_react.ArrayField, {
    name: logic,
    component: [_FilterItems.FilterItems]
  })), /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 16,
    style: {
      marginTop: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/_react2.default.createElement("a", {
    onClick: function onClick() {
      var value = field.value || {};
      var items = value[logic] || [];
      items.push({});
      field.value = _defineProperty({}, logic, items);
    }
  }, t('Add condition')), /*#__PURE__*/_react2.default.createElement("a", {
    onClick: function onClick() {
      var value = field.value || {};
      var items = value[logic] || [];
      items.push({
        $and: [{}]
      });
      field.value = _defineProperty({}, logic, items);
    }
  }, t('Add condition group')))));
});
exports.FilterGroup = FilterGroup;