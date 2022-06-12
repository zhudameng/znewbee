"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginManager = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PluginManager {
  constructor(options) {
    this.app = void 0;
    this.plugins = new Map();
    this.app = options.app;
  }

  getPlugins() {
    return this.plugins;
  }

  get(name) {
    return this.plugins.get(name);
  }

  add(pluginClass, options) {
    const instance = new pluginClass(this.app, options);
    const name = instance.getName();

    if (this.plugins.has(name)) {
      throw new Error(`plugin name [${name}] `);
    }

    this.plugins.set(name, instance);
    return instance;
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.app.emitAsync('beforeLoadAll');

      var _iterator = _createForOfIteratorHelper(_this.plugins),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const _step$value = _slicedToArray(_step.value, 2),
                name = _step$value[0],
                plugin = _step$value[1];

          yield plugin.beforeLoad();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(_this.plugins),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const _step2$value = _slicedToArray(_step2.value, 2),
                name = _step2$value[0],
                plugin = _step2$value[1];

          yield _this.app.emitAsync('beforeLoadPlugin', plugin);
          yield plugin.load();
          yield _this.app.emitAsync('afterLoadPlugin', plugin);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      yield _this.app.emitAsync('afterLoadAll');
    })();
  }

  install(options = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var _iterator3 = _createForOfIteratorHelper(_this2.plugins),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          const _step3$value = _slicedToArray(_step3.value, 2),
                name = _step3$value[0],
                plugin = _step3$value[1];

          yield _this2.app.emitAsync('beforeInstallPlugin', plugin, options);
          yield plugin.install(options);
          yield _this2.app.emitAsync('afterInstallPlugin', plugin, options);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    })();
  }

  static resolvePlugin(pluginName) {
    return require(pluginName).default;
  }

}

exports.PluginManager = PluginManager;