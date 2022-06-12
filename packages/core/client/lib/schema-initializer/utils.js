"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTableColumnInitializerFields = exports.useRemoveGridFormItem = exports.useRecordCollectionDataSourceItems = exports.useFormItemInitializerFields = exports.useCustomFormItemInitializerFields = exports.useCurrentSchema = exports.useCollectionDataSourceItems = exports.removeTableColumn = exports.removeGridFormItem = exports.itemsMerge = exports.gridRowColWrap = exports.findTableColumn = exports.createTableSelectorSchema = exports.createTableBlockSchema = exports.createReadPrettyFormBlockSchema = exports.createKanbanBlockSchema = exports.createFormBlockSchema = exports.createDetailsBlockSchema = exports.createCalendarBlockSchema = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _reactI18next = require("react-i18next");

var _collectionManager = require("../collection-manager");

var _schemaComponent = require("../schema-component");

var _schemaTemplates = require("../schema-templates");

var _excluded = ["formItemInitializers", "actionInitializers", "collection", "association", "resource", "template"],
    _excluded2 = ["formItemInitializers", "actionInitializers", "collection", "resource", "association", "action", "template"],
    _excluded3 = ["formItemInitializers", "actionInitializers", "collection", "association", "resource", "template"],
    _excluded4 = ["collection", "resource", "rowKey"],
    _excluded5 = ["collection", "resource", "rowKey"],
    _excluded6 = ["collection", "resource", "fieldNames"],
    _excluded7 = ["collection", "resource", "groupField"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var itemsMerge = function itemsMerge(items1, items2) {
  return items1;
};

exports.itemsMerge = itemsMerge;

var gridRowColWrap = function gridRowColWrap(schema) {
  return {
    type: 'void',
    'x-component': 'Grid.Row',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'Grid.Col',
      properties: _defineProperty({}, schema.name || (0, _shared.uid)(), schema)
    })
  };
};

exports.gridRowColWrap = gridRowColWrap;

var removeTableColumn = function removeTableColumn(schema, cb) {
  cb(schema.parent);
};

exports.removeTableColumn = removeTableColumn;

var removeGridFormItem = function removeGridFormItem(schema, cb) {
  cb(schema, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  });
};

exports.removeGridFormItem = removeGridFormItem;

var useRemoveGridFormItem = function useRemoveGridFormItem() {
  var form = (0, _react.useForm)();
  return function (schema, cb) {
    var _form$values;

    cb(schema, {
      removeParentsIfNoChildren: true,
      breakRemoveOn: {
        'x-component': 'Grid'
      }
    });
    (_form$values = form.values) === null || _form$values === void 0 ? true : delete _form$values[schema.name];
  };
};

exports.useRemoveGridFormItem = useRemoveGridFormItem;

var findTableColumn = function findTableColumn(schema, key, action) {
  var deepth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return schema.reduceProperties(function (buf, s) {
    if (s[key] === action) {
      return s;
    }

    var c = s.reduceProperties(function (buf, s) {
      if (s[key] === action) {
        return s;
      }

      return buf;
    });

    if (c) {
      return c;
    }

    return buf;
  });
};

exports.findTableColumn = findTableColumn;

