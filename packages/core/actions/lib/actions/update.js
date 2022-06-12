"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function update(_x, _x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (ctx, next) {
    const repository = (0, _utils.getRepositoryFromParams)(ctx);
    const _ctx$action$params = ctx.action.params,
          filterByTk = _ctx$action$params.filterByTk,
          values = _ctx$action$params.values,
          whitelist = _ctx$action$params.whitelist,
          blacklist = _ctx$action$params.blacklist,
          filter = _ctx$action$params.filter,
          updateAssociationValues = _ctx$action$params.updateAssociationValues;
    const instance = yield repository.update({
      filterByTk,
      values,
      whitelist,
      blacklist,
      filter,
      updateAssociationValues,
      context: ctx
    });
    ctx.body = instance;
    yield next();
  });
  return _update.apply(this, arguments);
}