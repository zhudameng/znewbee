var _excluded = ["templateWrap", "onCreateBlockSchema", "componentType", "createBlockSchema", "insert"],
    _excluded2 = ["onCreateBlockSchema", "componentType", "createBlockSchema", "insert"],
    _excluded3 = ["onCreateBlockSchema", "componentType", "createBlockSchema", "insert"],
    _excluded4 = ["onCreateBlockSchema", "componentType", "createBlockSchema", "insert"],
    _excluded5 = ["item", "onCreateBlockSchema", "componentType", "createBlockSchema", "insert"],
    _excluded6 = ["onCreateBlockSchema", "componentType", "createBlockSchema", "insert"];

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { FormOutlined, TableOutlined } from '@ant-design/icons';
import { FormDialog, FormLayout } from '@formily/antd';
import { SchemaOptionsContext } from '@formily/react';
import { merge } from '@formily/shared';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient } from '../../api-client';
import { useBlockAssociationContext } from '../../block-provider';
import { useCollection, useCollectionManager } from '../../collection-manager';
import { SchemaComponent, SchemaComponentOptions } from '../../schema-component';
import { useSchemaTemplateManager } from '../../schema-templates';
import { SchemaInitializer } from '../SchemaInitializer';
import { createCalendarBlockSchema, createDetailsBlockSchema, createFormBlockSchema, createKanbanBlockSchema, createReadPrettyFormBlockSchema, createTableBlockSchema, createTableSelectorSchema, useCollectionDataSourceItems, useCurrentSchema, useRecordCollectionDataSourceItems } from '../utils'; // Block

