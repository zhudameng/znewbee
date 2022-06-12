"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationRepositoryActionBuilder = RelationRepositoryActionBuilder;
exports.getRepositoryFromParams = getRepositoryFromParams;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getRepositoryFromParams(ctx) {
  const _ctx$action = ctx.action,
        resourceName = _ctx$action.resourceName,
        resourceOf = _ctx$action.resourceOf;

  if (resourceOf) {
    return ctx.db.getRepository(resourceName, resourceOf);
  }

  return ctx.db.getRepository(resourceName);
}

function RelationRepositoryActionBuilder(method) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      const repository = getRepositoryFromParams(ctx);
      yield repository[method](ctx.action.params.values);
      yield next();
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}