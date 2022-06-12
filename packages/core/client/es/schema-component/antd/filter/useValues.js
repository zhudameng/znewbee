function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField } from '@formily/react';
import { merge } from '@formily/shared';
import flat from 'flat';
import get from 'lodash/get';
import { useContext, useEffect } from 'react';
import { FilterContext, FilterLogicContext } from './context'; // import { useValues } from './useValues';

var findOption = function findOption() {
  var _dataIndex$forEach;

  var dataIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var items = options;
  var option;
  dataIndex === null || dataIndex === void 0 ? void 0 : (_dataIndex$forEach = dataIndex.forEach) === null || _dataIndex$forEach === void 0 ? void 0 : _dataIndex$forEach.call(dataIndex, function (name, index) {
    var item = items.find(function (item) {
      return item.name === name;
    });

    if (item) {
      option = item;
    }

    items = (item === null || item === void 0 ? void 0 : item.children) || [];
  });
  return option;
};

export var useValues = function useValues() {
  var field = useField();
  var logic = useContext(FilterLogicContext);

  var _useContext = useContext(FilterContext),
      options = _useContext.options;

  var data2value = function data2value() {
    var _field$data$dataIndex, _field$data, _field$data$operator, _field$data2;

    field.value = flat.unflatten(_defineProperty({}, "".concat((_field$data$dataIndex = field.data.dataIndex) === null || _field$data$dataIndex === void 0 ? void 0 : _field$data$dataIndex.join('.'), ".").concat((_field$data = field.data) === null || _field$data === void 0 ? void 0 : (_field$data$operator = _field$data.operator) === null || _field$data$operator === void 0 ? void 0 : _field$data$operator.value), (_field$data2 = field.data) === null || _field$data2 === void 0 ? void 0 : _field$data2.value));
  };

  var value2data = function value2data() {
    var _operators$find;

    var values = flat(field.value);
    var path = Object.keys(values).shift() || '';

    if (!path) {
      return;
    }

    var _path$split = path.split('.$'),
        _path$split2 = _slicedToArray(_path$split, 2),
        fieldPath = _path$split2[0],
        otherPath = _path$split2[1];

    var _otherPath$split = otherPath.split('.', 2),
        _otherPath$split2 = _slicedToArray(_otherPath$split, 1),
        operatorValue = _otherPath$split2[0];

    var dataIndex = fieldPath.split('.');
    var option = findOption(dataIndex, options);
    var operators = option === null || option === void 0 ? void 0 : option.operators;
    var operator = operators === null || operators === void 0 ? void 0 : (_operators$find = operators.find) === null || _operators$find === void 0 ? void 0 : _operators$find.call(operators, function (item) {
      return item.value === "$".concat(operatorValue);
    });
    field.data = field.data || {};
    field.data.dataIndex = dataIndex;
    field.data.operators = operators;
    field.data.operator = operator;
    field.data.schema = merge(option === null || option === void 0 ? void 0 : option.schema, operator === null || operator === void 0 ? void 0 : operator.schema);
    field.data.value = get(field.value, "".concat(fieldPath, ".$").concat(operatorValue));
    console.log('option', operator, field.data.value);
  };

  useEffect(function () {
    value2data();
  }, [logic]);
  return _objectSpread(_objectSpread({
    fields: options
  }, field.data), {}, {
    setDataIndex: function setDataIndex(dataIndex) {
      var _option$operators;

      var option = findOption(dataIndex, options);
      var operator = option === null || option === void 0 ? void 0 : (_option$operators = option.operators) === null || _option$operators === void 0 ? void 0 : _option$operators[0];
      field.data = field.data || {};
      field.data.operators = option === null || option === void 0 ? void 0 : option.operators;
      field.data.operator = operator;
      field.data.schema = merge(option === null || option === void 0 ? void 0 : option.schema, operator === null || operator === void 0 ? void 0 : operator.schema);
      field.data.dataIndex = dataIndex;
      field.data.value = null;
      data2value();
      console.log('setDataIndex', field.data);
    },
    setOperator: function setOperator(operatorValue) {
      var _field$data3, _field$data3$operator, _field$data3$operator2;

      var operator = (_field$data3 = field.data) === null || _field$data3 === void 0 ? void 0 : (_field$data3$operator = _field$data3.operators) === null || _field$data3$operator === void 0 ? void 0 : (_field$data3$operator2 = _field$data3$operator.find) === null || _field$data3$operator2 === void 0 ? void 0 : _field$data3$operator2.call(_field$data3$operator, function (item) {
        return item.value === operatorValue;
      });
      field.data.operator = operator;
      field.data.schema = merge(field.data.schema, operator.schema);
      field.data.value = operator.noValue ? operator.default || true : null;
      data2value();
      console.log('setOperator', field.data);
    },
    setValue: function setValue(value) {
      field.data.value = value;
      data2value();
      console.log('setValue', field.data);
    }
  });
};