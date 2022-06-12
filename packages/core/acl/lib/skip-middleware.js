"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skip = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const skip = options => {
  return /*#__PURE__*/function () {
    var _ACLSkipMiddleware = _asyncToGenerator(function* (ctx, next) {
      const _ctx$action = ctx.action,
            resourceName = _ctx$action.resourceName,
            actionName = _ctx$action.actionName;

      if (resourceName === options.resourceName && actionName === options.actionName) {
        ctx.permission = {
          skip: true
        };
      }

      yield next();
    });

    function ACLSkipMiddleware(_x, _x2) {
      return _ACLSkipMiddleware.apply(this, arguments);
    }

    return ACLSkipMiddleware;
  }();
};

exports.skip = skip;