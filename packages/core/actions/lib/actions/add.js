"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

var _utils = require("../utils");

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function add(_x, _x2) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = _asyncToGenerator(function* (ctx, next) {
    const repository = (0, _utils.getRepositoryFromParams)(ctx);

    if (!(repository instanceof _database().MultipleRelationRepository || repository instanceof _database().HasManyRepository)) {
      return yield next();
    }

    yield repository.add(ctx.action.params.values);
    yield next();
  });
  return _add.apply(this, arguments);
}
