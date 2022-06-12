"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = exports.filter = exports.collection = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _actionHooks = require("../../collection-manager/action-hooks");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var collection = {
  type: 'string',
  title: '{{t("Collection")}}',
  name: 'config.collection',
  required: true,
  'x-reactions': ['{{useCollectionDataSource()}}'],
  'x-decorator': 'FormItem',
  'x-component': 'Select'
};
exports.collection = collection;
var values = {
  type: 'object',
  title: '{{t("Fields values")}}',
  name: 'config.params.values',
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    labelAlign: 'left',
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      flex-direction: column;\n    "])))
  },
  'x-component': 'CollectionFieldset',
  description: '{{t("Fields that are not assigned a value will be set to the default value, and those that do not have a default value are set to null.")}}'
};
exports.values = values;
var filter = {
  type: 'object',
  title: '{{t("Filter")}}',
  name: 'config.params.filter',
  'x-decorator': 'FormItem',
  'x-decorator-props': {
    labelAlign: 'left',
    className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      flex-direction: column;\n    "])))
  },
  'x-component': 'Filter',
  'x-component-props': {
    useProps: function useProps() {
      var _values$config;

      var _useForm = (0, _react.useForm)(),
          values = _useForm.values;

      var options = (0, _actionHooks.useCollectionFilterOptions)((_values$config = values.config) === null || _values$config === void 0 ? void 0 : _values$config.collection);
      return {
        options: options,
        className: (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n          position: relative;\n          width: 100%;\n        "])))
      };
    },
    dynamicComponent: 'VariableComponent'
  }
};
exports.filter = filter;