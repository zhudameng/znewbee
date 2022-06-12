"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataWrapping = dataWrapping;
exports.default = void 0;
const _excluded = ["rows"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function dataWrapping() {
  return /*#__PURE__*/function () {
    var _dataWrapping = _asyncToGenerator(function* (ctx, next) {
      var _ctx$action;

      yield next();

      if (ctx.withoutDataWrapping) {
        return;
      }

      if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$action = ctx.action) === null || _ctx$action === void 0 ? void 0 : _ctx$action.params)) {
        return;
      }

      if (ctx.body instanceof Buffer) {
        return;
      }

      if (!ctx.body) {
        if (ctx.action.actionName == 'get') {
          ctx.status = 404;
        }
      }

      const _ref = ctx.body || {},
            rows = _ref.rows,
            meta = _objectWithoutProperties(_ref, _excluded);

      if (rows) {
        ctx.body = {
          data: rows,
          meta
        };
      } else {
        ctx.body = {
          data: ctx.body
        };
      }
    });

    function dataWrapping(_x, _x2) {
      return _dataWrapping.apply(this, arguments);
    }

    return dataWrapping;
  }();
}

var _default = dataWrapping;
exports.default = _default;