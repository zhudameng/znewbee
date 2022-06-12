"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortField = void 0;

function _asyncMutex() {
  const data = require("async-mutex");

  _asyncMutex = function _asyncMutex() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const sortFieldMutex = new (_asyncMutex().Mutex)();

class SortField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.INTEGER;
  }

  setSortValue(instance, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const _this$options = _this.options,
            name = _this$options.name,
            scopeKey = _this$options.scopeKey;
      const model = _this.context.collection.model;

      if ((0, _lodash().isNumber)(instance.get(name)) && instance._previousDataValues[scopeKey] == instance[scopeKey]) {
        return;
      }

      const where = {};

      if (scopeKey) {
        const value = instance.get(scopeKey);

        if (value !== undefined && value !== null) {
          where[scopeKey] = value;
        }
      }

      yield sortFieldMutex.runExclusive( /*#__PURE__*/_asyncToGenerator(function* () {
        const max = yield model.max(name, _objectSpread(_objectSpread({}, options), {}, {
          where
        }));
        const newValue = (max || 0) + 1;
        instance.set(name, newValue);
      }));
    })();
  }

  onScopeChange(instance, options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const scopeKey = _this2.options.scopeKey;

      if (scopeKey && !instance.isNewRecord && instance._previousDataValues[scopeKey] != instance[scopeKey]) {
        yield _this2.setSortValue(instance, options);
      }
    })();
  }

  initRecordsSortValue({
    transaction
  }) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const totalCount = yield _this3.collection.repository.count({
        transaction
      });
      const emptyCount = yield _this3.collection.repository.count({
        filter: {
          [_this3.name]: null
        },
        transaction
      });

      if (emptyCount === totalCount && emptyCount > 0) {
        const records = yield _this3.collection.repository.find({
          order: [_this3.collection.model.primaryKeyAttribute],
          transaction
        });
        let start = 1;

        var _iterator = _createForOfIteratorHelper(records),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            const record = _step.value;
            yield record.update({
              sort: start
            }, {
              transaction,
              silent: true
            });
            start += 1;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    })();
  }

  bind() {
    super.bind();
    this.on('afterSync', this.initRecordsSortValue.bind(this));
    this.on('beforeUpdate', this.onScopeChange.bind(this));
    this.on('beforeCreate', this.setSortValue.bind(this));
  }

  unbind() {
    super.unbind();
    this.off('beforeUpdate', this.onScopeChange.bind(this));
    this.off('beforeCreate', this.setSortValue.bind(this));
    this.off('afterSync', this.initRecordsSortValue.bind(this));
  }

}

exports.SortField = SortField;