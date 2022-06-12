var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from "@emotion/css";
import { useForm } from "@formily/react";
import { useCollectionFilterOptions } from "../../collection-manager/action-hooks";
export var collection = {
  type: 'string',
  title: '{{t("Collection")}}',
  name: 'config.collection',
  required: true,
  'x-reactions': ['{{useCollectionDataSource()}}'],
  'x-decorator': 'FormItem',
  'x-component': 'Select'
};
export var values = {
  type: 'object',
  title: '{{t("Fields values")}}',
  name: 'config.params.values',
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    labelAlign: 'left',
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      flex-direction: column;\n    "])))
  },
  'x-component': 'CollectionFieldset',
  description: '{{t("Fields that are not assigned a value will be set to the default value, and those that do not have a default value are set to null.")}}'
};
export var filter = {
  type: 'object',
  title: '{{t("Filter")}}',
  name: 'config.params.filter',
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    labelAlign: 'left',
    className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      flex-direction: column;\n    "])))
  },
  'x-component': 'Filter',
  'x-component-props': {
    useProps: function useProps() {
      var _values$config;

      var _useForm = useForm(),
          values = _useForm.values;

      var options = useCollectionFilterOptions((_values$config = values.config) === null || _values$config === void 0 ? void 0 : _values$config.collection);
      return {
        options: options,
        className: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n          position: relative;\n          width: 100%;\n        "])))
      };
    },
    dynamicComponent: 'VariableComponent'
  }
};