var useTableColumnInitializerFields = function useTableColumnInitializerFields() {
  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      _useCollection$fields = _useCollection.fields,
      fields = _useCollection$fields === void 0 ? [] : _useCollection$fields;

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      getInterface = _useCollectionManager.getInterface;

  return fields.filter(function (field) {
    return (field === null || field === void 0 ? void 0 : field.interface) && (field === null || field === void 0 ? void 0 : field.interface) !== 'subTable';
  }).map(function (field) {
    var _field$uiSchema;

    var interfaceConfig = getInterface(field.interface);
    var schema = {
      name: field.name,
      'x-collection-field': "".concat(name, ".").concat(field.name),
      'x-component': 'CollectionField',
      'x-read-pretty': true,
      'x-component-props': {}
    }; // interfaceConfig?.schemaInitialize?.(schema, { field, readPretty: true, block: 'Table' });

    return {
      type: 'item',
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name,
      component: 'TableCollectionFieldInitializer',
      find: findTableColumn,
      remove: removeTableColumn,
      schemaInitialize: function schemaInitialize(s) {
        var _interfaceConfig$sche;

        interfaceConfig === null || interfaceConfig === void 0 ? void 0 : (_interfaceConfig$sche = interfaceConfig.schemaInitialize) === null || _interfaceConfig$sche === void 0 ? void 0 : _interfaceConfig$sche.call(interfaceConfig, s, {
          field: field,
          readPretty: true,
          block: 'Table'
        });
      },
      field: field,
      schema: schema
    };
  });
};

exports.useTableColumnInitializerFields = useTableColumnInitializerFields;

var useFormItemInitializerFields = function useFormItemInitializerFields(options) {
  var _fields$filter;

  var _useCollection2 = (0, _collectionManager.useCollection)(),
      name = _useCollection2.name,
      fields = _useCollection2.fields;

  var _useCollectionManager2 = (0, _collectionManager.useCollectionManager)(),
      getInterface = _useCollectionManager2.getInterface;

  var form = (0, _react.useForm)();

  var _ref = options || {},
      _ref$readPretty = _ref.readPretty,
      readPretty = _ref$readPretty === void 0 ? form.readPretty : _ref$readPretty,
      _ref$block = _ref.block,
      block = _ref$block === void 0 ? 'Form' : _ref$block;

  return fields === null || fields === void 0 ? void 0 : (_fields$filter = fields.filter(function (field) {
    return field === null || field === void 0 ? void 0 : field.interface;
  })) === null || _fields$filter === void 0 ? void 0 : _fields$filter.map(function (field) {
    var _field$uiSchema2;

    var interfaceConfig = getInterface(field.interface);
    var schema = {
      type: 'string',
      name: field.name,
      // title: field?.uiSchema?.title || field.name,
      'x-designer': 'FormItem.Designer',
      'x-component': 'CollectionField',
      'x-decorator': 'FormItem',
      'x-collection-field': "".concat(name, ".").concat(field.name)
    }; // interfaceConfig?.schemaInitialize?.(schema, { field, block: 'Form', readPretty: form.readPretty });

    return {
      type: 'item',
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.title) || field.name,
      component: 'CollectionFieldInitializer',
      remove: removeGridFormItem,
      schemaInitialize: function schemaInitialize(s) {
        var _interfaceConfig$sche2;

        interfaceConfig === null || interfaceConfig === void 0 ? void 0 : (_interfaceConfig$sche2 = interfaceConfig.schemaInitialize) === null || _interfaceConfig$sche2 === void 0 ? void 0 : _interfaceConfig$sche2.call(interfaceConfig, s, {
          field: field,
          block: block,
          readPretty: readPretty
        });
      },
      schema: schema
    };
  });
};

exports.useFormItemInitializerFields = useFormItemInitializerFields;

