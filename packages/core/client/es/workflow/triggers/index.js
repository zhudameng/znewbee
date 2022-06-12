function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from "react";
import { useForm } from "@formily/react";
import { cx } from "@emotion/css";
import { Registry } from "@znewbee/utils";
import { useTranslation } from "react-i18next";
import { message, Tag } from "antd";
import { SchemaComponent, useActionContext, useAPIClient, useCompile, useRecord, useResourceActionContext } from '../../';
import collection from './collection';
import { nodeCardClass, nodeMetaClass } from "../style";

function useUpdateConfigAction() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var form = useForm();
  var api = useAPIClient();
  var record = useRecord();
  var ctx = useActionContext();

  var _useResourceActionCon = useResourceActionContext(),
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

                message.error(t('Trigger in executed workflow cannot be modified'));
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
export var triggers = new Registry();
triggers.register(collection.type, collection);
export var TriggerConfig = function TriggerConfig() {
  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  var compile = useCompile();

  var _useResourceActionCon2 = useResourceActionContext(),
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
  return /*#__PURE__*/React.createElement("div", {
    className: cx(nodeCardClass)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(nodeMetaClass)
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "gold"
  }, t('Trigger'))), /*#__PURE__*/React.createElement("h4", null, compile(title)), /*#__PURE__*/React.createElement(SchemaComponent, {
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
