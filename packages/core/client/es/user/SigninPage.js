function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SchemaComponent, useAPIClient, useCurrentDocumentTitle, useSystemSettings } from '..';
var schema = {
  type: 'object',
  name: uid(),
  'x-component': 'Form',
  'x-component-props': {
    style: {
      width: '100%'
    }
  },
  properties: {
    email: {
      type: 'string',
      required: true,
      'x-component': 'Input',
      // 'x-validator': 'email',
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '账号',
        style: {}
      }
    },
    password: {
      type: 'string',
      'x-component': 'Password',
      required: true,
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '{{t("Password")}}',
        style: {}
      }
    },
    actions: {
      type: 'void',
      'x-component': 'div',
      properties: {
        submit: {
          title: '{{t("Sign in")}}',
          type: 'void',
          'x-component': 'Action',
          'x-component-props': {
            htmlType: 'submit',
            block: true,
            type: 'default',
            useAction: '{{ useSignin }}',
            style: {
              width: '100%',
              background: 'green',
              color: 'white'
            }
          }
        }
      }
    },
    link: {
      type: 'void',
      'x-component': 'div',
      'x-visible': '{{allowSignUp}}',
      properties: {
        link: {
          title: '{{t("Create an account")}}',
          type: 'void',
          'x-component': 'Link',
          'x-content': '{{t("Create an account")}}',
          'x-component-props': {
            to: '/signup'
          }
        }
      }
    }
  }
};

var useSignin = function useSignin() {
  var _location$query;

  var location = useLocation();
  var history = useHistory();
  var form = useForm();
  var api = useAPIClient();
  var redirect = location === null || location === void 0 ? void 0 : (_location$query = location['query']) === null || _location$query === void 0 ? void 0 : _location$query.redirect;
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return form.submit();

              case 2:
                _context.next = 4;
                return api.auth.signIn(form.values);

              case 4:
                history.push(redirect || '/admin');

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

export var SigninPage = function SigninPage() {
  var _ctx$data, _ctx$data$data;

  useCurrentDocumentTitle('Signin');
  var ctx = useSystemSettings();
  var allowSignUp = ctx === null || ctx === void 0 ? void 0 : (_ctx$data = ctx.data) === null || _ctx$data === void 0 ? void 0 : (_ctx$data$data = _ctx$data.data) === null || _ctx$data$data === void 0 ? void 0 : _ctx$data$data.allowSignUp;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SchemaComponent, {
    scope: {
      useSignin: useSignin,
      allowSignUp: allowSignUp
    },
    schema: schema
  }));
};