var useCustomFormItemInitializerFields = function useCustomFormItemInitializerFields(options) {
  var _fields$filter2;

  var _useCollection3 = (0, _collectionManager.useCollection)(),
      name = _useCollection3.name,
      fields = _useCollection3.fields;

  var _useCollectionManager3 = (0, _collectionManager.useCollectionManager)(),
      getInterface = _useCollectionManager3.getInterface;

  var form = (0, _react.useForm)();

  var _ref2 = options || {},
      _ref2$readPretty = _ref2.readPretty,
      readPretty = _ref2$readPretty === void 0 ? form.readPretty : _ref2$readPretty,
      _ref2$block = _ref2.block,
      block = _ref2$block === void 0 ? 'Form' : _ref2$block;

  var remove = useRemoveGridFormItem();
  return fields === null || fields === void 0 ? void 0 : (_fields$filter2 = fields.filter(function (field) {
    var _field$uiSchema3;

    return (field === null || field === void 0 ? void 0 : field.interface) && !(field === null || field === void 0 ? void 0 : (_field$uiSchema3 = field.uiSchema) === null || _field$uiSchema3 === void 0 ? void 0 : _field$uiSchema3['x-read-pretty']);
  })) === null || _fields$filter2 === void 0 ? void 0 : _fields$filter2.map(function (field) {
    var _field$uiSchema4, _field$uiSchema5;

    var interfaceConfig = getInterface(field.interface);
    var schema = {
      type: 'string',
      name: field.name,
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema4 = field.uiSchema) === null || _field$uiSchema4 === void 0 ? void 0 : _field$uiSchema4.title) || field.name,
      'x-designer': 'FormItem.Designer',
      'x-component': 'AssignedField',
      'x-decorator': 'FormItem',
      'x-collection-field': "".concat(name, ".").concat(field.name)
    };
    return {
      type: 'item',
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema5 = field.uiSchema) === null || _field$uiSchema5 === void 0 ? void 0 : _field$uiSchema5.title) || field.name,
      component: 'CollectionFieldInitializer',
      remove: remove,
      schemaInitialize: function schemaInitialize(s) {
        var _interfaceConfig$sche3;

        interfaceConfig === null || interfaceConfig === void 0 ? void 0 : (_interfaceConfig$sche3 = interfaceConfig.schemaInitialize) === null || _interfaceConfig$sche3 === void 0 ? void 0 : _interfaceConfig$sche3.call(interfaceConfig, s, {
          field: field,
          block: block,
          readPretty: readPretty
        });
      },
      schema: schema
    };
  });
};

exports.useCustomFormItemInitializerFields = useCustomFormItemInitializerFields;

var findSchema = function findSchema(schema, key, action) {
  return schema.reduceProperties(function (buf, s) {
    if (s[key] === action) {
      return s;
    }

    var c = findSchema(s, key, action);

    if (c) {
      return c;
    }

    return buf;
  });
};

var removeSchema = function removeSchema(schema, cb) {
  return cb(schema);
};

var useCurrentSchema = function useCurrentSchema(action, key) {
  var find = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : findSchema;
  var rm = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : removeSchema;
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _schemaComponent.useDesignable)(),
      _remove = _useDesignable.remove;

  var schema = find(fieldSchema, key, action);
  return {
    schema: schema,
    exists: !!schema,
    remove: function remove() {
      schema && rm(schema, _remove);
    }
  };
};

exports.useCurrentSchema = useCurrentSchema;

var useRecordCollectionDataSourceItems = function useRecordCollectionDataSourceItems(componentName) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var collection = (0, _collectionManager.useCollection)();

  var _useSchemaTemplateMan = (0, _schemaTemplates.useSchemaTemplateManager)(),
      getTemplatesByCollection = _useSchemaTemplateMan.getTemplatesByCollection;

  var templates = getTemplatesByCollection(collection.name).filter(function (template) {
    return componentName && template.componentName === componentName;
  });

  if (!templates.length) {
    return [];
  }

  var index = 0;
  return [{
    type: 'item',
    name: collection.name,
    title: t('Blank block')
  }, {
    type: 'divider'
  }, {
    key: "".concat(componentName, "_table_subMenu_").concat(index, "_copy"),
    type: 'subMenu',
    name: 'copy',
    title: t('Duplicate template'),
    children: templates.map(function (template) {
      var templateName = (template === null || template === void 0 ? void 0 : template.componentName) === 'ReadPrettyFormItem' ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
      return {
        type: 'item',
        mode: 'copy',
        name: collection.name,
        template: template,
        title: templateName || t('Untitled')
      };
    })
  }, {
    key: "".concat(componentName, "_table_subMenu_").concat(index, "_ref"),
    type: 'subMenu',
    name: 'ref',
    title: t('Reference template'),
    children: templates.map(function (template) {
      var templateName = (template === null || template === void 0 ? void 0 : template.componentName) === 'ReadPrettyFormItem' ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
      return {
        type: 'item',
        mode: 'reference',
        name: collection.name,
        template: template,
        title: templateName || t('Untitled')
      };
    })
  }];
};

