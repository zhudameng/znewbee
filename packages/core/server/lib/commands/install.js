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

var _default = app => {
  app.command('install').option('-f, --force').option('-c, --clean').option('-s, --silent').option('-r, --repeat [repeat]').action( /*#__PURE__*/_asyncToGenerator(function* (...cliArgs) {
    let installed = false;
    const opts = cliArgs[0];

    try {
      yield app.db.auth({
        repeat: opts.repeat || 1
      });
    } catch (error) {
      console.log(_chalk().default.red('Unable to connect to the database. Please check the database environment variables in the .env file.'));
      return;
    }

    if (!(opts === null || opts === void 0 ? void 0 : opts.clean) && !(opts === null || opts === void 0 ? void 0 : opts.force)) {
      const tables = yield app.db.sequelize.getQueryInterface().showAllTables();

      if (tables.includes('collections')) {
        installed = true;

        if (!opts.silent) {
          console.log('znewbee is already installed. To reinstall, please execute:');
          console.log();
          let command = '$ yarn znewbee install -f';
          console.log(_chalk().default.yellow(command));
          console.log();
        }

        return;
      }
    }

    if (!opts.silent || !installed) {
      console.log(`Start installing znewbee`);
    }

    yield app.install({
      cliArgs,
      clean: opts.clean,
      sync: {
        force: opts.force
      }
    });
    yield app.stop({
      cliArgs
    });
  }));
};

exports.default = _default;
