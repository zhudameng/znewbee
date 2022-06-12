function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { triggers } from '../triggers';
import { executionSchema } from './executions';
var collection = {
  name: 'workflows',
  fields: [{
    type: 'string',
    name: 'title',
    interface: 'input',
    uiSchema: {
      title: '{{t("Name")}}',
      type: 'string',
      'x-component': 'Input',
      required: true
    }
  }, {
    type: 'string',
    name: 'type',
    interface: 'select',
    uiSchema: {
      title: '{{t("Trigger type")}}',
      type: 'string',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      enum: Array.from(triggers.getEntities()).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            title = _ref2[1].title;

        return {
          value: value,
          label: title
        };
      }),
      required: true
    }
  }, {
    type: 'string',
    name: 'description',
    interface: 'textarea',
    uiSchema: {
      title: '{{t("Description")}}',
      type: 'string',
      'x-component': 'Input.TextArea'
    }
  }, {
    type: 'boolean',
    name: 'enabled',
    interface: 'radio',
    uiSchema: {
      title: '{{t("Status")}}',
      type: 'string',
      enum: [{
        label: '{{t("Started")}}',
        value: true
      }, {
        label: '{{t("Stopped")}}',
        value: false
      }],
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      default: false
    }
  }]
};
export var workflowSchema = {
  type: 'object',
  properties: {
    provider: {
      type: 'void',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection: collection,
        resourceName: 'workflows',
        request: {
          resource: 'workflows',
          action: 'list',
          params: {
            pageSize: 50,
            filter: {
              current: true
            },
            sort: ['createdAt'],
            except: ['config']
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
              title: '{{t("Delete")}}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ cm.useBulkDestroyAction }}',
                confirm: {
                  title: "{{t('Delete record')}}",
                  content: "{{t('Are you sure you want to delete it?')}}"
                }
              }
            },
            create: {
              type: 'void',
              title: '{{t("Add new")}}',
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
                    initialValue: {
                      current: true
                    }
                  },
                  title: '{{t("Add new")}}',
                  properties: {
                    title: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    type: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    description: {
                      'x-component': 'CollectionField',
                      'x-decorator': 'FormItem'
                    },
                    footer: {
                      type: 'void',
                      'x-component': 'Action.Drawer.Footer',
                      properties: {
                        cancel: {
                          title: '{{ t("Cancel") }}',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ cm.useCancelAction }}'
                          }
                        },
                        submit: {
                          title: '{{ t("Submit") }}',
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
          'x-component': 'Table.Void',
          'x-component-props': {
            rowKey: 'id',
            rowSelection: {
              type: 'checkbox'
            },
            useDataSource: '{{ cm.useDataSourceFromRAC }}'
          },
          properties: {
            title: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                title: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true
                }
              }
            },
            type: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                type: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true
                }
              }
            },
            enabled: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                enabled: {
                  type: 'boolean',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                  default: false
                }
              }
            },
            actions: {
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
                    config: {
                      type: 'void',
                      'x-component': 'WorkflowLink'
                    },
                    executions: {
                      type: 'void',
                      title: '{{t("Execution History")}}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        type: 'primary'
                      },
                      properties: {
                        drawer: {
                          type: 'void',
                          title: '{{t("Execution History")}}',
                          'x-component': 'Action.Drawer',
                          properties: executionSchema
                        }
                      }
                    },
                    update: {
                      type: 'void',
                      title: '{{ t("Edit") }}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        type: 'primary'
                      },
                      properties: {
                        modal: {
                          type: 'void',
                          'x-component': 'Action.Modal',
                          'x-decorator': 'Form',
                          'x-decorator-props': {
                            useValues: '{{ cm.useValuesFromRecord }}'
                          },
                          title: '{{ t("Edit") }}',
                          properties: {
                            title: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem'
                            },
                            enabled: {
                              'x-component': 'CollectionField',
                              'x-decorator': 'FormItem'
                            },
                            footer: {
                              type: 'void',
                              'x-component': 'Action.Modal.Footer',
                              properties: {
                                cancel: {
                                  title: '{{ t("Cancel") }}',
                                  'x-component': 'Action',
                                  'x-component-props': {
                                    useAction: '{{ cm.useCancelAction }}'
                                  }
                                },
                                submit: {
                                  title: '{{ t("Submit") }}',
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
                    } // delete: {
                    //   type: 'void',
                    //   title: '{{ t("Delete") }}',
                    //   'x-component': 'Action.Link',
                    //   'x-component-props': {
                    //     confirm: {
                    //       title: "{{t('Delete record')}}",
                    //       content: "{{t('Are you sure you want to delete it?')}}",
                    //     },
                    //     useAction: '{{ cm.useDestroyActionAndRefreshCM }}',
                    //   },
                    // },

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