exports.useRecordCollectionDataSourceItems = useRecordCollectionDataSourceItems;

var useCollectionDataSourceItems = function useCollectionDataSourceItems(componentName) {
  var _collections$filter;

  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var _useCollectionManager4 = (0, _collectionManager.useCollectionManager)(),
      collections = _useCollectionManager4.collections;

  var _useSchemaTemplateMan2 = (0, _schemaTemplates.useSchemaTemplateManager)(),
      getTemplatesByCollection = _useSchemaTemplateMan2.getTemplatesByCollection;

  return [{
    key: 'tableBlock',
    type: 'itemGroup',
    title: t('Select collection'),
    children: collections === null || collections === void 0 ? void 0 : (_collections$filter = collections.filter(function (item) {
      return !item.inherit;
    })) === null || _collections$filter === void 0 ? void 0 : _collections$filter.map(function (item, index) {
      var templates = getTemplatesByCollection(item.name).filter(function (template) {
        return componentName && template.componentName === componentName;
      });

      if (!templates.length) {
        return {
          type: 'item',
          name: item.name,
          title: item.title
        };
      }

      return {
        key: "".concat(componentName, "_table_subMenu_").concat(index),
        type: 'subMenu',
        name: "".concat(item.name, "_").concat(index),
        title: item.title,
        children: [{
          type: 'item',
          name: item.name,
          title: t('Blank block')
        }, {
          type: 'divider'
        }, {
          key: "".concat(componentName, "_table_subMenu_").concat(index, "_copy"),
          type: 'subMenu',
          name: 'copy',
          title: t('Duplicate template'),
          children: templates.map(function (template) {
            var templateName = (template === null || template === void 0 ? void 0 : template.componentName) === 'FormItem' ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
            return {
              type: 'item',
              mode: 'copy',
              name: item.name,
              template: template,
              title: templateName || t('Untitled')
            };
          })
        }, {
          key: "".concat(componentName, "_table_subMenu_").concat(index, "_ref"),
          type: 'subMenu',
          name: 'ref',
          title: t('Reference template'),
          children: templates.map(function (template) {
            var templateName = (template === null || template === void 0 ? void 0 : template.componentName) === 'FormItem' ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
            return {
              type: 'item',
              mode: 'reference',
              name: item.name,
              template: template,
              title: templateName || t('Untitled')
            };
          })
        }]
      };
    })
  }];
};

exports.useCollectionDataSourceItems = useCollectionDataSourceItems;

var createDetailsBlockSchema = function createDetailsBlockSchema(options) {
  var _options$formItemInit = options.formItemInitializers,
      formItemInitializers = _options$formItemInit === void 0 ? 'ReadPrettyFormItemInitializers' : _options$formItemInit,
      _options$actionInitia = options.actionInitializers,
      actionInitializers = _options$actionInitia === void 0 ? 'DetailsActionInitializers' : _options$actionInitia,
      collection = options.collection,
      association = options.association,
      resource = options.resource,
      template = options.template,
      others = _objectWithoutProperties(options, _excluded);

  var resourceName = resource || association || collection;
  var schema = {
    type: 'void',
    'x-acl-action': "".concat(resourceName, ":get"),
    'x-decorator': 'DetailsBlockProvider',
    'x-decorator-props': _objectSpread({
      resource: resourceName,
      collection: collection,
      association: association,
      readPretty: true,
      action: 'list',
      params: {
        pageSize: 1
      }
    }, others),
    'x-designer': 'DetailsDesigner',
    'x-component': 'CardItem',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'FormV2',
      'x-read-pretty': true,
      'x-component-props': {
        useProps: '{{ useDetailsBlockProps }}'
      },
      properties: {
        actions: {
          type: 'void',
          'x-initializer': actionInitializers,
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 24
            }
          },
          properties: {}
        },
        grid: template || {
          type: 'void',
          'x-component': 'Grid',
          'x-initializer': formItemInitializers,
          properties: {}
        },
        pagination: {
          type: 'void',
          'x-component': 'Pagination',
          'x-component-props': {
            useProps: '{{ useDetailsPaginationProps }}'
          }
        }
      }
    })
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createDetailsBlockSchema = createDetailsBlockSchema;

