"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageSchema = void 0;

var _shared = require("@formily/shared");

var _apiClient = require("../../api-client");

var _schemaComponent = require("../../schema-component");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var collection = {
  name: 'storages',
  fields: [{
    type: 'integer',
    name: 'title',
    interface: 'input',
    uiSchema: {
      title: '{{t("Storage display name")}}',
      type: 'string',
      'x-component': 'Input',
      required: true
    }
  }, {
    type: 'string',
    name: 'name',
    interface: 'input',
    uiSchema: {
      title: '{{t("Storage name")}}',
      type: 'string',
      'x-component': 'Input'
    }
  }, {
    type: 'string',
    name: 'type',
    interface: 'select',
    uiSchema: {
      title: '{{t("Storage type")}}',
      type: 'string',
      'x-component': 'Select',
      required: true,
      enum: [{
        label: '{{t("Local storage")}}',
        value: 'local'
      }, {
        label: '{{t("Aliyun OSS")}}',
        value: 'ali-oss'
      }, {
        label: '{{t("Amazon S3")}}',
        value: 's3'
      }]
    }
  }, {
    type: 'string',
    name: 'baseUrl',
    interface: 'input',
    uiSchema: {
      title: '{{t("Storage base URL")}}',
      type: 'string',
      'x-component': 'Input'
    }
  }, {
    type: 'boolean',
    name: 'default',
    interface: 'boolean',
    uiSchema: {
      title: '{{t("Default storage")}}',
      type: 'boolean',
      'x-component': 'Checkbox'
    }
  }]
};
var storageSchema = {
  type: 'object',
  properties: {
    block1: {
      type: 'void',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection: collection,
        resourceName: 'storages',
        request: {
          resource: 'storages',
          action: 'list',
          params: {
            pageSize: 50,
            sort: ['id'],
            appends: []
          }
        }
      },
      'x-component': 'CollectionProvider',
      'x-component-props': {
        collection: collection
      },
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 16
            }
          },
          properties: {
            delete: {
              type: 'void',
              title: '{{ t("Delete") }}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ cm.useBulkDestroyAction }}',
                confirm: {
                  title: "{{t('Delete storage')}}",
                  content: "{{t('Are you sure you want to delete it?')}}"
                }
              }
            },
            create: {
              type: 'void',
              title: '{{t("Add storage")}}',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary'
              },
              properties: {
                drawer: {
                  type: 'void',
                  'x-component': 'Action.Drawer',
                  'x-decorator': 'Form',
                  'x-decorator-props': {
                    useValues: function useValues(options) {
                      var ctx = (0, _schemaComponent.useActionContext)();
                      return (0, _apiClient.useRequest)(function () {
                        return Promise.resolve({
                          data: {
                            name: "s_".concat((0, _shared.uid)())
                          }
                        });
                      }, _objectSpread(_objectSpread({}, options), {}, {
                        refreshDeps: [ctx.visible]
                      }));
                    }
                  },
                  title: '{{t("Add storage")}}',
                  properties: {
                    title: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    name: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem',
                      description: '{{t("Randomly generated and can be modified. Support letters, numbers and underscores, must start with an letter.")}}'
                    },
                    baseUrl: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    type: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    options: {
                      type: 'object',
                      'x-component': 'StorageOptions'
                    },
                    default: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem',
                      title: '',
                      'x-content': '{{t("Default storage")}}'
                    },
                    footer: {
                      type: 'void',
                      'x-component': 'Action.Drawer.Footer',
                      properties: {
                        cancel: {
                          title: '{{t("Cancel")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ cm.useCancelAction }}'
                          }
                        },
                        submit: {
                          title: '{{t("Submit")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            type: 'primary',
                            useAction: '{{ cm.useCreateAction }}'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        table: {
          type: 'void',
          'x-uid': 'input',
          'x-component': 'Table.Void',
          'x-component-props': {
            rowKey: 'id',
            rowSelection: {
              type: 'checkbox'
            },
            useDataSource: '{{ cm.useDataSourceFromRAC }}'
          },
          properties: {
            column1: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                title: {
                  type: 'number',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true
                }
              }
            },
            column2: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                name: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true
                }
              }
            },
            column3: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                default: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true
                }
              }
            },
            column4: {
              type: 'void',
              title: '{{t("Actions")}}',
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
                      title: '{{t("Edit")}}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        type: 'primary'
                      },
                      properties: {
                        drawer: {
                          type: 'void',
                          'x-component': 'Action.Drawer',
                          'x-decorator': 'Form',
                          'x-decorator-props': {
                            useValues: '{{ cm.useValuesFromRecord }}'
                          },
                          title: '{{t("Edit storage")}}',
                          properties: {
                            title: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem'
                            },
                            name: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem',
                              'x-disabled': true
                            },
                            baseUrl: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem'
                            },
                            type: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem',
                              'x-disabled': true
                            },
                            options: {
                              type: 'object',
                              'x-component': 'StorageOptions'
                            },
                            default: {
                              title: '',
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem',
                              'x-content': '{{t("Default storage")}}'
                            },
                            footer: {
                              type: 'void',
                              'x-component': 'Action.Drawer.Footer',
                              properties: {
                                cancel: {
                                  title: '{{t("Cancel")}}',
                                  'x-component': 'Action',
                                  'x-component-props': {
                                    useAction: '{{ cm.useCancelAction }}'
                                  }
                                },
                                submit: {
                                  title: '{{t("Submit")}}',
                                  'x-component': 'Action',
                                  'x-component-props': {
                                    type: 'primary',
                                    useAction: '{{ cm.useUpdateAction }}'
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    delete: {
                      type: 'void',
                      title: '{{ t("Delete") }}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        confirm: {
                          title: "{{t('Delete role')}}",
                          content: "{{t('Are you sure you want to delete it?')}}"
                        },
                        useAction: '{{cm.useDestroyAction}}'
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
  }
};
exports.storageSchema = storageSchema;