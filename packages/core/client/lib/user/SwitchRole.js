"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchRole = void 0;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _acl = require("../acl");

var _apiClient = require("../api-client");

var _schemaComponent = require("../schema-component");

var _CurrentUserProvider = require("./CurrentUserProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useCurrentRoles = function useCurrentRoles() {
  var _data$data;

  var _useACLRoleContext = (0, _acl.useACLRoleContext)(),
      allowAnonymous = _useACLRoleContext.allowAnonymous;

  var _useCurrentUserContex = (0, _CurrentUserProvider.useCurrentUserContext)(),
      data = _useCurrentUserContex.data;

  var compile = (0, _schemaComponent.useCompile)();
  var options = ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.roles) || []).map(function (item) {
    return {
      title: item.title,
      name: item.name
    };
  });

  if (allowAnonymous) {
    options.push({
      title: 'Anonymous',
      name: 'anonymous'
    });
  }

  return compile(options);
};

var SwitchRole = function SwitchRole() {
  var api = (0, _apiClient.useAPIClient)();
  var roles = useCurrentRoles();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  if (roles.length <= 1) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
    eventKey: 'SwitchRole'
  }, t('Switch role'), ' ', /*#__PURE__*/_react.default.createElement(_antd.Select, {
    style: {
      minWidth: 100
    },
    bordered: false,
    fieldNames: {
      label: 'title',
      value: 'name'
    },
    options: roles,
    value: api.auth.role,
    onChange: function () {
      var _onChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(roleName) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                api.auth.setRole(roleName);
                _context.next = 3;
                return api.resource('users').setDefaultRole({
                  values: {
                    roleName: roleName
                  }
                });

              case 3:
                window.location.href = '/';

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      return onChange;
    }()
  }));
};

exports.SwitchRole = SwitchRole;