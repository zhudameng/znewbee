"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Resource = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _middleware = _interopRequireDefault(require("./middleware"));

var _action = _interopRequireDefault(require("./action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

class Resource {
  constructor(options, resourcer) {
    this.resourcer = void 0;
    this.middlewares = void 0;
    this.actions = new Map();
    this.options = void 0;
    this.except = void 0;
    const middleware = options.middleware,
          middlewares = options.middlewares,
          _options$actions = options.actions,
          actions = _options$actions === void 0 ? {} : _options$actions;
    this.options = options;
    this.resourcer = resourcer;
    this.middlewares = _middleware.default.toInstanceArray(middleware || middlewares);
    let excludes = [];

    var _iterator = _createForOfIteratorHelper(resourcer.getRegisteredHandlers()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const _step$value = _slicedToArray(_step.value, 2),
              name = _step$value[0],
              handler = _step$value[1];

        if (!actions[name]) {
          actions[name] = handler;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    const _options$only = options.only,
          only = _options$only === void 0 ? [] : _options$only,
          _options$except = options.except,
          except = _options$except === void 0 ? [] : _options$except;

    if (except.length > 0) {
      excludes = except;
    } else if (only.length > 0) {
      excludes = Object.keys(actions).filter(name => !only.includes(name));
    }

    this.except = excludes;
    this.actions = _action.default.toInstanceMap(_lodash().default.omit(actions, excludes), this);
  }

  getName() {
    return this.options.name;
  }

  getExcept() {
    return this.except;
  }

  getAction(action) {
    if (this.except.includes(action)) {
      throw new Error(`${action} action is not allowed`);
    }

    if (!this.actions.has(action)) {
      throw new Error(`${action} action does not exist`);
    }

    return this.actions.get(action);
  }

}

exports.Resource = Resource;
var _default = Resource;
exports.default = _default;