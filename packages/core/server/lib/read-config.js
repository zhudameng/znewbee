"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationRepository = void 0;
exports.loadConfiguration = loadConfiguration;
exports.readConfig = readConfig;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function _fs() {
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function readConfig(_x) {
  return _readConfig.apply(this, arguments);
}

function _readConfig() {
  _readConfig = _asyncToGenerator(function* (dir) {
    const repository = new ConfigurationRepository();
    yield loadConfiguration(dir, repository);
    return repository.toObject();
  });
  return _readConfig.apply(this, arguments);
}

class ConfigurationRepository {
  constructor() {
    this.items = new Map();
  }

  get(key, defaultValue = undefined) {
    if (this.items.has(key)) {
      return this.items.get(key);
    }

    return defaultValue;
  }

  set(key, value) {
    return this.items.set(key, value);
  }

  toObject() {
    const result = {};

    var _iterator = _createForOfIteratorHelper(this.items.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

        _lodash().default.set(result, key, value);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  }

}

exports.ConfigurationRepository = ConfigurationRepository;

function loadConfiguration(_x2, _x3) {
  return _loadConfiguration.apply(this, arguments);
}

function _loadConfiguration() {
  _loadConfiguration = _asyncToGenerator(function* (configurationDir, repository) {
    const getConfigurationFiles = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (dir, prefix = []) {
        const files = yield _fs().default.promises.readdir(dir, {
          withFileTypes: true
        });

        var _iterator2 = _createForOfIteratorHelper(files),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            const file = _step2.value;

            if (file.isDirectory()) {
              yield getConfigurationFiles(_path().default.join(dir, file.name), [...prefix, file.name]);
            } else {
              if (!['ts', 'js'].includes(file.name.split('.').slice(1).join('.'))) {
                continue;
              }

              const filePath = _path().default.join(dir, file.name);

              const keyName = _path().default.parse(filePath).name;

              const configuration = require(filePath).default;

              repository.set([...prefix, keyName].join('.'), configuration);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });

      return function getConfigurationFiles(_x4) {
        return _ref.apply(this, arguments);
      };
    }();

    yield getConfigurationFiles(configurationDir);
  });
  return _loadConfiguration.apply(this, arguments);
}