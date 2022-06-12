"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownVisibleContext = exports.CurrentUser = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _reactRouterDom = require("react-router-dom");

var _ = require("..");

var _ChangePassword = require("./ChangePassword");

var _EditProfile = require("./EditProfile");

var _LanguageSettings = require("./LanguageSettings");

var _SwitchRole = require("./SwitchRole");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DropdownVisibleContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.DropdownVisibleContext = DropdownVisibleContext;

var CurrentUser = function CurrentUser() {
  var _data$data, _data$data2;

  var history = (0, _reactRouterDom.useHistory)();
  var api = (0, _.useAPIClient)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useCurrentUserContex = (0, _.useCurrentUserContext)(),
      data = _useCurrentUserContex.data;

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'inline-block',
      verticalAlign: 'top'
    }
  }, /*#__PURE__*/_react.default.createElement(DropdownVisibleContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    },
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, null, /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      disabled: true
    }, "Version ", process.env.VERSION), /*#__PURE__*/_react.default.createElement(_antd.Menu.Divider, null), /*#__PURE__*/_react.default.createElement(_EditProfile.EditProfile, null), /*#__PURE__*/_react.default.createElement(_ChangePassword.ChangePassword, null), /*#__PURE__*/_react.default.createElement(_SwitchRole.SwitchRole, null), /*#__PURE__*/_react.default.createElement(_LanguageSettings.LanguageSettings, null), /*#__PURE__*/_react.default.createElement(_antd.Menu.Divider, null), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      onClick: function () {
        var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return api.resource('users').signout();

                case 2:
                  api.auth.setToken(null);
                  history.push('/signin');

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onClick() {
          return _onClick.apply(this, arguments);
        }

        return onClick;
      }()
    }, t('Sign out')))
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      cursor: 'pointer',
      border: 0,
      padding: '16px',
      color: 'rgba(255, 255, 255, 0.65)'
    }
  }, (data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.nickname) || (data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.email)))));
};

exports.CurrentUser = CurrentUser;