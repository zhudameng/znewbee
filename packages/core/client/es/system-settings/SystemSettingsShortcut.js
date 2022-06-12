function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { SettingOutlined } from '@ant-design/icons';
import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSystemSettings } from '.';
import { PluginManager, useAPIClient, useRequest } from '..';
import { ActionContext, SchemaComponent, useActionContext } from '../schema-component';

var useCloseAction = function useCloseAction() {
  var _useActionContext = useActionContext(),
      setVisible = _useActionContext.setVisible;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setVisible(false);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var useSystemSettingsValues = function useSystemSettingsValues(options) {
  var _useActionContext2 = useActionContext(),
      visible = _useActionContext2.visible;

  var result = useSystemSettings();
  return useRequest(function () {
    return Promise.resolve(result.data);
  }, _objectSpread(_objectSpread({}, options), {}, {
    refreshDeps: [visible]
  }));
};

var useSaveSystemSettingsValues = function useSaveSystemSettingsValues() {
  var _useActionContext3 = useActionContext(),
      setVisible = _useActionContext3.setVisible;

  var form = useForm();

  var _useSystemSettings = useSystemSettings(),
      mutate = _useSystemSettings.mutate,
      data = _useSystemSettings.data;

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
                setVisible(false);
                mutate({
                  data: _objectSpread(_objectSpread({}, data === null || data === void 0 ? void 0 : data.data), form.values)
                });
                _context2.next = 6;
                return api.request({
                  url: 'systemSettings:update/1',
                  method: 'post',
                  data: form.values
                });

              case 6:
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
    'x-decorator-props': {
      useValues: '{{ useSystemSettingsValues }}'
    },
    'x-component': 'Action.Drawer',
    type: 'void',
    title: '{{t("System settings")}}',
    properties: {
      title: {
        type: 'string',
        title: "{{t('System title')}}",
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true
      },
      logo: {
        type: 'string',
        title: "{{t('Logo')}}",
        'x-decorator': 'FormItem',
        'x-component': 'Upload.Attachment',
        'x-component-props': {
          action: 'attachments:upload',
          multiple: false // accept: 'jpg,png'

        }
      },
      appLang: {
        type: 'string',
        title: '{{t("Language")}}',
        'x-component': 'Select',
        'x-decorator': 'FormItem',
        enum: [{
          label: 'English',
          value: 'en-US'
        }, {
          label: '简体中文',
          value: 'zh-CN'
        }]
      },
      allowSignUp: {
        type: 'boolean',
        default: true,
        'x-content': '{{t("Allow sign up")}}',
        'x-component': 'Checkbox',
        'x-decorator': 'FormItem'
      },
      footer1: {
        type: 'void',
        'x-component': 'Action.Drawer.Footer',
        properties: {
          cancel: {
            title: 'Cancel',
            'x-component': 'Action',
            'x-component-props': {
              useAction: '{{ useCloseAction }}'
            }
          },
          submit: {
            title: 'Submit',
            'x-component': 'Action',
            'x-component-props': {
              type: 'primary',
              htmlType: 'submit',
              useAction: '{{ useSaveSystemSettingsValues }}'
            }
          }
        }
      }
    }
  })
};
export var SystemSettingsShortcut = function SystemSettingsShortcut() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(PluginManager.Toolbar.Item, {
    eventKey: 'ACLAction',
    onClick: function onClick() {
      setVisible(true);
    },
    icon: /*#__PURE__*/React.createElement(SettingOutlined, null),
    title: t('System settings')
  }), /*#__PURE__*/React.createElement(SchemaComponent, {
    scope: {
      useSaveSystemSettingsValues: useSaveSystemSettingsValues,
      useSystemSettingsValues: useSystemSettingsValues,
      useCloseAction: useCloseAction
    },
    schema: schema
  }));
};