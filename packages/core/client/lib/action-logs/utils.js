"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = void 0;

var _shared = require("@formily/shared");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createSchema = function createSchema() {
  var filterSchema = {
    'x-component': 'Action',
    'x-component-props': {
      popover: true
    },
    type: 'void',
    title: '{{t("Filter")}}',
    properties: {
      popover: {
        type: 'void',
        'x-decorator': 'Form',
        'x-decorator-props': {},
        'x-component': 'Action.Popover',
        'x-component-props': {
          trigger: 'click',
          placement: 'bottomLeft'
        },
        properties: {
          filter: {
            type: 'object',
            default: {
              $and: [{}]
            },
            'x-component': 'Filter',
            'x-component-props': {
              useDataSource: '{{cm.useFilterDataSource}}'
            }
          },
          footer: {
            type: 'void',
            'x-component': 'Action.Popover.Footer',
            properties: {
              actions: {
                type: 'void',
                'x-component': 'ActionBar',
                properties: {
                  saveDefault: {
                    type: 'void',
                    'x-component': 'Filter.SaveDefaultValue',
                    'x-component-props': {}
                  },
                  cancel: {
                    type: 'void',
                    title: '{{t("Cancel")}}',
                    'x-component': 'Action',
                    'x-component-props': {
                      useAction: '{{cm.useCancelFilterAction}}'
                    }
                  },
                  submit: {
                    type: 'void',
                    title: '{{t("Submit")}}',
                    'x-component': 'Action',
                    'x-component-props': {
                      type: 'primary',
                      useAction: '{{cm.useFilterAction}}'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  var schema = {
    type: 'void',
    name: 'actionLog',
    'x-decorator': 'ResourceActionProvider',
    'x-decorator-props': {
      collection: 'action_logs',
      dragSort: false,
      request: {
        resource: 'action_logs',
        action: 'list',
        params: {
          pageSize: 20,
          filter: {},
          appends: []
        }
      }
    },
    'x-designer': 'ActionLog.Designer',
    'x-component': 'CardItem',
    properties: {
      actions: {
        type: 'void',
        'x-component': 'ActionBar',
        'x-component-props': {
          layout: 'one-column',
          style: {
            marginBottom: 16
          }
        },
        properties: _defineProperty({}, (0, _shared.uid)(), _objectSpread({}, filterSchema))
      },
      table: {
        type: 'void',
        'x-component': 'Table.Void',
        'x-component-props': {
          rowKey: 'id',
          useDataSource: '{{cm.useDataSourceFromRAC}}'
        },
        properties: _defineProperty({
          column1: {
            type: 'void',
            title: "{{t('Created at')}}",
            'x-component': 'Table.Column',
            properties: {
              created_at: {
                type: 'string',
                'x-component': 'DatePicker',
                'x-read-pretty': true,
                'x-component-props': {
                  format: 'YYYY-MM-DD HH:mm:ss'
                }
              }
            }
          },
          column2: {
            type: 'void',
            title: "{{t('Created by')}}",
            'x-component': 'Table.Column',
            properties: {
              'user.nickname': {
                type: 'string',
                'x-component': 'Input',
                'x-read-pretty': true
              }
            }
          },
          column3: {
            type: 'void',
            title: "{{t('Collection display name')}}",
            'x-component': 'Table.Column',
            properties: {
              'collection.title': {
                type: 'string',
                'x-component': 'Input',
                'x-read-pretty': true
              }
            }
          },
          column4: {
            type: 'void',
            title: "{{t('Action type')}}",
            'x-component': 'Table.Column',
            properties: {
              type: {
                type: 'string',
                'x-component': 'Select',
                'x-read-pretty': true,
                enum: [{
                  label: "{{ t('Insert') }}",
                  value: 'create',
                  color: 'green'
                }, {
                  label: "{{ t('Update') }}",
                  value: 'update',
                  color: 'blue'
                }, {
                  label: "{{ t('Delete') }}",
                  value: 'destroy',
                  color: 'red'
                }]
              }
            }
          }
        }, (0, _shared.uid)(), {
          type: 'void',
          title: "{{t('Actions')}}",
          'x-component': 'Table.Column',
          'x-component-props': {
            width: 60,
            align: 'center'
          },
          properties: _defineProperty({}, (0, _shared.uid)(), {
            title: '{{ t("View") }}',
            type: 'void',
            'x-action': 'view',
            'x-component': 'Action.Link',
            'x-component-props': {
              openMode: 'drawer'
            },
            properties: {
              drawer: {
                type: 'void',
                'x-component': 'Action.Container',
                'x-component-props': {
                  className: 'nb-action-popup'
                },
                title: '{{ t("View record") }}',
                properties: {
                  created_at: {
                    type: 'string',
                    title: "{{t('Created at')}}",
                    'x-decorator': 'FormItem',
                    'x-component': 'DatePicker',
                    'x-read-pretty': true,
                    'x-component-props': {
                      format: 'YYYY-MM-DD HH:mm:ss'
                    }
                  },
                  'user.nickname': {
                    type: 'string',
                    title: "{{t('Created by')}}",
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-read-pretty': true
                  },
                  'collection.title': {
                    type: 'string',
                    title: "{{t('Collection display name')}}",
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-read-pretty': true
                  },
                  type: {
                    type: 'string',
                    title: "{{t('Action type')}}",
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-read-pretty': true,
                    enum: [{
                      label: "{{t('Insert')}}",
                      value: 'create',
                      color: 'green'
                    }, {
                      label: "{{t('Update')}}",
                      value: 'update',
                      color: 'green'
                    }, {
                      label: "{{t('Delete')}}",
                      value: 'destroy',
                      color: 'red'
                    }]
                  },
                  changes: {
                    type: 'array',
                    title: "{{t('Data changes')}}",
                    'x-decorator': 'FormItem',
                    'x-component': 'Table.Array',
                    'x-component-props': {
                      pagination: false,
                      showIndex: true
                    },
                    items: {
                      type: 'object',
                      properties: {
                        column1: {
                          type: 'void',
                          'x-component': 'Table.Column',
                          'x-component-props': {
                            title: "{{t('Field display name')}}"
                          },
                          properties: {
                            field: {
                              type: 'string',
                              'x-decorator': 'FormilyFormItem',
                              'x-component': 'ActionLog.Field'
                            }
                          }
                        },
                        column2: {
                          type: 'void',
                          'x-component': 'Table.Column',
                          'x-component-props': {
                            title: "{{ t('Before change') }}"
                          },
                          properties: {
                            before: {
                              type: 'string',
                              'x-decorator': 'FormilyFormItem',
                              'x-component': 'ActionLog.FieldValue'
                            }
                          }
                        },
                        column3: {
                          type: 'void',
                          'x-component': 'Table.Column',
                          'x-component-props': {
                            title: "{{ t('After change') }}"
                          },
                          properties: {
                            after: {
                              type: 'string',
                              'x-decorator': 'FormilyFormItem',
                              'x-component': 'ActionLog.FieldValue'
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
        })
      }
    }
  };
  return schema;
};

exports.createSchema = createSchema;