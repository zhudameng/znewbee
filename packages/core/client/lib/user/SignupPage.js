"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupPage = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var schema = {
  type: 'object',
  name: (0, _shared.uid)(),
  'x-component': 'Form',
  properties: {
    email: {
      type: 'string',
      required: true,
      'x-component': 'Input',
      'x-validator': 'email',
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '{{t("Email")}}',
        style: {}
      }
    },
    password: {
      type: 'string',
      required: true,
      'x-component': 'Password',
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '{{t("Password")}}',
        checkStrength: true,
        style: {}
      },
      'x-reactions': [{
        dependencies: ['.confirm_password'],
        fulfill: {
          state: {
            selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? t("Password mismatch") : ""}}'
          }
        }
      }]
    },
    confirm_password: {
      type: 'string',
      required: true,
      'x-component': 'Password',
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '{{t("Confirm password")}}',
        checkStrength: true,
        style: {}
      },
      'x-reactions': [{
        dependencies: ['.password'],
        fulfill: {
          state: {
            selfErrors: '{{$deps[0] && $self.value && $self.value !== $deps[0] ? t("Password mismatch") : ""}}'
          }
        }
      }]
    },
    actions: {
      type: 'void',
      'x-component': 'div',
      properties: {
        submit: {
          title: '{{t("Sign up")}}',
          type: 'void',
          'x-component': 'Action',
          'x-component-props': {
            block: true,
            type: 'primary',
            htmlType: 'submit',
            useAction: '{{ useSignup }}',
            style: {
              width: '100%'
            }
          }
        }
      }
    },
    link: {
      type: 'void',
      'x-component': 'div',
      properties: {
        link: {
          type: 'void',
          'x-component': 'Link',
          'x-component-props': {
            to: '/signin'
          },
          'x-content': '{{t("Log in with an existing account")}}'
        }
      }
    }
  }
};

var useSignup = function useSignup() {
  var history = (0, _reactRouterDom.useHistory)();
  var form = (0, _react.useForm)();
  var api = (0, _.useAPIClient)();
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
                return api.resource('users').signup({
                  values: form.values
                });

              case 4:
                _antd.message.success('注册成功，即将跳转登录页');

                setTimeout(function () {
                  history.push('/signin');
                }, 2000);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var SignupPage = function SignupPage() {
  var _ctx$data, _ctx$data$data;

  (0, _.useCurrentDocumentTitle)('Signup');
  var ctx = (0, _.useSystemSettings)();
  var allowSignUp = ctx === null || ctx === void 0 ? void 0 : (_ctx$data = ctx.data) === null || _ctx$data === void 0 ? void 0 : (_ctx$data$data = _ctx$data.data) === null || _ctx$data$data === void 0 ? void 0 : _ctx$data$data.allowSignUp;

  if (!allowSignUp) {
    return /*#__PURE__*/_react2.default.createElement(_reactRouterDom.Redirect, {
      to: '/signin'
    });
  }

  return /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
    schema: schema,
    scope: {
      useSignup: useSignup
    }
  });
};

exports.SignupPage = SignupPage;