var createFormBlockSchema = function createFormBlockSchema(options) {
  var _options$formItemInit2 = options.formItemInitializers,
      formItemInitializers = _options$formItemInit2 === void 0 ? 'FormItemInitializers' : _options$formItemInit2,
      _options$actionInitia2 = options.actionInitializers,
      actionInitializers = _options$actionInitia2 === void 0 ? 'FormActionInitializers' : _options$actionInitia2,
      collection = options.collection,
      resource = options.resource,
      association = options.association,
      action = options.action,
      template = options.template,
      others = _objectWithoutProperties(options, _excluded2);

  var resourceName = resource || association || collection;
  var schema = {
    type: 'void',
    'x-acl-action-props': {
      skipScopeCheck: !action
    },
    'x-acl-action': action ? "".concat(resourceName, ":update") : "".concat(resourceName, ":create"),
    'x-decorator': 'FormBlockProvider',
    'x-decorator-props': _objectSpread(_objectSpread({}, others), {}, {
      action: action,
      resource: resourceName,
      collection: collection,
      association: association // action: 'get',
      // useParams: '{{ useParamsFromRecord }}',

    }),
    'x-designer': 'FormV2.Designer',
    'x-component': 'CardItem',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'FormV2',
      'x-component-props': {
        useProps: '{{ useFormBlockProps }}'
      },
      properties: {
        grid: template || {
          type: 'void',
          'x-component': 'Grid',
          'x-initializer': formItemInitializers,
          properties: {}
        },
        actions: {
          type: 'void',
          'x-initializer': actionInitializers,
          'x-component': 'ActionBar',
          'x-component-props': {
            layout: 'one-column',
            style: {
              marginTop: 24
            }
          },
          properties: {}
        }
      }
    })
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createFormBlockSchema = createFormBlockSchema;

var createReadPrettyFormBlockSchema = function createReadPrettyFormBlockSchema(options) {
  var _options$formItemInit3 = options.formItemInitializers,
      formItemInitializers = _options$formItemInit3 === void 0 ? 'ReadPrettyFormItemInitializers' : _options$formItemInit3,
      _options$actionInitia3 = options.actionInitializers,
      actionInitializers = _options$actionInitia3 === void 0 ? 'ReadPrettyFormActionInitializers' : _options$actionInitia3,
      collection = options.collection,
      association = options.association,
      resource = options.resource,
      template = options.template,
      others = _objectWithoutProperties(options, _excluded3);

  var resourceName = resource || association || collection;
  var schema = {
    type: 'void',
    'x-acl-action': "".concat(resourceName, ":get"),
    'x-decorator': 'FormBlockProvider',
    'x-decorator-props': _objectSpread({
      resource: resourceName,
      collection: collection,
      association: association,
      readPretty: true,
      action: 'get',
      useParams: '{{ useParamsFromRecord }}'
    }, others),
    'x-designer': 'FormV2.ReadPrettyDesigner',
    'x-component': 'CardItem',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'FormV2',
      'x-read-pretty': true,
      'x-component-props': {
        useProps: '{{ useFormBlockProps }}'
      },
      properties: {
        actions: {
          type: 'void',
          'x-initializer': actionInitializers,
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 24
            }
          },
          properties: {}
        },
        grid: template || {
          type: 'void',
          'x-component': 'Grid',
          'x-initializer': formItemInitializers,
          properties: {}
        }
      }
    })
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createReadPrettyFormBlockSchema = createReadPrettyFormBlockSchema;

