"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCloseAction = exports.useActionContext = exports.useA = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = require("react");

var _reactI18next = require("react-i18next");

var _context4 = require("./context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useA = function useA() {
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.useA = useA;

var useActionContext = function useActionContext() {
  var ctx = (0, _react2.useContext)(_context4.ActionContext);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return _objectSpread(_objectSpread({}, ctx), {}, {
    setVisible: function setVisible(visible) {
      var confirm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if ((ctx === null || ctx === void 0 ? void 0 : ctx.openMode) !== 'page') {
        if (!visible) {
          if (confirm && ctx.formValueChanged) {
            _antd.Modal.confirm({
              title: t('Unsaved changes'),
              content: t("Are you sure you don't want to save?"),
              onOk: function onOk() {
                return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var _ctx$setVisible;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          ctx.setFormValueChanged(false);
                          (_ctx$setVisible = ctx.setVisible) === null || _ctx$setVisible === void 0 ? void 0 : _ctx$setVisible.call(ctx, false);

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }))();
              }
            });
          } else {
            var _ctx$setVisible2;

            ctx === null || ctx === void 0 ? void 0 : (_ctx$setVisible2 = ctx.setVisible) === null || _ctx$setVisible2 === void 0 ? void 0 : _ctx$setVisible2.call(ctx, false);
          }
        } else {
          var _ctx$setVisible3;

          ctx === null || ctx === void 0 ? void 0 : (_ctx$setVisible3 = ctx.setVisible) === null || _ctx$setVisible3 === void 0 ? void 0 : _ctx$setVisible3.call(ctx, visible);
        }
      }
    }
  });
};

exports.useActionContext = useActionContext;

var useCloseAction = function useCloseAction() {
  var _useContext = (0, _react2.useContext)(_context4.ActionContext),
      setVisible = _useContext.setVisible;

  var form = (0, _react.useForm)();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setVisible(false);
                form.submit(function (values) {
                  console.log(values);
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
};

exports.useCloseAction = useCloseAction;