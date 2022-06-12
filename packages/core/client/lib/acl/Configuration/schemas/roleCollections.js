"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleCollectionsSchema = void 0;

var _useRoleResourceValues = require("./useRoleResourceValues");

var _useSaveRoleResourceAction = require("./useSaveRoleResourceAction");

var collection = {
  name: 'collections',
  targetKey: 'name',
  filterTargetKey: 'name',
  fields: [{
    type: 'integer',
    name: 'title',
    interface: 'input',
    uiSchema: {
      title: '{{t("Collection display name")}}',
      type: 'number',
      'x-component': 'Input',
      required: true
    }
  }, // {
  //   type: 'string',
  //   name: 'name',
  //   interface: 'input',
  //   uiSchema: {
  //     title: '数据表标识',
  //     type: 'string',
  //     'x-component': 'Input',
  //     description: '使用英文',
  //   } as ISchema,
  // },
  {
    type: 'string',
    name: 'usingConfig',
    interface: 'input',
    uiSchema: {
      title: '{{t("Permission policy")}}',
      type: 'string',
      'x-component': 'Select',
      enum: [{
        label: '{{t("Individual")}}',
        value: 'resourceAction',
        color: 'orange'
      }, {
        label: '{{t("General")}}',
        value: 'strategy',
        color: 'default'
      }]
    }
  }, {
    type: 'hasMany',
    name: 'fields',
    target: 'fields',
    collectionName: 'collections',
    sourceKey: 'name',
    targetKey: 'name',
    uiSchema: {}
  }]
};
var roleCollectionsSchema = {
  type: 'void',
  'x-decorator': 'ResourceActionProvider',
  'x-decorator-props': {
    collection: collection,
    association: {
      sourceKey: 'name',
      targetKey: 'name'
    },
    resourceName: 'roles.collections',
    request: {
      resource: 'roles.collections',
      action: 'list',
      params: {
        pageSize: 20,
        filter: {
          inherit: false
        },
        sort: ['sort'],
        appends: []
      }
    }
  },
  properties: {
    table1: {
      type: 'void',
      'x-uid': 'input',
      'x-component': 'Table.Void',
      'x-component-props': {
        rowKey: 'name',
        // rowSelection: {
        //   type: 'checkbox',
        // },
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
            usingConfig: {
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
                configure: {
                  type: 'void',
                  title: '{{t("Configure")}}',
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
                        useValues: _useRoleResourceValues.useRoleResourceValues
                      },
                      title: '{{t("Configure permission")}}',
                      properties: {
                        usingActionsConfig: {
                          title: '{{t("Permission policy")}}',
                          'x-component': 'Radio.Group',
                          'x-decorator': 'FormItem',
                          default: false,
                          enum: [{
                            value: false,
                            label: '{{t("General")}}'
                          }, {
                            value: true,
                            label: '{{t("Individual")}}'
                          }],
                          'x-reactions': {
                            target: 'actions',
                            fulfill: {
                              state: {
                                hidden: '{{!$self.value}}'
                              }
                            }
                          }
                        },
                        actions: {
                          'x-component': 'RolesResourcesActions',
                          'x-decorator': 'FormItem'
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
                                useAction: _useSaveRoleResourceAction.useSaveRoleResourceAction
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
        }
      }
    }
  }
};
exports.roleCollectionsSchema = roleCollectionsSchema;