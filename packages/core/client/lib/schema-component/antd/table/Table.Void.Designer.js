"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableVoidDesigner = void 0;

var _antd = require("@formily/antd");

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _collectionManager = require("../../../collection-manager");

var _actionHooks = require("../../../collection-manager/action-hooks");

var _schemaSettings = require("../../../schema-settings");

var _schemaTemplates = require("../../../schema-templates");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TableVoidDesigner = function TableVoidDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora$2, _fieldSchema$xDecora2, _fieldSchema$xDecora3, _fieldSchema$xDecora4, _field$decoratorProps;

  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      title = _useCollection.title;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var dataSource = (0, _actionHooks.useCollectionFilterOptions)(name);
  var sortFields = (0, _actionHooks.useSortFields)(name);
  var ctx = (0, _collectionManager.useResourceActionContext)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useDesignable = (0, _hooks.useDesignable)(),
      dn = _useDesignable.dn;

  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.request) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : (_fieldSchema$xDecora$2 = _fieldSchema$xDecora$.params) === null || _fieldSchema$xDecora$2 === void 0 ? void 0 : _fieldSchema$xDecora$2.filter) || {};
  var defaultSort = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora2 = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora2 === void 0 ? void 0 : (_fieldSchema$xDecora3 = _fieldSchema$xDecora2.request) === null || _fieldSchema$xDecora3 === void 0 ? void 0 : (_fieldSchema$xDecora4 = _fieldSchema$xDecora3.params) === null || _fieldSchema$xDecora4 === void 0 ? void 0 : _fieldSchema$xDecora4.sort) || [];
  var sort = defaultSort === null || defaultSort === void 0 ? void 0 : defaultSort.map(function (item) {
    return item.startsWith('-') ? {
      field: item.substring(1),
      direction: 'desc'
    } : {
      field: item,
      direction: 'asc'
    };
  });
  var template = (0, _schemaTemplates.useSchemaTemplate)();
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SwitchItem, {
    title: t('Enable drag and drop sorting'),
    checked: field.decoratorProps.dragSort,
    onChange: function onChange(dragSort) {
      var _ctx$params, _schema;

      field.decoratorProps.dragSort = dragSort;
      fieldSchema['x-decorator-props'].dragSort = dragSort;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params = ctx.params) === null || _ctx$params === void 0 ? void 0 : _ctx$params[0]), {}, {
        sort: 'sort'
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: '设置数据范围',
    schema: {
      type: 'object',
      title: '设置数据范围',
      properties: {
        filter: {
          default: defaultFilter,
          title: '数据范围',
          enum: dataSource,
          'x-component': 'Filter',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var _ctx$params2, _schema2;

      var filter = _ref.filter;
      var params = field.decoratorProps.request.params || {};
      params.filter = filter;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params2 = ctx.params) === null || _ctx$params2 === void 0 ? void 0 : _ctx$params2[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema2)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Set default sorting rules'),
    components: {
      ArrayItems: _antd.ArrayItems
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
      var _schema3, _ctx$params3;

      var sort = _ref2.sort;
      var sortArr = sort.map(function (item) {
        return item.direction === 'desc' ? "-".concat(item.field) : item.field;
      });
      var params = field.decoratorProps.request.params || {};
      params.sort = sortArr;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      dn.emit('patch', {
        schema: (_schema3 = {}, _defineProperty(_schema3, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema3, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema3)
      });
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params3 = ctx.params) === null || _ctx$params3 === void 0 ? void 0 : _ctx$params3[0]), {}, {
        sort: sortArr
      }));
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: '每页显示',
    value: ((_field$decoratorProps = field.decoratorProps.request.params) === null || _field$decoratorProps === void 0 ? void 0 : _field$decoratorProps.pageSize) || 20,
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
      var _ctx$params4, _schema4;

      var params = field.decoratorProps.request.params || {};
      params.pageSize = pageSize;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params4 = ctx.params) === null || _ctx$params4 === void 0 ? void 0 : _ctx$params4[0]), {}, {
        pageSize: pageSize
      }));
      dn.emit('patch', {
        schema: (_schema4 = {}, _defineProperty(_schema4, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema4, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema4)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Template, {
    componentName: 'Table',
    collectionName: name
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.TableVoidDesigner = TableVoidDesigner;