function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Select } from 'antd';
import { observer, useForm } from '@formily/react';
import { useCollectionDataSource, useCollectionManager } from '../../collection-manager';
import { useCompile } from '../../schema-component';
import { useFlowContext } from '../WorkflowCanvas';
import { BaseTypeSet } from '../calculators';
import { collection, filter } from '../schemas/collection';
import { useTranslation } from 'react-i18next';
var FieldsSelect = observer(function (props) {
  var _values$config;

  var compile = useCompile();

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var _useForm = useForm(),
      values = _useForm.values;

  var fields = getCollectionFields(values === null || values === void 0 ? void 0 : (_values$config = values.config) === null || _values$config === void 0 ? void 0 : _values$config.collection);
  return /*#__PURE__*/React.createElement(Select, _objectSpread({}, props), fields.filter(function (field) {
    return !field.hidden && (field.uiSchema ? !field.uiSchema['x-read-pretty'] : true);
  }).map(function (field) {
    var _field$uiSchema;

    return /*#__PURE__*/React.createElement(Select.Option, {
      value: field.name
    }, compile((_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title));
  }));
});
export default {
  title: '{{t("Collection event")}}',
  type: 'collection',
  fieldset: {
    'config.collection': collection,
    'config.mode': {
      type: 'number',
      title: '{{t("Trigger on")}}',
      name: 'config.mode',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        options: [{
          value: 1,
          label: '{{t("After record added")}}'
        }, {
          value: 2,
          label: '{{t("After record updated")}}'
        }, {
          value: 3,
          label: '{{t("After record added or updated")}}'
        }, {
          value: 4,
          label: '{{t("After record deleted")}}'
        }]
      },
      required: true
    },
    'config.changed': {
      type: 'array',
      name: 'changed',
      title: '{{t("Changed fields")}}',
      description: '{{t("Triggered only if one of the selected fields changes. If unselected, it means that it will be triggered when any field changes. When record is added or deleted, any field is considered to have been changed.")}}',
      'x-decorator': 'FormItem',
      'x-component': 'FieldsSelect',
      'x-component-props': {
        mode: 'multiple'
      }
    },
    'config.condition': _objectSpread(_objectSpread({}, filter), {}, {
      name: 'config.condition',
      title: '{{t("Only triggers when match conditions")}}'
    })
  },
  scope: {
    useCollectionDataSource: useCollectionDataSource
  },
  components: {
    FieldsSelect: FieldsSelect
  },
  getter: function getter(_ref) {
    var _collections$find, _options$path;

    var type = _ref.type,
        options = _ref.options,
        _onChange = _ref.onChange;

    var _useTranslation = useTranslation(),
        t = _useTranslation.t;

    var compile = useCompile();

    var _useCollectionManager2 = useCollectionManager(),
        _useCollectionManager3 = _useCollectionManager2.collections,
        collections = _useCollectionManager3 === void 0 ? [] : _useCollectionManager3;

    var _useFlowContext = useFlowContext(),
        workflow = _useFlowContext.workflow;

    var collection = (_collections$find = collections.find(function (item) {
      return item.name === workflow.config.collection;
    })) !== null && _collections$find !== void 0 ? _collections$find : {
      fields: []
    };
    return /*#__PURE__*/React.createElement(Select, {
      placeholder: t('Fields'),
      value: options === null || options === void 0 ? void 0 : (_options$path = options.path) === null || _options$path === void 0 ? void 0 : _options$path.replace(/^data\./, ''),
      onChange: function onChange(path) {
        _onChange({
          type: type,
          options: _objectSpread(_objectSpread({}, options), {}, {
            path: "data.".concat(path)
          })
        });
      }
    }, collection.fields.filter(function (field) {
      var _field$uiSchema2;

      return BaseTypeSet.has(field === null || field === void 0 ? void 0 : (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.type);
    }).map(function (field) {
      return /*#__PURE__*/React.createElement(Select.Option, {
        key: field.name,
        value: field.name
      }, compile(field.uiSchema.title));
    }));
  }
};