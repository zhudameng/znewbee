"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO(usage): 拦截用户的处理暂时作为一个中间件导出，应用需要的时候可以直接使用这个中间件
function check(options) {
  return /*#__PURE__*/function () {
    var _check = _asyncToGenerator(function* (ctx, next) {
      const currentUser = ctx.state.currentUser;

      if (!currentUser) {
        return ctx.throw(401, 'Unauthorized');
      }

      return next();
    });

    function check(_x, _x2) {
      return _check.apply(this, arguments);
    }

    return check;
  }();
}