function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ArrayItems } from '@formily/antd';
import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTableSelectorContext } from '../../../block-provider';
import { useCollection } from '../../../collection-manager';
import { useCollectionFilterOptions, useSortFields } from '../../../collection-manager/action-hooks';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useSchemaTemplate } from '../../../schema-templates';
import { useDesignable } from '../../hooks';
export var TableSelectorDesigner = function TableSelectorDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora2, _fieldSchema$xDecora3, _field$decoratorProps, _field$decoratorProps2;

  var _useCollection = useCollection(),
      name = _useCollection.name,
      title = _useCollection.title;

  var field = useField();
  var fieldSchema = useFieldSchema();
  var dataSource = useCollectionFilterOptions(name);
  var sortFields = useSortFields(name);

  var _useTableSelectorCont = useTableSelectorContext(),
      service = _useTableSelectorCont.service;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

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
  var template = useSchemaTemplate();
  var dragSort = field.decoratorProps.dragSort;
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    template: template,
    title: title || name,
    disableInitializer: true
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
        filter: filter,
        page: 1
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), !dragSort && /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
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
  }), /*#__PURE__*/React.createElement(SchemaSettings.SelectItem, {
    title: t('Records per page'),
    value: ((_field$decoratorProps = field.decoratorProps) === null || _field$decoratorProps === void 0 ? void 0 : (_field$decoratorProps2 = _field$decoratorProps.params) === null || _field$decoratorProps2 === void 0 ? void 0 : _field$decoratorProps2.pageSize) || 20,
    options: [{
      label: '10',
      value: 10
    }, {
      label: '20',
      value: 20
    }, {
      label: '50',
      value: 50
    }, {
      label: '100',
      value: 100
    }, {
      label: '200',
      value: 200
    }],
    onChange: function onChange(pageSize) {
      var _service$params3, _schema3;

      var params = field.decoratorProps.params || {};
      params.pageSize = pageSize;
      field.decoratorProps.params = params;
      fieldSchema['x-decorator-props']['params'] = params;
      service.run(_objectSpread(_objectSpread({}, (_service$params3 = service.params) === null || _service$params3 === void 0 ? void 0 : _service$params3[0]), {}, {
        pageSize: pageSize,
        page: 1
      }));
      dn.emit('patch', {
        schema: (_schema3 = {}, _defineProperty(_schema3, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema3, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema3)
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};