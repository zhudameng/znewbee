"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatedBy = void 0;

var _lodash = require("lodash");

var _properties = require("./properties");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updatedBy = {
  name: 'updatedBy',
  type: 'object',
  group: 'systemInfo',
  order: 4,
  title: '{{t("Last updated by")}}',
  isAssociation: true,
  default: {
    type: 'belongsTo',
    target: 'users',
    foreignKey: 'updatedById',
    uiSchema: {
      type: 'object',
      title: '{{t("Last updated by")}}',
      'x-component': 'RecordPicker',
      'x-component-props': {
        fieldNames: {
          value: 'id',
          label: 'nickname'
        }
      },
      'x-read-pretty': true
    }
  },
  properties: _objectSpread({}, _properties.defaultProps),
  filterable: {
    children: [{
      name: 'id',
      title: '{{t("ID")}}',
      operators: _properties.operators.id,
      schema: {
        title: '{{t("ID")}}',
        type: 'number',
        'x-component': 'InputNumber'
      }
    }, {
      name: 'nickname',
      title: '{{t("Nickname")}}',
      operators: _properties.operators.string,
      schema: {
        title: '{{t("Nickname")}}',
        type: 'string',
        'x-component': 'Input'
      }
    }]
  },
  schemaInitialize: function schemaInitialize(schema, _ref) {
    var readPretty = _ref.readPretty;
    schema['properties'] = {
      viewer: (0, _lodash.cloneDeep)(_properties.recordPickerViewer)
    };
  }
};
exports.updatedBy = updatedBy;