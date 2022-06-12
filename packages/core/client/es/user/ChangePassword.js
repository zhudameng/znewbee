function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import { Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionContext, SchemaComponent, useActionContext } from '../';
import { useAPIClient } from '../api-client';
import { DropdownVisibleContext } from './CurrentUser';

var useCloseAction = function useCloseAction() {
  var _useActionContext = useActionContext(),
      setVisible = _useActionContext.setVisible;

  var form = useForm();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setVisible(false);
                form.submit(function (values) {
                  console.log(values);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var useSaveCurrentUserValues = function useSaveCurrentUserValues() {
  var _useActionContext2 = useActionContext(),
      setVisible = _useActionContext2.setVisible;

  var form = useForm();
  var api = useAPIClient();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return form.submit();

              case 2:
                _context2.next = 4;
                return api.resource('users').changePassword({
                  values: form.values
                });

              case 4:
                setVisible(false);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};

var schema = {
  type: 'object',
  properties: _defineProperty({}, uid(), {
    'x-decorator': 'Form',
    'x-component': 'Action.Drawer',
    type: 'void',
    title: '{{t("Change password")}}',
    properties: {
      oldPassword: {
        type: 'string',
        title: '{{t("Old password")}}',
        required: true,
        'x-component': 'Password',
        'x-decorator': 'FormItem'
      },
      newPassword: {
        type: 'string',
        title: '{{t("New password")}}',
        required: true,
        'x-component': 'Password',
        'x-decorator': 'FormItem',
        'x-component-props': {
          checkStrength: true,
          style: {}
        },
        'x-reactions': [{
          dependencies: ['.confirmPassword'],
          fulfill: {
            state: {
              selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? t("Password mismatch") : ""}}'
            }
          }
        }]
      },
      confirmPassword: {
        type: 'string',
        required: true,
        title: '{{t("Confirm password")}}',
        'x-component': 'Password',
        'x-decorator': 'FormItem',
        'x-component-props': {
          checkStrength: true,
          style: {}
        },
        'x-reactions': [{
          dependencies: ['.newPassword'],
          fulfill: {
            state: {
              selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? t("Password mismatch") : ""}}'
            }
          }
        }]
      },
      footer: {
        'x-component': 'Action.Drawer.Footer',
        type: 'void',
        properties: {
          cancel: {
            title: '{{t("Cancel")}}',
            'x-component': 'Action',
            'x-component-props': {
              useAction: '{{ useCloseAction }}'
            }
          },
          submit: {
            title: '{{t("Submit")}}',
            'x-component': 'Action',
            'x-component-props': {
              type: 'primary',
              useAction: '{{ useSaveCurrentUserValues }}'
            }
          }
        }
      }
    }
  })
};
export var ChangePassword = function ChangePassword() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var ctx = useContext(DropdownVisibleContext);
  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(Menu.Item, {
    eventKey: 'ChangePassword',
    onClick: function onClick() {
      var _ctx$setVisible;

      ctx === null || ctx === void 0 ? void 0 : (_ctx$setVisible = ctx.setVisible) === null || _ctx$setVisible === void 0 ? void 0 : _ctx$setVisible.call(ctx, false);
      setVisible(true);
    }
  }, t('Change password')), /*#__PURE__*/React.createElement(SchemaComponent, {
    scope: {
      useCloseAction: useCloseAction,
      useSaveCurrentUserValues: useSaveCurrentUserValues
    },
    schema: schema
  }));
};