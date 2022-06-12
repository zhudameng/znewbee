"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterItem = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../..");

var _context = require("./context");

var _DynamicComponent = require("./DynamicComponent");

var _useValues2 = require("./useValues");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FilterItem = (0, _react.observer)(function (props) {
  var compile = (0, _.useCompile)();
  var remove = (0, _react2.useContext)(_context.RemoveConditionContext);

  var _useValues = (0, _useValues2.useValues)(),
      schema = _useValues.schema,
      fields = _useValues.fields,
      operators = _useValues.operators,
      dataIndex = _useValues.dataIndex,
      operator = _useValues.operator,
      setDataIndex = _useValues.setDataIndex,
      setOperator = _useValues.setOperator,
      value = _useValues.value,
      setValue = _useValues.setValue;

  return /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, null, /*#__PURE__*/_react2.default.createElement(_antd.Cascader, {
    fieldNames: {
      label: 'title',
      value: 'name',
      children: 'children'
    },
    style: {
      width: 150
    },
    changeOnSelect: false,
    value: dataIndex,
    options: compile(fields),
    onChange: function onChange(value) {
      setDataIndex(value);
    }
  }), /*#__PURE__*/_react2.default.createElement(_antd.Select, {
    value: operator === null || operator === void 0 ? void 0 : operator.value,
    options: compile(operators),
    onChange: function onChange(value) {
      setOperator(value);
    },
    style: {
      minWidth: 100
    }
  }), !(operator === null || operator === void 0 ? void 0 : operator.noValue) && /*#__PURE__*/_react2.default.createElement(_DynamicComponent.DynamicComponent, {
    value: value,
    schema: schema,
    onChange: function onChange(value) {
      setValue(value);
    }
  }), /*#__PURE__*/_react2.default.createElement("a", null, /*#__PURE__*/_react2.default.createElement(_icons.CloseCircleOutlined, {
    onClick: function onClick() {
      return remove();
    },
    style: {
      color: '#bfbfbf'
    }
  }))));
});
exports.FilterItem = FilterItem;