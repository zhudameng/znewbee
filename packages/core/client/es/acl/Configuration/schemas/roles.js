function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { uid } from '@formily/shared';
import { useRequest } from '../../../api-client';
import { useActionContext } from '../../../schema-component';
import { roleCollectionsSchema } from './roleCollections';
var collection = {
  name: 'roles',
  filterTargetKey: 'name',
  targetKey: 'name',
  fields: [{
    type: 'integer',
    name: 'title',
    interface: 'input',
    uiSchema: {
      title: '{{t("Role display name")}}',
      type: 'number',
      'x-component': 'Input',
      required: true
    }
  }, {
    type: 'string',
    name: 'name',
    interface: 'input',
    uiSchema: {
      title: '{{t("Role UID")}}',
      type: 'string',
      'x-component': 'Input'
    }
  }, {
    type: 'boolean',
    name: 'default',
    interface: 'boolean',
    uiSchema: {
      title: '{{t("Default role")}}',
      type: 'boolean',
      'x-component': 'Checkbox'
    }
  }]
};
export var roleSchema = {
  type: 'object',
  properties: {
    block1: {
      type: 'void',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection: collection,
        resourceName: 'roles',
        request: {
          resource: 'roles',
          action: 'list',
          params: {
            pageSize: 50,
            filter: {
              'name.$ne': 'root'
            },
            showAnonymous: true,
            sort: ['createdAt'],
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
                  title: "{{t('Delete role')}}",
                  content: "{{t('Are you sure you want to delete it?')}}"
                }
              }
            },
            create: {
              type: 'void',
              title: '{{t("Add role")}}',
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
                      var ctx = useActionContext();
                      return useRequest(function () {
                        return Promise.resolve({
                          data: {
                            name: "r_".concat(uid())
                          }
                        });
                      }, _objectSpread(_objectSpread({}, options), {}, {
                        refreshDeps: [ctx.visible]
                      }));
                    }
                  },
                  title: '{{t("Add role")}}',
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
                    default: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem',
                      title: '',
                      'x-content': '{{t("Default role")}}'
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
            rowKey: 'name',
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
                    view: {
                      type: 'void',
                      title: '{{t("Configure")}}',
                      'x-component': 'Action.Link',
                      'x-component-props': {},
                      properties: {
                        drawer: {
                          type: 'void',
                          'x-component': 'Action.Drawer',
                          title: '{{t("Configure permissions")}}',
                          properties: {
                            tabs1: {
                              type: 'void',
                              'x-component': 'Tabs',
                              'x-component-props': {},
                              properties: {
                                tab1: {
                                  type: 'void',
                                  title: '{{t("General permissions")}}',
                                  'x-component': 'Tabs.TabPane',
                                  'x-component-props': {},
                                  properties: {
                                    role: {
                                      'x-component': 'RoleConfigure'
                                    }
                                  }
                                },
                                tab2: {
                                  type: 'void',
                                  title: '{{t("Action permissions")}}',
                                  'x-component': 'Tabs.TabPane',
                                  'x-component-props': {},
                                  properties: {
                                    roleCollectionsSchema: roleCollectionsSchema
                                  }
                                },
                                tab3: {
                                  type: 'void',
                                  title: '{{t("Menu permissions")}}',
                                  'x-component': 'Tabs.TabPane',
                                  'x-component-props': {},
                                  properties: {
                                    menu: {
                                      'x-component': 'MenuConfigure'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
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
                          title: '{{t("Edit role")}}',
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
                            default: {
                              title: '',
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem',
                              'x-content': '{{t("Default role")}}'
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