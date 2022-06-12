"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const REPL = require('repl');

var _default = app => {
  app.command('console').action( /*#__PURE__*/_asyncToGenerator(function* () {
    yield app.start();
    const repl = REPL.start('znewbee > ').context.app = app;
    repl.on('exit', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (err) {
        if (err) {
          console.log(err);
          process.exit(1);
        }

        yield app.stop();
        process.exit(0);
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  }));
};

exports.default = _default;
