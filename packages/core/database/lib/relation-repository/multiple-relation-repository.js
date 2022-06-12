"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleRelationRepository = void 0;

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

var _updateAssociations = require("../update-associations");

var _updateGuard = require("../update-guard");

var _relationRepository = require("./relation-repository");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class MultipleRelationRepository extends _relationRepository.RelationRepository {
  extendFindOptions(findOptions) {
    return findOptions;
  }

  find(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this.getTransaction(options);

      const findOptions = _objectSpread(_objectSpread({}, _this.extendFindOptions(_this.buildQueryOptions(_objectSpread({}, options)))), {}, {
        subQuery: false
      });

      const getAccessor = _this.accessors().get;

      const sourceModel = yield _this.getSourceModel(transaction);

      if (findOptions.include && findOptions.include.length > 0) {
        const ids = (yield sourceModel[getAccessor](_objectSpread(_objectSpread({}, findOptions), {}, {
          includeIgnoreAttributes: false,
          attributes: [_this.targetKey()],
          group: `${_this.targetModel.name}.${_this.targetKey()}`,
          transaction
        }))).map(row => row.get(_this.targetKey()));
        return yield sourceModel[getAccessor](_objectSpread(_objectSpread({}, (0, _lodash().omit)(findOptions, ['limit', 'offset'])), {}, {
          where: {
            [_this.targetKey()]: {
              [_sequelize().Op.in]: ids
            }
          },
          transaction
        }));
      }

      return yield sourceModel[getAccessor](_objectSpread(_objectSpread({}, findOptions), {}, {
        transaction
      }));
    })();
  }

  findAndCount(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this2.getTransaction(options, false);
      return [yield _this2.find(_objectSpread(_objectSpread({}, options), {}, {
        transaction
      })), yield _this2.count(_objectSpread(_objectSpread({}, options), {}, {
        transaction
      }))];
    })();
  }

  count(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this3.getTransaction(options);
      const sourceModel = yield _this3.getSourceModel(transaction);

      const queryOptions = _this3.buildQueryOptions(options);

      const count = yield sourceModel[_this3.accessors().get]({
        where: queryOptions.where,
        include: queryOptions.include,
        includeIgnoreAttributes: false,
        attributes: [[_sequelize().Sequelize.fn('COUNT', _sequelize().Sequelize.fn('DISTINCT', _sequelize().Sequelize.col(`${_this3.targetModel.name}.${_this3.targetKey()}`))), 'count']],
        raw: true,
        plain: true,
        transaction
      });
      return parseInt(count.count);
    })();
  }

  findOne(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this4.getTransaction(options, false);
      const rows = yield _this4.find(_objectSpread(_objectSpread({}, options), {}, {
        limit: 1,
        transaction
      }));
      return rows.length == 1 ? rows[0] : null;
    })();
  }

  remove(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this5.getTransaction(options);
      let handleKeys = options['tk'];

      if (!Array.isArray(handleKeys)) {
        handleKeys = [handleKeys];
      }

      const sourceModel = yield _this5.getSourceModel(transaction);
      yield sourceModel[_this5.accessors().removeMultiple](handleKeys, {
        transaction
      });
      return;
    })();
  }

  update(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this6.getTransaction(options);

      const guard = _updateGuard.UpdateGuard.fromOptions(_this6.targetModel, options);

      const values = guard.sanitize(options.values);

      const queryOptions = _this6.buildQueryOptions(options);

      const instances = yield _this6.find(_objectSpread(_objectSpread({}, queryOptions), {}, {
        transaction
      }));

      var _iterator = _createForOfIteratorHelper(instances),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const instance = _step.value;
          yield (0, _updateAssociations.updateModelByValues)(instance, values, _objectSpread(_objectSpread({}, options), {}, {
            sanitized: true,
            sourceModel: _this6.sourceInstance,
            transaction
          }));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(instances),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const instance = _step2.value;

          if (options.hooks !== false) {
            yield _this6.db.emitAsync(`${_this6.targetCollection.name}.afterUpdateWithAssociations`, instance, _objectSpread(_objectSpread({}, options), {}, {
              transaction
            }));
            yield _this6.db.emitAsync(`${_this6.targetCollection.name}.afterSaveWithAssociations`, instance, _objectSpread(_objectSpread({}, options), {}, {
              transaction
            }));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return instances;
    })();
  }

  destroy(options) {
    return _asyncToGenerator(function* () {
      return false;
    })();
  }

  destroyByFilter(filter, transaction) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const instances = yield _this7.find({
        filter: filter,
        transaction
      });
      return yield _this7.destroy({
        filterByTk: instances.map(instance => instance.get(_this7.targetCollection.filterTargetKey)),
        transaction
      });
    })();
  }

  filterHasInclude(filter, options) {
    const filterResult = this.parseFilter(filter, options);
    return filterResult.include && filterResult.include.length > 0;
  }

  accessors() {
    return super.accessors();
  }

}

exports.MultipleRelationRepository = MultipleRelationRepository;

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    tk: args[0],
    transaction
  };
})], MultipleRelationRepository.prototype, "remove", null);

__decorate([(0, _relationRepository.transaction)()], MultipleRelationRepository.prototype, "update", null);