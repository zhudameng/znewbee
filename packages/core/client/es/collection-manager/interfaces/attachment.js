function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { uid } from '@formily/shared';
import { defaultProps, operators } from './properties';
export var attachment = {
  name: 'attachment',
  type: 'object',
  group: 'media',
  title: '{{t("Attachment")}}',
  isAssociation: true,
  default: {
    type: 'belongsToMany',
    target: 'attachments',
    // name,
    uiSchema: {
      type: 'array',
      // title,
      'x-component': 'Upload.Attachment',
      'x-component-props': {
        action: 'attachments:upload'
      }
    }
  },
  schemaInitialize: function schemaInitialize(schema, _ref) {
    var block = _ref.block;

    if (['Table', 'KanbanV2'].includes(block)) {
      schema['x-component-props'] = schema['x-component-props'] || {};
      schema['x-component-props']['size'] = 'small';
    }
  },
  initialize: function initialize(values) {
    if (!values.through) {
      values.through = "t_".concat(uid());
    }

    if (!values.foreignKey) {
      values.foreignKey = "f_".concat(uid());
    }

    if (!values.otherKey) {
      values.otherKey = "f_".concat(uid());
    }

    if (!values.sourceKey) {
      values.sourceKey = 'id';
    }

    if (!values.targetKey) {
      values.targetKey = 'id';
    }
  },
  properties: _objectSpread(_objectSpread({}, defaultProps), {}, {
    'uiSchema.x-component-props.accept': {
      type: 'string',
      title: '{{t("Accept")}}',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      description: 'Example: .doc,.docx'
    },
    'uiSchema.x-component-props.multiple': {
      type: 'boolean',
      'x-content': "{{t('Allow uploading multiple files')}}",
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      default: true
    }
  }),
  filterable: {
    children: [{
      name: 'id',
      title: '{{t("Exists")}}',
      operators: [{
        label: '{{t("exists")}}',
        value: '$exists',
        noValue: true
      }, {
        label: '{{t("not exists")}}',
        value: '$notExists',
        noValue: true
      }],
      schema: {
        title: '{{t("Exists")}}',
        type: 'string',
        'x-component': 'Input'
      }
    }, {
      name: 'filename',
      title: '{{t("Filename")}}',
      operators: operators.string,
      schema: {
        title: '{{t("Filename")}}',
        type: 'string',
        'x-component': 'Input'
      }
    }]
  }
};