function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useForm } from '@formily/react';
import React from 'react';
import { SchemaComponent, useActionContext, useDesignable } from '../..';
export var TabPaneInitializers = function TabPaneInitializers() {
  var _useDesignable = useDesignable(),
      designable = _useDesignable.designable,
      insertBeforeEnd = _useDesignable.insertBeforeEnd;

  if (!designable) {
    return null;
  }

  var useSubmitAction = function useSubmitAction() {
    var form = useForm();
    var ctx = useActionContext();
    return {
      run: function run() {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var title;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return form.submit();

                case 2:
                  title = form.values.title;
                  insertBeforeEnd({
                    type: 'void',
                    title: title,
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
                  });
                  _context.next = 6;
                  return form.reset();

                case 6:
                  ctx.setVisible(false);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    };
  };

  return /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: {
      type: 'void',
      properties: {
        action1: {
          type: 'void',
          'x-component': 'Action',
          'x-component-props': {
            icon: 'PlusOutlined',
            style: {
              borderColor: 'rgb(241, 139, 98)',
              color: 'rgb(241, 139, 98)'
            },
            type: 'dashed'
          },
          title: '{{t("Add tab")}}',
          properties: {
            drawer1: {
              'x-decorator': 'Form',
              'x-component': 'Action.Modal',
              'x-component-props': {
                width: 520
              },
              type: 'void',
              title: '{{t("Add tab")}}',
              properties: {
                title: {
                  title: '{{t("Tab name")}}',
                  required: true,
                  'x-component': 'Input',
                  'x-decorator': 'FormItem'
                },
                footer: {
                  'x-component': 'Action.Modal.Footer',
                  type: 'void',
                  properties: {
                    cancel: {
                      title: '{{t("Cancel")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: function useAction() {
                          var ctx = useActionContext();
                          return {
                            run: function run() {
                              return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        ctx.setVisible(false);

                                      case 1:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2);
                              }))();
                            }
                          };
                        }
                      }
                    },
                    submit: {
                      title: '{{t("Submit")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        type: 'primary',
                        useAction: useSubmitAction
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
  });
};