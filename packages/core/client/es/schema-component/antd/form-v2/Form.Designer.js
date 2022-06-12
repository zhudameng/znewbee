function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ArrayItems } from '@formily/antd';
import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormBlockContext } from '../../../block-provider';
import { useDetailsBlockContext } from '../../../block-provider/DetailsBlockProvider';
import { useCollection } from '../../../collection-manager';
import { useCollectionFilterOptions, useSortFields } from '../../../collection-manager/action-hooks';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useSchemaTemplate } from '../../../schema-templates';
import { useDesignable } from '../../hooks';
import { useActionContext } from '../action';
export var FormDesigner = function FormDesigner() {
  var _useCollection = useCollection(),
      name = _useCollection.name,
      title = _useCollection.title;

  var template = useSchemaTemplate();
  var ctx = useFormBlockContext();
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useActionContext = useActionContext(),
      visible = _useActionContext.visible;

  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.FormItemTemplate, {
    componentName: 'FormItem',
    collectionName: name
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};
export var ReadPrettyFormDesigner = function ReadPrettyFormDesigner() {
  var _useCollection2 = useCollection(),
      name = _useCollection2.name,
      title = _useCollection2.title;

  var template = useSchemaTemplate();
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.FormItemTemplate, {
    insertAdjacentPosition: 'beforeEnd',
    componentName: 'ReadPrettyFormItem',
    collectionName: name
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};
export var DetailsDesigner = function DetailsDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora2, _fieldSchema$xDecora3;

  var _useCollection3 = useCollection(),
      name = _useCollection3.name,
      title = _useCollection3.title;

  var template = useSchemaTemplate();

  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var fieldSchema = useFieldSchema();
  var field = useField();
  var dataSource = useCollectionFilterOptions(name);

  var _useDetailsBlockConte = useDetailsBlockContext(),
      service = _useDetailsBlockConte.service;

  var _useDesignable2 = useDesignable(),
      dn = _useDesignable2.dn;

  var sortFields = useSortFields(name);
  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.params) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : _fieldSchema$xDecora$.filter) || {};
  var defaultSort = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora2 = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora2 === void 0 ? void 0 : (_fieldSchema$xDecora3 = _fieldSchema$xDecora2.params) === null || _fieldSchema$xDecora3 === void 0 ? void 0 : _fieldSchema$xDecora3.sort) || [];
  var sort = defaultSort === null || defaultSort === void 0 ? void 0 : defaultSort.map(function (item) {
    return item.startsWith('-') ? {
      field: item.substring(1),
      direction: 'desc'
    } : {
      field: item,
      direction: 'asc'
    };
  });
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Set the data scope'),
    schema: {
      type: 'object',
      title: t('Set the data scope'),
      properties: {
        filter: {
          default: defaultFilter,
          // title: '数据范围',
          enum: dataSource,
          'x-component': 'Filter',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var _service$params, _schema;

      var filter = _ref.filter;
      var params = field.decoratorProps.params || {};
      params.filter = filter;
      field.decoratorProps.params = params;
      fieldSchema['x-decorator-props']['params'] = params;
      service.run(_objectSpread(_objectSpread({}, (_service$params = service.params) === null || _service$params === void 0 ? void 0 : _service$params[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Set default sorting rules'),
    components: {
      ArrayItems: ArrayItems
    },
    schema: {
      type: 'object',
      title: t('Set default sorting rules'),
      properties: {
        sort: {
          type: 'array',
          default: sort,
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          items: {
            type: 'object',
            properties: {
              space: {
                type: 'void',
                'x-component': 'Space',
                properties: {
                  sort: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle'
                  },
                  field: {
                    type: 'string',
                    enum: sortFields,
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-component-props': {
                      style: {
                        width: 260
                      }
                    }
                  },
                  direction: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Radio.Group',
                    'x-component-props': {
                      optionType: 'button'
                    },
                    enum: [{
                      label: t('ASC'),
                      value: 'asc'
                    }, {
                      label: t('DESC'),
                      value: 'desc'
                    }]
                  },
                  remove: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove'
                  }
                }
              }
            }
          },
          properties: {
            add: {
              type: 'void',
              title: t('Add sort field'),
              'x-component': 'ArrayItems.Addition'
            }
          }
        }
      }
    },
    onSubmit: function onSubmit(_ref2) {
      var _schema2, _service$params2;

      var sort = _ref2.sort;
      var sortArr = sort.map(function (item) {
        return item.direction === 'desc' ? "-".concat(item.field) : item.field;
      });
      var params = field.decoratorProps.params || {};
      params.sort = sortArr;
      field.decoratorProps.params = params;
      fieldSchema['x-decorator-props']['params'] = params;
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema2)
      });
      service.run(_objectSpread(_objectSpread({}, (_service$params2 = service.params) === null || _service$params2 === void 0 ? void 0 : _service$params2[0]), {}, {
        sort: sortArr
      }));
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Template, {
    componentName: 'Details',
    collectionName: name
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};