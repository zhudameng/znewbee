"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * TODO
 */
var _default = app => {
  app.command('upgrade').action( /*#__PURE__*/_asyncToGenerator(function* (...cliArgs) {
    const opts = cliArgs[0];
    console.log('upgrading...');
    const force = false;
    yield app.db.sync({
      force,
      alter: {
        drop: force
      }
    });
    yield app.stop({
      cliArgs
    });
    console.log(_chalk().default.green(`✨  znewbee has been upgraded to v${app.getVersion()}`));
  }));
};

exports.default = _default;
