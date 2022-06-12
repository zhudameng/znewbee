"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subTable = void 0;

var _shared = require("@formily/shared");

var _properties2 = require("./properties");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var subTable = {
  name: 'subTable',
  type: 'object',
  group: 'relation',
  order: 2,
  title: '{{t("Sub-table")}}',
  isAssociation: true,
  default: {
    type: 'hasMany',
    // name,
    uiSchema: {
      type: 'void',
      // title,
      'x-component': 'TableField',
      'x-component-props': {}
    }
  },
  schemaInitialize: function schemaInitialize(schema, _ref) {
    var field = _ref.field,
        readPretty = _ref.readPretty;
    var association = "".concat(field.collectionName, ".").concat(field.name);
    schema['type'] = 'void';
    schema['x-component'] = 'TableField';
    schema['properties'] = {
      block: {
        type: 'void',
        'x-decorator': 'TableFieldProvider',
        'x-decorator-props': {
          collection: field.target,
          association: association,
          resource: association,
          action: 'list',
          params: {
            paginate: false
          },
          showIndex: true,
          dragSort: false
        },
        properties: _defineProperty({
          actions: {
            type: 'void',
            'x-initializer': 'SubTableActionInitializers',
            'x-component': 'TableField.ActionBar',
            'x-component-props': {}
          }
        }, field.name, {
          type: 'array',
          'x-initializer': 'TableColumnInitializers',
          'x-component': 'TableV2',
          'x-component-props': {
            rowSelection: {
              type: 'checkbox'
            },
            useProps: '{{ useTableFieldProps }}'
          }
        })
      }
    };
  },
  initialize: function initialize(values) {
    if (!values.target) {
      values.target = "t_".concat((0, _shared.uid)());
    }

    if (!values.foreignKey) {
      values.foreignKey = "f_".concat((0, _shared.uid)());
    }
  },
  properties: _objectSpread(_objectSpread({}, _properties2.defaultProps), {}, {
    subtable: {
      type: 'void',
      'x-component': 'SubFieldDataSourceProvider',
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {// style: {
            //   marginBottom: 16,
            // },
          },
          properties: {
            delete: {
              type: 'void',
              title: '{{ t("Delete") }}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ ds.useBulkDestroyAction }}',
                confirm: {
                  title: "{{t('Delete record')}}",
                  content: "{{t('Are you sure you want to delete it?')}}"
                }
              }
            },
            create: {
              type: 'void',
              title: '{{ t("Add new") }}',
              'x-component': 'AddSubFieldAction',
              'x-component-props': {
                type: 'primary'
              }
            }
          }
        },
        children: {
          type: 'array',
          title: '{{t("Fields")}}',
          'x-decorator': 'FormItem',
          'x-component': 'Table.Array',
          'x-component-props': {
            pagination: false,
            expandable: {
              childrenColumnName: '__nochildren__'
            },
            rowKey: 'name',
            rowSelection: {
              type: 'checkbox'
            },
            useSelectedRowKeys: '{{ ds.useSelectedRowKeys }}',
            useDataSource: '{{ ds.useDataSource }}' // scroll: { x: '100%' },

          },
          properties: {
            column1: {
              type: 'void',
              title: '{{ t("Field display name") }}',
              'x-component': 'Table.Column',
              properties: {
                'uiSchema.title': {
                  type: 'number',
                  'x-component': 'Input',
                  'x-read-pretty': true
                }
              }
            },
            column2: {
              type: 'void',
              title: '{{ t("Field name") }}',
              'x-component': 'Table.Column',
              properties: {
                name: {
                  'x-component': 'Input',
                  'x-read-pretty': true
                }
              }
            },
            column3: {
              type: 'void',
              title: '{{ t("Field interface") }}',
              'x-component': 'Table.Column',
              properties: {
                interface: {
                  'x-component': 'Input',
                  'x-read-pretty': true
                }
              }
            },
            column4: {
              type: 'void',
              title: '{{ t("Actions") }}',
              'x-component': 'Table.Column',
              properties: {
                actions: {
                  type: 'void',
                  'x-component': 'Space',
                  'x-component-props': {
                    split: '|'
                  },
                  properties: {
                    update: {
                      type: 'void',
                      title: '{{ t("Edit") }}',
                      'x-component': 'EditSubFieldAction',
                      'x-component-props': {// useAction: '{{ ds.useUpdateAction }}',
                      }
                    },
                    delete: {
                      type: 'void',
                      title: '{{ t("Delete") }}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        useAction: '{{ ds.useDestroyAction }}',
                        confirm: {
                          title: "{{t('Delete record')}}",
                          content: "{{t('Are you sure you want to delete it?')}}"
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
    } // children: {
    //   type: 'array',
    //   title: '{{t("Sub-table fields")}}',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'DatabaseField',
    // },

  })
};
exports.subTable = subTable;