var createTableBlockSchema = function createTableBlockSchema(options) {
  var collection = options.collection,
      resource = options.resource,
      rowKey = options.rowKey,
      others = _objectWithoutProperties(options, _excluded4);

  var schema = {
    type: 'void',
    'x-decorator': 'TableBlockProvider',
    'x-acl-action': "".concat(resource || collection, ":list"),
    'x-decorator-props': _objectSpread({
      collection: collection,
      resource: resource || collection,
      action: 'list',
      params: {
        pageSize: 20
      },
      rowKey: rowKey,
      showIndex: true,
      dragSort: false
    }, others),
    'x-designer': 'TableBlockDesigner',
    'x-component': 'CardItem',
    properties: _defineProperty({
      actions: {
        type: 'void',
        'x-initializer': 'TableActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16
          }
        },
        properties: {}
      }
    }, (0, _shared.uid)(), {
      type: 'array',
      'x-initializer': 'TableColumnInitializers',
      'x-component': 'TableV2',
      'x-component-props': {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox'
        },
        useProps: '{{ useTableBlockProps }}'
      },
      properties: {
        actions: {
          type: 'void',
          title: '{{ t("Actions") }}',
          'x-action-column': 'actions',
          'x-decorator': 'TableV2.Column.ActionBar',
          'x-component': 'TableV2.Column',
          'x-designer': 'TableV2.ActionColumnDesigner',
          'x-initializer': 'TableActionColumnInitializers',
          properties: {
            actions: {
              type: 'void',
              'x-decorator': 'DndContext',
              'x-component': 'Space',
              'x-component-props': {
                split: '|'
              },
              properties: {}
            }
          }
        }
      }
    })
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createTableBlockSchema = createTableBlockSchema;

var createTableSelectorSchema = function createTableSelectorSchema(options) {
  var collection = options.collection,
      resource = options.resource,
      rowKey = options.rowKey,
      others = _objectWithoutProperties(options, _excluded5);

  var schema = {
    type: 'void',
    'x-acl-action': "".concat(resource || collection, ":list"),
    'x-decorator': 'TableSelectorProvider',
    'x-decorator-props': _objectSpread({
      collection: collection,
      resource: resource || collection,
      action: 'list',
      params: {
        pageSize: 20
      },
      rowKey: rowKey
    }, others),
    'x-designer': 'TableSelectorDesigner',
    'x-component': 'BlockItem',
    properties: {
      actions: {
        type: 'void',
        'x-initializer': 'TableActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16
          }
        },
        properties: {}
      },
      value: {
        type: 'array',
        'x-initializer': 'TableColumnInitializers',
        'x-component': 'TableV2.Selector',
        'x-component-props': {
          rowSelection: {
            type: 'checkbox'
          },
          useProps: '{{ useTableSelectorProps }}'
        },
        properties: {}
      }
    }
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createTableSelectorSchema = createTableSelectorSchema;

