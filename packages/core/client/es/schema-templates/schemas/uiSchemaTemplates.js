function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { uid } from '@formily/shared';
import { useUpdateActionProps } from '../../block-provider/hooks';
import { useSchemaTemplateManager } from '../SchemaTemplateManagerProvider';

var useUpdateSchemaTemplateActionProps = function useUpdateSchemaTemplateActionProps() {
  var props = useUpdateActionProps();

  var _useSchemaTemplateMan = useSchemaTemplateManager(),
      refresh = _useSchemaTemplateMan.refresh;

  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return props.onClick();

              case 2:
                refresh();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

export var uiSchemaTemplatesSchema = {
  type: 'object',
  properties: _defineProperty({}, uid(), {
    type: 'void',
    'x-decorator': 'TableBlockProvider',
    'x-decorator-props': {
      collection: 'uiSchemaTemplates',
      resource: 'uiSchemaTemplates',
      action: 'list',
      params: {
        pageSize: 20,
        appends: ['collection'],
        sort: ['-createdAt']
      },
      rowKey: 'key',
      showIndex: true,
      dragSort: false
    },
    'x-component': 'CardItem',
    properties: _defineProperty({
      actions: {
        type: 'void',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 16
          }
        },
        properties: {
          destroy: {
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
          }
        }
      }
    }, uid(), {
      type: 'array',
      'x-component': 'TableV2',
      'x-component-props': {
        rowSelection: {
          type: 'checkbox'
        },
        useProps: '{{ useTableBlockProps }}'
      },
      properties: {
        actions: {
          type: 'void',
          title: '{{ t("Actions") }}',
          'x-component': 'TableV2.Column',
          properties: {
            actions: {
              type: 'void',
              'x-decorator': 'DndContext',
              'x-component': 'Space',
              'x-component-props': {
                split: '|'
              },
              properties: {
                // view: {
                //   title: '{{ t("View") }}',
                //   'x-action': 'view',
                //   'x-component': 'RecordLink',
                //   'x-component-props': {
                //     to: '/admin/plugins/block-templates/${record.key}',
                //   },
                // },
                edit: {
                  type: 'void',
                  title: '{{ t("Edit") }}',
                  'x-action': 'update',
                  'x-component': 'Action.Link',
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
                        form: {
                          type: 'void',
                          'x-decorator': 'FormBlockProvider',
                          'x-decorator-props': {
                            resource: 'uiSchemaTemplates',
                            collection: 'uiSchemaTemplates',
                            action: 'get',
                            useParams: '{{ useParamsFromRecord }}'
                          },
                          'x-component': 'CardItem',
                          properties: _defineProperty({}, uid(), {
                            type: 'void',
                            'x-component': 'FormV2',
                            'x-component-props': {
                              useProps: '{{ useFormBlockProps }}'
                            },
                            properties: {
                              name: {
                                type: 'string',
                                'x-component': 'CollectionField',
                                'x-decorator': 'FormItem',
                                'x-collection-field': 'uiSchemaTemplates.name',
                                required: true
                              },
                              actions: {
                                type: 'void',
                                'x-component': 'ActionBar',
                                'x-component-props': {
                                  layout: 'one-column',
                                  style: {
                                    marginTop: 24
                                  }
                                },
                                properties: {
                                  submit: {
                                    title: '{{t("Submit")}}',
                                    'x-action': 'submit',
                                    'x-component': 'Action',
                                    'x-component-props': {
                                      type: 'primary',
                                      htmlType: 'submit',
                                      useProps: useUpdateSchemaTemplateActionProps
                                    },
                                    type: 'void'
                                  }
                                }
                              }
                            }
                          })
                        }
                      }
                    }
                  }
                },
                destroy: {
                  title: '{{ t("Delete") }}',
                  'x-action': 'destroy',
                  'x-component': 'Action.Link',
                  'x-component-props': {
                    icon: 'DeleteOutlined',
                    confirm: {
                      title: "{{t('Delete record')}}",
                      content: "{{t('Are you sure you want to delete it?')}}"
                    },
                    useProps: '{{ useDestroyActionProps }}'
                  }
                }
              }
            }
          }
        },
        column1: {
          type: 'void',
          'x-decorator': 'TableV2.Column.Decorator',
          'x-component': 'TableV2.Column',
          properties: {
            name: {
              type: 'string',
              'x-collection-field': 'uiSchemaTemplates.name',
              'x-component': 'CollectionField',
              'x-read-pretty': true,
              'x-component-props': {
                ellipsis: true
              }
            }
          }
        },
        column2: {
          type: 'void',
          title: '{{t("Collection display name")}}',
          'x-decorator': 'TableV2.Column.Decorator',
          'x-component': 'TableV2.Column',
          properties: {
            'collection.title': {
              type: 'string',
              'x-collection-field': 'uiSchemaTemplates.collection',
              'x-component': 'Input',
              'x-read-pretty': true,
              'x-component-props': {
                ellipsis: true
              }
            }
          }
        }
      }
    })
  })
};