function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { defaultProps, operators } from './properties';
export var time = {
  name: 'time',
  type: 'object',
  group: 'datetime',
  order: 2,
  title: '{{t("Time")}}',
  sortable: true,
  default: {
    type: 'time',
    // name,
    uiSchema: {
      type: 'string',
      'x-component': 'TimePicker'
    }
  },
  properties: _objectSpread(_objectSpread({}, defaultProps), {}, {
    'uiSchema.x-component-props.format': {
      type: 'string',
      title: '{{t("Time format")}}',
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      default: 'HH:mm:ss',
      enum: [{
        label: '{{t("12 hour")}}',
        value: 'hh:mm:ss a'
      }, {
        label: '{{t("24 hour")}}',
        value: 'HH:mm:ss'
      }]
    }
  }),
  filterable: {
    operators: operators.time
  }
};