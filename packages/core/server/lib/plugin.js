"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

function _findPackageJson() {
  const data = _interopRequireDefault(require("find-package-json"));

  _findPackageJson = function _findPackageJson() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Plugin {
  constructor(app, options) {
    this.options = void 0;
    this.app = void 0;
    this.db = void 0;
    this.app = app;
    this.db = app.db;
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = options || {};
  }

  beforeLoad() {}

  install(options) {
    return _asyncToGenerator(function* () {})();
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const collectionPath = _this.collectionPath();

      if (collectionPath) {
        yield _this.db.import({
          directory: collectionPath
        });
      }
    })();
  }

  collectionPath() {
    return null;
  }

  getPackageName(dirname) {
    const f = (0, _findPackageJson().default)(dirname);
    const packageObj = f.next().value;
    return packageObj['name'];
  }

}

exports.Plugin = Plugin;