"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggers = exports.TriggerConfig = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@formily/react");

var _css = require("@emotion/css");

var _utils = require("@znewbee/utils");

var _reactI18next = require("react-i18next");

var _antd = require("antd");

var _ = require("../../");

var _collection = _interopRequireDefault(require("./collection"));

var _style = require("../style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function useUpdateConfigAction() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var form = (0, _react2.useForm)();
  var api = (0, _.useAPIClient)();
  var record = (0, _.useRecord)();
  var ctx = (0, _.useActionContext)();

  var _useResourceActionCon = (0, _.useResourceActionContext)(),
      refresh = _useResourceActionCon.refresh;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!record.executed) {
                  _context.next = 3;
                  break;
                }

                _antd.message.error(t('Trigger in executed workflow cannot be modified'));

                return _context.abrupt("return");

              case 3:
                _context.next = 5;
                return form.submit();

              case 5:
                _context.next = 7;
                return api.resource('workflows', record.id).update({
                  filterByTk: record.id,
                  values: form.values
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
;
var triggers = new _utils.Registry();
exports.triggers = triggers;
triggers.register(_collection.default.type, _collection.default);

var TriggerConfig = function TriggerConfig() {
  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var compile = (0, _.useCompile)();

  var _useResourceActionCon2 = (0, _.useResourceActionContext)(),
      data = _useResourceActionCon2.data;

  if (!data) {
    return null;
  }

  var _data$data = data.data,
      type = _data$data.type,
      config = _data$data.config,
      executed = _data$data.executed;

  var _triggers$get = triggers.get(type),
      title = _triggers$get.title,
      fieldset = _triggers$get.fieldset,
      scope = _triggers$get.scope,
      components = _triggers$get.components;

  var detailText = executed ? '{{t("View")}}' : '{{t("Configure")}}';
  var titleText = "".concat(t('Trigger'), ": ").concat(compile(title));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeCardClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeMetaClass)
  }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "gold"
  }, t('Trigger'))), /*#__PURE__*/_react.default.createElement("h4", null, compile(title)), /*#__PURE__*/_react.default.createElement(_.SchemaComponent, {
    schema: {
      type: 'void',
      title: detailText,
      'x-component': 'Action.Link',
      name: 'drawer',
      properties: {
        drawer: {
          type: 'void',
          title: titleText,
          'x-component': 'Action.Drawer',
          'x-decorator': 'Form',
          'x-decorator-props': {
            initialValue: {
              config: config
            }
          },
          properties: {
            config: {
              type: 'void',
              name: 'config',
              'x-component': 'fieldset',
              'x-component-props': {},
              properties: fieldset
            },
            actions: {
              type: 'void',
              'x-component': 'Action.Drawer.Footer',
              properties: executed ? {
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
                    useAction: useUpdateConfigAction
                  }
                }
              }
            }
          }
        }
      }
    },
    scope: scope,
    components: components
  }));
};

exports.TriggerConfig = TriggerConfig;
