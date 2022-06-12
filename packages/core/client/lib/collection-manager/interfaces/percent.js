"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percent = void 0;

var _properties = require("./properties");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var percent = {
  name: 'percent',
  type: 'object',
  group: 'basic',
  order: 6,
  title: '{{t("Percent")}}',
  sortable: true,
  default: {
    type: 'float',
    // name,
    uiSchema: {
      type: 'string',
      // title,
      'x-component': 'InputNumber',
      'x-component-props': {
        stringMode: true,
        step: '0',
        addonAfter: '%'
      }
    }
  },
  properties: _objectSpread(_objectSpread({}, _properties.defaultProps), {}, {
    'uiSchema.x-component-props.step': {
      type: 'string',
      title: '{{t("Precision")}}',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      default: '0',
      enum: [{
        value: '0',
        label: '1'
      }, {
        value: '0.1',
        label: '1.0'
      }, {
        value: '0.01',
        label: '1.00'
      }, {
        value: '0.001',
        label: '1.000'
      }, {
        value: '0.0001',
        label: '1.0000'
      }, {
        value: '0.00001',
        label: '1.00000'
      }]
    }
  }),
  filterable: {
    operators: _properties.operators.number
  }
};
exports.percent = percent;