export var BlockInitializer = function BlockInitializer(props) {
  var item = props.item,
      insert = props.insert;
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, {
    onClick: function onClick() {
      insert(_objectSpread({}, item.schema));
    }
  });
};
export var CustomizeActionInitializer = function CustomizeActionInitializer(props) {
  return /*#__PURE__*/React.createElement(BlockInitializer, _objectSpread({}, props));
};
export var InitializerWithSwitch = function InitializerWithSwitch(props) {
  var _item$schema;

  var type = props.type,
      schema = props.schema,
      item = props.item,
      insert = props.insert;

  var _useCurrentSchema = useCurrentSchema((schema === null || schema === void 0 ? void 0 : schema[type]) || (item === null || item === void 0 ? void 0 : (_item$schema = item.schema) === null || _item$schema === void 0 ? void 0 : _item$schema[type]), type, item.find, item.remove),
      exists = _useCurrentSchema.exists,
      remove = _useCurrentSchema.remove;

  return /*#__PURE__*/React.createElement(SchemaInitializer.SwitchItem, {
    checked: exists,
    title: item.title,
    onClick: function onClick() {
      var _item$schemaInitializ;

      if (exists) {
        return remove();
      }

      var s = merge(schema || {}, item.schema || {});
      item === null || item === void 0 ? void 0 : (_item$schemaInitializ = item.schemaInitialize) === null || _item$schemaInitializ === void 0 ? void 0 : _item$schemaInitializ.call(item, s);
      insert(s);
    }
  });
};
export var ActionInitializer = function ActionInitializer(props) {
  return /*#__PURE__*/React.createElement(InitializerWithSwitch, _objectSpread(_objectSpread({}, props), {}, {
    type: 'x-action'
  }));
};
export var DataBlockInitializer = function DataBlockInitializer(props) {
  var templateWrap = props.templateWrap,
      onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded);

  var _useSchemaTemplateMan = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan.getTemplateSchemaByMode;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(TableOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var item, s;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                item = _ref.item;

                if (!item.template) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return getTemplateSchemaByMode(item);

              case 4:
                s = _context.sent;
                templateWrap ? insert(templateWrap(s, {
                  item: item
                })) : insert(s);
                _context.next = 9;
                break;

              case 8:
                if (onCreateBlockSchema) {
                  onCreateBlockSchema({
                    item: item
                  });
                } else if (createBlockSchema) {
                  insert(createBlockSchema({
                    collection: item.name
                  }));
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onClick(_x) {
        return _onClick.apply(this, arguments);
      }

      return onClick;
    }(),
    items: useCollectionDataSourceItems(componentType)
  }));
};
export var TableBlockInitializer = function TableBlockInitializer(props) {
  var insert = props.insert;

  var _useCollectionManager = useCollectionManager(),
      getCollection = _useCollectionManager.getCollection;

  return /*#__PURE__*/React.createElement(DataBlockInitializer, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/React.createElement(TableOutlined, null),
    componentType: 'Table',
    onCreateBlockSchema: function () {
      var _onCreateBlockSchema = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var item, collection, schema;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = _ref2.item;
                collection = getCollection(item.name);
                schema = createTableBlockSchema({
                  collection: item.name,
                  rowKey: collection.filterTargetKey || 'id'
                });
                insert(schema);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onCreateBlockSchema(_x2) {
        return _onCreateBlockSchema.apply(this, arguments);
      }

      return onCreateBlockSchema;
    }()
  }));
};
export var FormBlockInitializer = function FormBlockInitializer(props) {
  return /*#__PURE__*/React.createElement(DataBlockInitializer, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/React.createElement(FormOutlined, null),
    componentType: 'FormItem',
    templateWrap: function templateWrap(templateSchema, _ref3) {
      var item = _ref3.item;
      var s = createFormBlockSchema({
        template: templateSchema,
        collection: item.name
      });

      if (item.template && item.mode === 'reference') {
        s['x-template-key'] = item.template.key;
      }

      return s;
    },
    createBlockSchema: createFormBlockSchema
  }));
};
export var DetailsBlockInitializer = function DetailsBlockInitializer(props) {
  var insert = props.insert;

  var _useCollectionManager2 = useCollectionManager(),
      getCollection = _useCollectionManager2.getCollection;

  return /*#__PURE__*/React.createElement(DataBlockInitializer, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/React.createElement(TableOutlined, null),
    componentType: 'Details',
    onCreateBlockSchema: function () {
      var _onCreateBlockSchema2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
        var item, collection, schema;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                item = _ref4.item;
                collection = getCollection(item.name);
                schema = createDetailsBlockSchema({
                  collection: item.name,
                  rowKey: collection.filterTargetKey || 'id'
                });
                insert(schema);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function onCreateBlockSchema(_x3) {
        return _onCreateBlockSchema2.apply(this, arguments);
      }

      return onCreateBlockSchema;
    }()
  }));
};
export var CalendarBlockInitializer = function CalendarBlockInitializer(props) {
  var insert = props.insert;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useCollectionManager3 = useCollectionManager(),
      getCollection = _useCollectionManager3.getCollection;

  var options = useContext(SchemaOptionsContext);
  return /*#__PURE__*/React.createElement(DataBlockInitializer, _objectSpread(_objectSpread({}, props), {}, {
    componentType: 'Calendar',
    icon: /*#__PURE__*/React.createElement(FormOutlined, null),
    onCreateBlockSchema: function () {
      var _onCreateBlockSchema3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref5) {
        var _collection$fields, _collection$fields$fi, _collection$fields2, _collection$fields2$f;

        var item, collection, stringFields, dateFields, values;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                item = _ref5.item;
                collection = getCollection(item.name);
                stringFields = collection === null || collection === void 0 ? void 0 : (_collection$fields = collection.fields) === null || _collection$fields === void 0 ? void 0 : (_collection$fields$fi = _collection$fields.filter(function (field) {
                  return field.type === 'string';
                })) === null || _collection$fields$fi === void 0 ? void 0 : _collection$fields$fi.map(function (field) {
                  var _field$uiSchema;

                  return {
                    label: field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title,
                    value: field.name
                  };
                });
                dateFields = collection === null || collection === void 0 ? void 0 : (_collection$fields2 = collection.fields) === null || _collection$fields2 === void 0 ? void 0 : (_collection$fields2$f = _collection$fields2.filter(function (field) {
                  return field.type === 'date';
                })) === null || _collection$fields2$f === void 0 ? void 0 : _collection$fields2$f.map(function (field) {
                  var _field$uiSchema2;

                  return {
                    label: field === null || field === void 0 ? void 0 : (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.title,
                    value: field.name
                  };
                });
                _context4.next = 6;
                return FormDialog(t('Create calendar block'), function () {
                  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread({}, options.components)
                  }, /*#__PURE__*/React.createElement(FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/React.createElement(SchemaComponent, {
                    schema: {
                      properties: {
                        title: {
                          title: t('Title field'),
                          enum: stringFields,
                          required: true,
                          'x-component': 'Select',
                          'x-decorator': 'FormItem'
                        },
                        start: {
                          title: t('Start date field'),
                          enum: dateFields,
                          required: true,
                          default: 'createdAt',
                          'x-component': 'Select',
                          'x-decorator': 'FormItem'
                        },
                        end: {
                          title: t('End date field'),
                          enum: dateFields,
                          'x-component': 'Select',
                          'x-decorator': 'FormItem'
                        }
                      }
                    }
                  })));
                }).open({
                  initialValues: {}
                });

              case 6:
                values = _context4.sent;
                insert(createCalendarBlockSchema({
                  collection: item.name,
                  fieldNames: _objectSpread({}, values)
                }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function onCreateBlockSchema(_x4) {
        return _onCreateBlockSchema3.apply(this, arguments);
      }

      return onCreateBlockSchema;
    }()
  }));
};
export var KanbanBlockInitializer = function KanbanBlockInitializer(props) {
  var insert = props.insert;

  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var _useCollectionManager4 = useCollectionManager(),
      getCollection = _useCollectionManager4.getCollection;

  var options = useContext(SchemaOptionsContext);
  var api = useAPIClient();
  return /*#__PURE__*/React.createElement(DataBlockInitializer, _objectSpread(_objectSpread({}, props), {}, {
    componentType: 'Kanban',
    icon: /*#__PURE__*/React.createElement(FormOutlined, null),
    onCreateBlockSchema: function () {
      var _onCreateBlockSchema4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
        var _collection$fields3, _collection$fields3$f, _collection$fields4;

        var item, collection, fields, values, sortName, exists;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                item = _ref6.item;
                collection = getCollection(item.name);
                fields = collection === null || collection === void 0 ? void 0 : (_collection$fields3 = collection.fields) === null || _collection$fields3 === void 0 ? void 0 : (_collection$fields3$f = _collection$fields3.filter(function (field) {
                  return ['select', 'radioGroup'].includes(field.interface);
                })) === null || _collection$fields3$f === void 0 ? void 0 : _collection$fields3$f.map(function (field) {
                  var _field$uiSchema3;

                  return {
                    label: field === null || field === void 0 ? void 0 : (_field$uiSchema3 = field.uiSchema) === null || _field$uiSchema3 === void 0 ? void 0 : _field$uiSchema3.title,
                    value: field.name,
                    uiSchema: _objectSpread(_objectSpread({}, field.uiSchema), {}, {
                      name: field.name
                    })
                  };
                });
                _context5.next = 5;
                return FormDialog(t('Create kanban block'), function () {
                  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread({}, options.components)
                  }, /*#__PURE__*/React.createElement(FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/React.createElement(SchemaComponent, {
                    schema: {
                      properties: {
                        groupField: {
                          title: t('Group field'),
                          enum: fields,
                          required: true,
                          'x-component': 'Select',
                          'x-component-props': {
                            objectValue: true,
                            fieldNames: {
                              label: 'label',
                              value: 'value'
                            }
                          },
                          'x-decorator': 'FormItem'
                        }
                      }
                    }
                  })));
                }).open({
                  initialValues: {}
                });

              case 5:
                values = _context5.sent;
                sortName = "".concat(values.groupField.value, "_sort");
                exists = collection === null || collection === void 0 ? void 0 : (_collection$fields4 = collection.fields) === null || _collection$fields4 === void 0 ? void 0 : _collection$fields4.find(function (field) {
                  return field.name === sortName;
                });

                if (exists) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 11;
                return api.resource('collections.fields', item.name).create({
                  values: {
                    type: 'sort',
                    name: sortName,
                    hidden: true,
                    scopeKey: values.groupField.value
                  }
                });

              case 11:
                insert(createKanbanBlockSchema({
                  groupField: values.groupField.value,
                  collection: item.name,
                  params: {
                    sort: [sortName],
                    paginate: false
                  }
                }));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function onCreateBlockSchema(_x5) {
        return _onCreateBlockSchema4.apply(this, arguments);
      }

      return onCreateBlockSchema;
    }()
  }));
};
export var MarkdownBlockInitializer = function MarkdownBlockInitializer(props) {
  var insert = props.insert;

  var _useTranslation3 = useTranslation(),
      t = _useTranslation3.t;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/React.createElement(FormOutlined, null),
    onClick: function onClick() {
      insert({
        type: 'void',
        'x-designer': 'Markdown.Void.Designer',
        'x-decorator': 'CardItem',
        'x-component': 'Markdown.Void',
        'x-editable': false,
        'x-component-props': {
          content: t('This is a demo text, **supports Markdown syntax**.')
        }
      });
    }
  }));
};
export var FilterActionInitializer = function FilterActionInitializer(props) {
  var schema = {
    type: 'void',
    title: '{{ t("Filter") }}',
    'x-action': 'filter',
    'x-designer': 'Filter.Action.Designer',
    'x-component': 'Filter.Action',
    'x-component-props': {
      icon: 'FilterOutlined',
      useProps: '{{ useFilterActionProps }}'
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var CreateActionInitializer = function CreateActionInitializer(props) {
  var schema = {
    type: 'void',
    title: '{{ t("Add new") }}',
    'x-action': 'create',
    'x-designer': 'Action.Designer',
    'x-component': 'Action',
    'x-component-props': {
      icon: 'PlusOutlined',
      openMode: 'drawer',
      type: 'primary'
    },
    properties: {
      drawer: {
        type: 'void',
        title: '{{ t("Add record") }}',
        'x-component': 'Action.Container',
        'x-component-props': {
          className: 'nb-action-popup'
        },
        properties: {
          grid: {
            type: 'void',
            'x-component': 'Grid',
            'x-initializer': 'CreateFormBlockInitializers',
            properties: {}
          }
        }
      }
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var ViewActionInitializer = function ViewActionInitializer(props) {
  var schema = {
    type: 'void',
    title: '{{ t("View") }}',
    'x-action': 'view',
    'x-designer': 'Action.Designer',
    'x-component': 'Action',
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
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var UpdateActionInitializer = function UpdateActionInitializer(props) {
  var schema = {
    type: 'void',
    title: '{{ t("Edit") }}',
    'x-action': 'update',
    'x-designer': 'Action.Designer',
    'x-component': 'Action',
    'x-component-props': {
      openMode: 'drawer',
      icon: 'EditOutlined'
    },
    properties: {
      drawer: {
        type: 'void',
        title: '{{ t("Edit record") }}',
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
                title: '{{t("Edit")}}',
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
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var DestroyActionInitializer = function DestroyActionInitializer(props) {
  var schema = {
    title: '{{ t("Delete") }}',
    'x-action': 'destroy',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      icon: 'DeleteOutlined',
      confirm: {
        title: "{{t('Delete record')}}",
        content: "{{t('Are you sure you want to delete it?')}}"
      },
      useProps: '{{ useDestroyActionProps }}'
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var BulkDestroyActionInitializer = function BulkDestroyActionInitializer(props) {
  var schema = {
    title: '{{ t("Delete") }}',
    'x-action': 'destroy',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      icon: 'DeleteOutlined',
      confirm: {
        title: "{{t('Delete record')}}",
        content: "{{t('Are you sure you want to delete it?')}}"
      },
      useProps: '{{ useBulkDestroyActionProps }}'
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var SubmitActionInitializer = function SubmitActionInitializer(props) {
  var schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit' // useProps: '{{ bp.useSubmitActionProps }}',

    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var CreateSubmitActionInitializer = function CreateSubmitActionInitializer(props) {
  var schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit',
      useProps: '{{ useCreateActionProps }}'
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var UpdateSubmitActionInitializer = function UpdateSubmitActionInitializer(props) {
  var schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit',
      useProps: '{{ useUpdateActionProps }}'
    }
  };
  return /*#__PURE__*/React.createElement(ActionInitializer, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema
  }));
};
export var CreateFormBlockInitializer = function CreateFormBlockInitializer(props) {
  var onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded2);

  var _useSchemaTemplateMan2 = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan2.getTemplateSchemaByMode;

  var association = useBlockAssociationContext();
  var collection = useCollection();
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(FormOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref7) {
        var item, s, blockSchema;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                item = _ref7.item;

                if (!item.template) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 4;
                return getTemplateSchemaByMode(item);

              case 4:
                s = _context6.sent;

                if (item.template.componentName === 'FormItem') {
                  blockSchema = createFormBlockSchema({
                    actionInitializers: 'CreateFormActionInitializers',
                    association: association,
                    collection: collection.name,
                    template: s
                  });

                  if (item.mode === 'reference') {
                    blockSchema['x-template-key'] = item.template.key;
                  }

                  insert(blockSchema);
                } else {
                  insert(s);
                }

                _context6.next = 9;
                break;

              case 8:
                insert(createFormBlockSchema({
                  actionInitializers: 'CreateFormActionInitializers',
                  association: association,
                  collection: collection.name
                }));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function onClick(_x6) {
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }(),
    items: useRecordCollectionDataSourceItems('FormItem')
  }));
};
export var RecordFormBlockInitializer = function RecordFormBlockInitializer(props) {
  var onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded3);

  var _useSchemaTemplateMan3 = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan3.getTemplateSchemaByMode;

  var collection = useCollection();
  var association = useBlockAssociationContext();
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(FormOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref8) {
        var item, s, blockSchema;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                item = _ref8.item;

                if (!item.template) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 4;
                return getTemplateSchemaByMode(item);

              case 4:
                s = _context7.sent;

                if (item.template.componentName === 'FormItem') {
                  blockSchema = createFormBlockSchema({
                    association: association,
                    collection: collection.name,
                    action: 'get',
                    useSourceId: '{{ useSourceIdFromParentRecord }}',
                    useParams: '{{ useParamsFromRecord }}',
                    actionInitializers: 'UpdateFormActionInitializers',
                    template: s
                  });

                  if (item.mode === 'reference') {
                    blockSchema['x-template-key'] = item.template.key;
                  }

                  insert(blockSchema);
                } else {
                  insert(s);
                }

                _context7.next = 9;
                break;

              case 8:
                insert(createFormBlockSchema({
                  association: association,
                  collection: collection.name,
                  action: 'get',
                  useSourceId: '{{ useSourceIdFromParentRecord }}',
                  useParams: '{{ useParamsFromRecord }}',
                  actionInitializers: 'UpdateFormActionInitializers'
                }));

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function onClick(_x7) {
        return _onClick3.apply(this, arguments);
      }

      return onClick;
    }(),
    items: useRecordCollectionDataSourceItems('FormItem')
  }));
};
export var RecordReadPrettyFormBlockInitializer = function RecordReadPrettyFormBlockInitializer(props) {
  var onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded4);

  var _useSchemaTemplateMan4 = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan4.getTemplateSchemaByMode;

  var collection = useCollection();
  var association = useBlockAssociationContext();
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(FormOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref9) {
        var item, s, blockSchema;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                item = _ref9.item;

                if (!item.template) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 4;
                return getTemplateSchemaByMode(item);

              case 4:
                s = _context8.sent;

                if (item.template.componentName === 'ReadPrettyFormItem') {
                  blockSchema = createReadPrettyFormBlockSchema({
                    association: association,
                    collection: collection.name,
                    action: 'get',
                    useSourceId: '{{ useSourceIdFromParentRecord }}',
                    useParams: '{{ useParamsFromRecord }}',
                    template: s
                  });

                  if (item.mode === 'reference') {
                    blockSchema['x-template-key'] = item.template.key;
                  }

                  insert(blockSchema);
                } else {
                  insert(s);
                }

                _context8.next = 9;
                break;

              case 8:
                insert(createReadPrettyFormBlockSchema({
                  association: association,
                  collection: collection.name,
                  action: 'get',
                  useSourceId: '{{ useSourceIdFromParentRecord }}',
                  useParams: '{{ useParamsFromRecord }}'
                }));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function onClick(_x8) {
        return _onClick4.apply(this, arguments);
      }

      return onClick;
    }(),
    items: useRecordCollectionDataSourceItems('ReadPrettyFormItem')
  }));
};
export var RecordAssociationBlockInitializer = function RecordAssociationBlockInitializer(props) {
  var item = props.item,
      onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded5);

  var _useSchemaTemplateMan5 = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan5.getTemplateSchemaByMode;

  var _useCollectionManager5 = useCollectionManager(),
      getCollection = _useCollectionManager5.getCollection;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(TableOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref10) {
        var item, field, collection;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                item = _ref10.item;
                console.log('RecordAssociationBlockInitializer', item);
                field = item.field;
                collection = getCollection(field.target);
                insert(createTableBlockSchema({
                  rowKey: collection.filterTargetKey,
                  collection: field.target,
                  resource: "".concat(field.collectionName, ".").concat(field.name),
                  association: "".concat(field.collectionName, ".").concat(field.name)
                })); // if (item.template) {
                //   const s = await getTemplateSchemaByMode(item);
                //   insert(s);
                // } else {
                //   insert(createTableBlockSchema({ collection: item.name }));
                // }

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function onClick(_x9) {
        return _onClick5.apply(this, arguments);
      }

      return onClick;
    }()
  }));
};
export var TableActionColumnInitializer = function TableActionColumnInitializer(props) {
  var schema = {
    type: 'void',
    title: '{{ t("Actions") }}',
    'x-decorator': 'TableV2.Column.ActionBar',
    'x-component': 'TableV2.Column',
    'x-designer': 'TableV2.ActionColumnDesigner',
    'x-initializer': 'TableActionColumnInitializers',
    'x-action-column': 'actions',
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
  };
  return /*#__PURE__*/React.createElement(InitializerWithSwitch, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema,
    type: 'x-action-column'
  }));
};
export var TableCollectionFieldInitializer = function TableCollectionFieldInitializer(props) {
  var schema = {};
  return /*#__PURE__*/React.createElement(InitializerWithSwitch, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema,
    type: 'x-collection-field'
  }));
};
export var CollectionFieldInitializer = function CollectionFieldInitializer(props) {
  var schema = {};
  return /*#__PURE__*/React.createElement(InitializerWithSwitch, _objectSpread(_objectSpread({}, props), {}, {
    schema: schema,
    type: 'x-collection-field'
  }));
};
export var TableSelectorInitializer = function TableSelectorInitializer(props) {
  var onCreateBlockSchema = props.onCreateBlockSchema,
      componentType = props.componentType,
      createBlockSchema = props.createBlockSchema,
      insert = props.insert,
      others = _objectWithoutProperties(props, _excluded6);

  var _useSchemaTemplateMan6 = useSchemaTemplateManager(),
      getTemplateSchemaByMode = _useSchemaTemplateMan6.getTemplateSchemaByMode;

  var collection = useCollection();
  return /*#__PURE__*/React.createElement(SchemaInitializer.Item, _objectSpread(_objectSpread({
    icon: /*#__PURE__*/React.createElement(FormOutlined, null)
  }, others), {}, {
    onClick: function () {
      var _onClick6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref11) {
        var item, field;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                item = _ref11.item;
                field = item.field;
                insert(createTableSelectorSchema({
                  rowKey: collection.filterTargetKey,
                  collection: collection.name,
                  resource: collection.name
                }));

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function onClick(_x10) {
        return _onClick6.apply(this, arguments);
      }

      return onClick;
    }()
  }));
};