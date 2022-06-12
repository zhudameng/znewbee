var _templateObject;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';
import { useForm } from '@formily/react';
import { Registry } from '@znewbee/utils';
import { Button, message, Modal, Tag } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaComponent, useActionContext, useAPIClient, useCompile, useRequest, useResourceActionContext } from '../..';
import { nodeBlockClass, nodeCardClass, nodeClass, nodeHeaderClass, nodeMetaClass, nodeTitleClass } from '../style';
import { AddButton, useFlowContext } from '../WorkflowCanvas';
import calculation from './calculation';
import condition from './condition';
import create from './create';
import destroy from './destroy';
import parallel from './parallel';
import query from './query';
import update from './update';
;
export var instructions = new Registry();
instructions.register('query', query);
instructions.register('create', create);
instructions.register('update', update);
instructions.register('destroy', destroy);
instructions.register('condition', condition);
instructions.register('parallel', parallel);
instructions.register('calculation', calculation);

function useUpdateAction() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var form = useForm();
  var api = useAPIClient();
  var ctx = useActionContext();

  var _useResourceActionCon = useResourceActionContext(),
      refresh = _useResourceActionCon.refresh;

  var data = useNodeContext();

  var _useFlowContext = useFlowContext(),
      workflow = _useFlowContext.workflow;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!workflow.executed) {
                  _context.next = 3;
                  break;
                }

                message.error(t('Node in executed workflow cannot be modified'));
                return _context.abrupt("return");

              case 3:
                _context.next = 5;
                return form.submit();

              case 5:
                _context.next = 7;
                return api.resource('flow_nodes', data.id).update({
                  filterByTk: data.id,
                  values: {
                    title: form.values.title,
                    config: form.values.config
                  }
                });

              case 7:
                ctx.setVisible(false);
                refresh();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
}

;
var NodeContext = /*#__PURE__*/React.createContext(null);
export function useNodeContext() {
  return useContext(NodeContext);
}
export function Node(_ref) {
  var data = _ref.data;
  var instruction = instructions.get(data.type);
  return /*#__PURE__*/React.createElement(NodeContext.Provider, {
    value: data
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(nodeBlockClass)
  }, instruction.render ? instruction.render(data) : /*#__PURE__*/React.createElement(NodeDefaultView, {
    data: data
  }), !instruction.endding ? /*#__PURE__*/React.createElement(AddButton, {
    upstream: data
  }) : /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                flex-grow: 1;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                width: 1px;\n                height: 6em;\n                padding: 2em 0;\n                background-color: green;\n\n                .anticon{\n                  font-size: 1.5em;\n                  line-height: 100%;\n                }\n              "])))
  }, /*#__PURE__*/React.createElement(CloseOutlined, null))));
}
export function RemoveButton() {
  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var api = useAPIClient();

  var _useFlowContext2 = useFlowContext(),
      workflow = _useFlowContext2.workflow;

  var resource = api.resource('workflows.nodes', workflow.id);
  var current = useNodeContext();

  var _useFlowContext3 = useFlowContext(),
      nodes = _useFlowContext3.nodes,
      onNodeRemoved = _useFlowContext3.onNodeRemoved;

  function onRemove() {
    return _onRemove.apply(this, arguments);
  }

  function _onRemove() {
    _onRemove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var onOk, _onOk, hasBranches, message;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _onOk = function _onOk3() {
                _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var _yield$resource$destr, node;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return resource.destroy({
                            filterByTk: current.id
                          });

                        case 2:
                          _yield$resource$destr = _context2.sent;
                          node = _yield$resource$destr.data.data;
                          onNodeRemoved(node);

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _onOk.apply(this, arguments);
              };

              onOk = function _onOk2() {
                return _onOk.apply(this, arguments);
              };

              hasBranches = !nodes.find(function (item) {
                return item.upstream === current && item.branchIndex != null;
              });
              message = hasBranches ? t('Are you sure you want to delete it?') : t('This node contains branches, deleting will also be preformed to them, are you sure?');
              Modal.confirm({
                title: t('Delete'),
                content: message,
                onOk: onOk
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _onRemove.apply(this, arguments);
  }

  return workflow.executed ? null : /*#__PURE__*/React.createElement(Button, {
    type: "text",
    shape: "circle",
    icon: /*#__PURE__*/React.createElement(DeleteOutlined, null),
    onClick: onRemove,
    className: "workflow-node-remove-button"
  });
}
export function NodeDefaultView(props) {
  var compile = useCompile();

  var _useFlowContext4 = useFlowContext(),
      workflow = _useFlowContext4.workflow;

  var data = props.data,
      children = props.children;
  var instruction = instructions.get(data.type);
  var detailText = workflow.executed ? '{{t("View")}}' : '{{t("Configure")}}';
  return /*#__PURE__*/React.createElement("div", {
    className: cx(nodeClass, "workflow-node-type-".concat(data.type))
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(nodeCardClass)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(nodeHeaderClass)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(nodeMetaClass)
  }, /*#__PURE__*/React.createElement(Tag, null, compile(instruction.title))), /*#__PURE__*/React.createElement("h4", {
    className: cx(nodeTitleClass)
  }, /*#__PURE__*/React.createElement("strong", null, data.title), /*#__PURE__*/React.createElement("span", {
    className: "workflow-node-id"
  }, "#", data.id)), /*#__PURE__*/React.createElement(RemoveButton, null)), /*#__PURE__*/React.createElement(SchemaComponent, {
    scope: instruction.scope,
    components: instruction.components,
    schema: {
      type: 'void',
      properties: {
        view: instruction.view,
        config: {
          type: 'void',
          title: detailText,
          'x-component': 'Action.Link',
          'x-component-props': {
            type: 'primary'
          },
          properties: _defineProperty({}, instruction.type, {
            type: 'void',
            title: instruction.title,
            'x-component': 'Action.Drawer',
            'x-decorator': 'Form',
            'x-decorator-props': {
              useValues: function useValues(options) {
                var d = useNodeContext();
                return useRequest(function () {
                  return Promise.resolve({
                    data: d
                  });
                }, options);
              }
            },
            properties: {
              title: {
                type: 'string',
                name: 'title',
                title: '{{t("Name")}}',
                'x-decorator': 'FormItem',
                'x-component': 'Input'
              },
              config: {
                type: 'void',
                name: 'config',
                'x-component': 'fieldset',
                'x-component-props': {
                  disabled: workflow.executed
                },
                properties: instruction.fieldset
              },
              actions: {
                type: 'void',
                'x-component': 'Action.Drawer.Footer',
                properties: workflow.executed ? {
                  close: {
                    title: '{{t("Close")}}',
                    'x-component': 'Action',
                    'x-component-props': {
                      useAction: '{{ cm.useCancelAction }}'
                    }
                  }
                } : {
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
                      useAction: useUpdateAction
                    }
                  }
                }
              }
            }
          })
        }
      }
    }
  })), children);
}
