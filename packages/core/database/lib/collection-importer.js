"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImporterReader = void 0;

function fs() {
  const data = _interopRequireWildcard(require("fs"));

  fs = function fs() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function requireModule(_x) {
  return _requireModule.apply(this, arguments);
}

function _requireModule() {
  _requireModule = _asyncToGenerator(function* (module) {
    if (typeof module === 'string') {
      module = require(module);
    }

    if (typeof module !== 'object') {
      return module;
    }

    return module.__esModule ? module.default : module;
  });
  return _requireModule.apply(this, arguments);
}

class ImporterReader {
  constructor(directory, extensions) {
    this.directory = void 0;
    this.extensions = void 0;
    this.directory = directory;

    if (!extensions) {
      extensions = ['js', 'ts', 'json'];
    }

    this.extensions = new Set(extensions);
  }

  read() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const modules = (yield fs().promises.readdir(_this.directory, {
        encoding: 'utf-8'
      })).filter(fileName => {
        if (fileName.endsWith('.d.ts')) {
          return false;
        }

        const ext = _path().default.parse(fileName).ext.replace('.', '');

        return _this.extensions.has(ext);
      }).map( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (fileName) {
          return yield requireModule(_path().default.join(_this.directory, fileName));
        });

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());
      return (yield Promise.all(modules)).filter(module => _lodash().default.isPlainObject(module));
    })();
  }

}

exports.ImporterReader = ImporterReader;