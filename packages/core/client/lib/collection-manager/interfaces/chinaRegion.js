"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chinaRegion = void 0;

var _shared = require("@formily/shared");

var _properties = require("./properties");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chinaRegion = {
  name: 'chinaRegion',
  type: 'object',
  group: 'choices',
  order: 7,
  title: '{{t("China region")}}',
  isAssociation: true,
  default: {
    interface: 'chinaRegion',
    type: 'belongsToMany',
    target: 'chinaRegions',
    targetKey: 'code',
    sortBy: 'level',
    // name,
    uiSchema: {
      type: 'array',
      // title,
      'x-component': 'Cascader',
      'x-component-props': {
        useDataSource: '{{ useChinaRegionDataSource }}',
        useLoadData: '{{ useChinaRegionLoadData }}',
        changeOnSelectLast: false,
        labelInValue: true,
        maxLevel: 3,
        fieldNames: {
          label: 'name',
          value: 'code',
          children: 'children'
        }
      }
    }
  },
  initialize: function initialize(values) {
    if (!values.through) {
      values.through = "t_".concat((0, _shared.uid)());
    }

    if (!values.foreignKey) {
      values.foreignKey = "f_".concat((0, _shared.uid)());
    }

    if (!values.otherKey) {
      values.otherKey = "f_".concat((0, _shared.uid)());
    }

    if (!values.sourceKey) {
      values.sourceKey = 'id';
    }

    if (!values.targetKey) {
      values.targetKey = 'id';
    }
  },
  properties: _objectSpread(_objectSpread({}, _properties.defaultProps), {}, {
    'uiSchema.x-component-props.maxLevel': {
      type: 'number',
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      title: '{{t("Select level")}}',
      default: 3,
      enum: [{
        value: 1,
        label: '{{t("Province")}}'
      }, {
        value: 2,
        label: '{{t("City")}}'
      }, {
        value: 3,
        label: '{{t("Area")}}'
      }, {
        value: 4,
        label: '{{t("Street")}}',
        disabled: true
      }, {
        value: 5,
        label: '{{t("Village")}}',
        disabled: true
      }]
    },
    'uiSchema.x-component-props.changeOnSelectLast': {
      type: 'boolean',
      'x-component': 'Checkbox',
      'x-content': '{{t("Must select to the last level")}}',
      'x-decorator': 'FormItem'
    }
  }),
  filterable: {
    children: [{
      name: 'name',
      title: '{{t("Filename")}}',
      operators: _properties.operators.string,
      schema: {
        title: '{{t("Filename")}}',
        type: 'string',
        'x-component': 'Input'
      }
    }]
  }
};
exports.chinaRegion = chinaRegion;