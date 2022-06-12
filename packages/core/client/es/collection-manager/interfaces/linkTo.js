function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { uid } from '@formily/shared';
import { cloneDeep } from 'lodash';
import { defaultProps, recordPickerSelector, recordPickerViewer } from './properties';
export var linkTo = {
  name: 'linkTo',
  type: 'object',
  group: 'relation',
  order: 1,
  title: '{{t("Link to")}}',
  isAssociation: true,
  default: {
    type: 'belongsToMany',
    // name,
    uiSchema: {
      // title,
      'x-component': 'RecordPicker',
      'x-component-props': {
        // mode: 'tags',
        multiple: true,
        fieldNames: {
          label: 'id',
          value: 'id'
        }
      }
    },
    reverseField: {
      interface: 'linkTo',
      type: 'belongsToMany',
      // name,
      uiSchema: {
        // title,
        'x-component': 'RecordPicker',
        'x-component-props': {
          // mode: 'tags',
          multiple: true,
          fieldNames: {
            label: 'id',
            value: 'id'
          }
        }
      }
    }
  },
  schemaInitialize: function schemaInitialize(schema, _ref) {
    var readPretty = _ref.readPretty;

    if (readPretty) {
      schema['properties'] = {
        viewer: cloneDeep(recordPickerViewer)
      };
    } else {
      schema['properties'] = {
        selector: cloneDeep(recordPickerSelector)
      };
    }
  },
  initialize: function initialize(values) {
    if (values.type === 'belongsToMany') {
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
    }
  },
  properties: _objectSpread(_objectSpread({}, defaultProps), {}, {
    target: {
      type: 'string',
      title: '{{t("Related collection")}}',
      required: true,
      'x-reactions': ['{{useAsyncDataSource(loadCollections)}}'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-disabled': '{{ !createOnly }}'
    },
    through: {
      type: 'string',
      title: '{{t("Junction collection")}}',
      'x-disabled': '{{ !createOnly }}',
      'x-reactions': ['{{useAsyncDataSource(loadCollections)}}'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '{{t("Leave it blank, unless you need a custom intermediate table")}}'
      }
    },
    // 'reverseField.uiSchema.title': {
    //   type: 'string',
    //   title: '{{t("Reverse field display name")}}',
    //   // required: true,
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    // 'uiSchema.x-component-props.fieldNames.label': {
    //   type: 'string',
    //   title: '要显示的标题字段',
    //   required: true,
    //   'x-reactions': ['{{useAsyncDataSource(loadCollectionFields)}}'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    // },
    'uiSchema.x-component-props.multiple': {
      type: 'boolean',
      'x-content': '{{t("Allow linking to multiple records")}}',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox'
    }
  }),
  filterable: {
    nested: true,
    children: [// {
      //   name: 'id',
      //   title: '{{t("Exists")}}',
      //   operators: [
      //     { label: '{{t("exists")}}', value: '$exists', noValue: true },
      //     { label: '{{t("not exists")}}', value: '$notExists', noValue: true },
      //   ],
      //   schema: {
      //     title: '{{t("Exists")}}',
      //     type: 'string',
      //     'x-component': 'Input',
      //   },
      // },
    ]
  }
};