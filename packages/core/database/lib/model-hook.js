"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelHook = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

const _require = require('sequelize/lib/hooks'),
      hooks = _require.hooks;

class ModelHook {
  constructor(database) {
    this.database = void 0;
    this.boundEvent = new Set();
    this.database = database;
  }

  isModelHook(eventName) {
    if (_lodash().default.isString(eventName)) {
      const hookType = eventName.split('.').pop();

      if (hooks[hookType]) {
        return hookType;
      }
    }

    return false;
  }

  findModelName(hookArgs) {
    var _iterator = _createForOfIteratorHelper(hookArgs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const arg = _step.value;

        if (arg === null || arg === void 0 ? void 0 : arg._previousDataValues) {
          return arg.constructor.name;
        }

        if (_lodash().default.isPlainObject(arg)) {
          if (arg['model']) {
            return arg['model'].name;
          }

          if (_lodash().default.get(arg, 'name.plural')) {
            return _lodash().default.get(arg, 'name.plural');
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  }

  bindEvent(eventName) {
    this.boundEvent.add(eventName);
  }

  hasBindEvent(eventName) {
    return this.boundEvent.has(eventName);
  }

  sequelizeHookBuilder(eventName) {
    var _this = this;

    return /*#__PURE__*/_asyncToGenerator(function* (...args) {
      const modelName = _this.findModelName(args);

      if (modelName) {
        // emit model event
        yield _this.database.emitAsync(`${modelName}.${eventName}`, ...args);
      } // emit sequelize global event


      yield _this.database.emitAsync(eventName, ...args);
    });
  }

}

exports.ModelHook = ModelHook;