var createCalendarBlockSchema = function createCalendarBlockSchema(options) {
  var collection = options.collection,
      resource = options.resource,
      fieldNames = options.fieldNames,
      others = _objectWithoutProperties(options, _excluded6);

  var schema = {
    type: 'void',
    'x-acl-action': "".concat(resource || collection, ":list"),
    'x-decorator': 'CalendarBlockProvider',
    'x-decorator-props': _objectSpread({
      collection: collection,
      resource: resource || collection,
      action: 'list',
      fieldNames: _objectSpread({
        id: 'id'
      }, fieldNames),
      params: {
        paginate: false
      }
    }, others),
    'x-designer': 'CalendarV2.Designer',
    'x-component': 'CardItem',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'CalendarV2',
      'x-component-props': {
        useProps: '{{ useCalendarBlockProps }}'
      },
      properties: {
        toolBar: {
          type: 'void',
          'x-component': 'CalendarV2.ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 24
            }
          },
          'x-initializer': 'CalendarActionInitializers',
          properties: {}
        },
        event: {
          type: 'void',
          'x-component': 'CalendarV2.Event',
          properties: {
            drawer: {
              type: 'void',
              'x-component': 'Action.Drawer',
              'x-component-props': {
                className: 'nb-action-popup'
              },
              title: '{{ t("View record") }}',
              properties: {
                tabs: {
                  type: 'void',
                  'x-component': 'Tabs',
                  'x-component-props': {},
                  'x-initializer': 'TabPaneInitializers',
                  properties: {
                    tab1: {
                      type: 'void',
                      title: '{{t("Details")}}',
                      'x-component': 'Tabs.TabPane',
                      'x-designer': 'Tabs.Designer',
                      'x-component-props': {},
                      properties: {
                        grid: {
                          type: 'void',
                          'x-component': 'Grid',
                          'x-initializer': 'RecordBlockInitializers',
                          properties: {}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

exports.createCalendarBlockSchema = createCalendarBlockSchema;

var createKanbanBlockSchema = function createKanbanBlockSchema(options) {
  var collection = options.collection,
      resource = options.resource,
      groupField = options.groupField,
      others = _objectWithoutProperties(options, _excluded7);

  var schema = {
    type: 'void',
    'x-acl-action': "".concat(resource || collection, ":list"),
    'x-decorator': 'KanbanBlockProvider',
    'x-decorator-props': _objectSpread({
      collection: collection,
      resource: resource || collection,
      action: 'list',
      groupField: groupField,
      params: {
        paginate: false
      }
    }, others),
    'x-designer': 'KanbanV2.Designer',
    'x-component': 'CardItem',
    properties: _defineProperty({
      actions: {
        type: 'void',
        'x-initializer': 'KanbanActionInitializers',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16
          }
        },
        properties: {}
      }
    }, (0, _shared.uid)(), {
      type: 'array',
      'x-component': 'KanbanV2',
      'x-component-props': {
        useProps: '{{ useKanbanBlockProps }}'
      },
      properties: {
        card: {
          type: 'void',
          'x-read-pretty': true,
          'x-decorator': 'BlockItem',
          'x-component': 'KanbanV2.Card',
          'x-designer': 'KanbanV2.Card.Designer',
          properties: {
            grid: {
              type: 'void',
              'x-component': 'Grid',
              'x-component-props': {
                dndContext: false
              }
            }
          }
        },
        cardViewer: {
          type: 'void',
          title: '{{ t("View") }}',
          'x-designer': 'Action.Designer',
          'x-component': 'KanbanV2.CardViewer',
          'x-component-props': {
            openMode: 'drawer'
          },
          properties: {
            drawer: {
              type: 'void',
              title: '{{ t("View record") }}',
              'x-component': 'Action.Container',
              'x-component-props': {
                className: 'nb-action-popup'
              },
              properties: {
                tabs: {
                  type: 'void',
                  'x-component': 'Tabs',
                  'x-component-props': {},
                  'x-initializer': 'TabPaneInitializers',
                  properties: {
                    tab1: {
                      type: 'void',
                      title: '{{t("Details")}}',
                      'x-component': 'Tabs.TabPane',
                      'x-designer': 'Tabs.Designer',
                      'x-component-props': {},
                      properties: {
                        grid: {
                          type: 'void',
                          'x-component': 'Grid',
                          'x-initializer': 'RecordBlockInitializers',
                          properties: {}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  };
  return schema;
};

exports.createKanbanBlockSchema = createKanbanBlockSchema;