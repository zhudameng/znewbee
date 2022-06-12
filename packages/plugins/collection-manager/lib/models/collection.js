"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class CollectionModel extends _database().MagicAttributeModel {
  get db() {
    return this.constructor.database;
  }

  load(loadOptions = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const skipExist = loadOptions.skipExist,
            skipField = loadOptions.skipField,
            transaction = loadOptions.transaction;

      const name = _this.get('name');

      let collection;

      if (_this.db.hasCollection(name)) {
        collection = _this.db.getCollection(name);

        if (skipExist) {
          return collection;
        }

        collection.updateOptions(_objectSpread(_objectSpread({}, _this.get()), {}, {
          fields: []
        }));
      } else {
        collection = _this.db.collection(_objectSpread(_objectSpread({}, _this.get()), {}, {
          fields: []
        }));
      }

      if (!skipField) {
        yield _this.loadFields({
          transaction
        });
      }

      return collection;
    })();
  }

  loadFields(options = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      // @ts-ignore
      const instances = yield _this2.getFields(options);

      var _iterator = _createForOfIteratorHelper(instances),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const instance = _step.value;
          yield instance.load(options);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    })();
  }

  migrate(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const collection = yield _this3.load({
        transaction: options === null || options === void 0 ? void 0 : options.transaction
      });
      yield collection.sync(_objectSpread({
        force: false,
        alter: {
          drop: false
        }
      }, options));
    })();
  }

}

exports.CollectionModel = CollectionModel;
