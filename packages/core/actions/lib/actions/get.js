"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function get(_x, _x2) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(function* (ctx, next) {
    const repository = (0, _utils.getRepositoryFromParams)(ctx);
    const _ctx$action$params = ctx.action.params,
          filterByTk = _ctx$action$params.filterByTk,
          fields = _ctx$action$params.fields,
          appends = _ctx$action$params.appends,
          except = _ctx$action$params.except,
          filter = _ctx$action$params.filter;
    const instance = yield repository.findOne({
      filterByTk,
      fields,
      appends,
      except,
      filter,
      context: ctx
    });
    ctx.body = instance;
    yield next();
  });
  return _get.apply(this, arguments);
}