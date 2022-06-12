"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = app => {
  app.command('db:sync').option('-f, --force').action( /*#__PURE__*/_asyncToGenerator(function* (...cliArgs) {
    const opts = cliArgs[0];
    console.log('db sync...');
    const force = !!opts.force;
    yield app.db.sync({
      force,
      alter: {
        drop: force
      }
    });
    yield app.stop({
      cliArgs
    });
  }));
};

exports.default = _default;