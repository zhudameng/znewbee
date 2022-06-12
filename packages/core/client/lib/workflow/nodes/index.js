"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = Node;
exports.NodeDefaultView = NodeDefaultView;
exports.RemoveButton = RemoveButton;
exports.instructions = void 0;
exports.useNodeContext = useNodeContext;

var _icons = require("@ant-design/icons");

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _utils = require("@znewbee/utils");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _style = require("../style");

var _WorkflowCanvas = require("../WorkflowCanvas");

var _calculation = _interopRequireDefault(require("./calculation"));

var _condition = _interopRequireDefault(require("./condition"));

var _create = _interopRequireDefault(require("./create"));

var _destroy = _interopRequireDefault(require("./destroy"));

var _parallel = _interopRequireDefault(require("./parallel"));

var _query = _interopRequireDefault(require("./query"));

var _update = _interopRequireDefault(require("./update"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

;
var instructions = new _utils.Registry();
exports.instructions = instructions;
instructions.register('query', _query.default);
instructions.register('create', _create.default);
instructions.register('update', _update.default);
instructions.register('destroy', _destroy.default);
instructions.register('condition', _condition.default);
instructions.register('parallel', _parallel.default);
instructions.register('calculation', _calculation.default);

function useUpdateAction() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var form = (0, _react.useForm)();
  var api = (0, _.useAPIClient)();
  var ctx = (0, _.useActionContext)();

  var _useResourceActionCon = (0, _.useResourceActionContext)(),
      refresh = _useResourceActionCon.refresh;

  var data = useNodeContext();

  var _useFlowContext = (0, _WorkflowCanvas.useFlowContext)(),
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

                _antd.message.error(t('Node in executed workflow cannot be modified'));

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

var NodeContext = /*#__PURE__*/_react2.default.createContext(null);

function useNodeContext() {
  return (0, _react2.useContext)(NodeContext);
}

function Node(_ref) {
  var data = _ref.data;
  var instruction = instructions.get(data.type);
  return /*#__PURE__*/_react2.default.createElement(NodeContext.Provider, {
    value: data
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeBlockClass)
  }, instruction.render ? instruction.render(data) : /*#__PURE__*/_react2.default.createElement(NodeDefaultView, {
    data: data
  }), !instruction.endding ? /*#__PURE__*/_react2.default.createElement(_WorkflowCanvas.AddButton, {
    upstream: data
  }) : /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                flex-grow: 1;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                width: 1px;\n                height: 6em;\n                padding: 2em 0;\n                background-color: green;\n\n                .anticon{\n                  font-size: 1.5em;\n                  line-height: 100%;\n                }\n              "])))
  }, /*#__PURE__*/_react2.default.createElement(_icons.CloseOutlined, null))));
}

function RemoveButton() {
  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var api = (0, _.useAPIClient)();

  var _useFlowContext2 = (0, _WorkflowCanvas.useFlowContext)(),
      workflow = _useFlowContext2.workflow;

  var resource = api.resource('workflows.nodes', workflow.id);
  var current = useNodeContext();

  var _useFlowContext3 = (0, _WorkflowCanvas.useFlowContext)(),
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

              _antd.Modal.confirm({
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

  return workflow.executed ? null : /*#__PURE__*/_react2.default.createElement(_antd.Button, {
    type: "text",
    shape: "circle",
    icon: /*#__PURE__*/_react2.default.createElement(_icons.DeleteOutlined, null),
    onClick: onRemove,
    className: "workflow-node-remove-button"
  });
}

function NodeDefaultView(props) {
  var compile = (0, _.useCompile)();

  var _useFlowContext4 = (0, _WorkflowCanvas.useFlowContext)(),
      workflow = _useFlowContext4.workflow;

  var data = props.data,
      children = props.children;
  var instruction = instructions.get(data.type);
  var detailText = workflow.executed ? '{{t("View")}}' : '{{t("Configure")}}';
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeClass, "workflow-node-type-".concat(data.type))
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeCardClass)
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeHeaderClass)
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeMetaClass)
  }, /*#__PURE__*/_react2.default.createElement(_antd.Tag, null, compile(instruction.title))), /*#__PURE__*/_react2.default.createElement("h4", {
    className: (0, _css.cx)(_style.nodeTitleClass)
  }, /*#__PURE__*/_react2.default.createElement("strong", null, data.title), /*#__PURE__*/_react2.default.createElement("span", {
    className: "workflow-node-id"
  }, "#", data.id)), /*#__PURE__*/_react2.default.createElement(RemoveButton, null)), /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
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
                return (0, _.useRequest)(function () {
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
