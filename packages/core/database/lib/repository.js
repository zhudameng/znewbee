"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

function _lodash() {
  const data = _interopRequireWildcard(require("lodash"));

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

var _filterParser = _interopRequireDefault(require("./filter-parser"));

var _optionsParser = require("./options-parser");

var _belongsToManyRepository = require("./relation-repository/belongs-to-many-repository");

var _belongsToRepository = require("./relation-repository/belongs-to-repository");

var _hasmanyRepository = require("./relation-repository/hasmany-repository");

var _hasoneRepository = require("./relation-repository/hasone-repository");

var _transactionDecorator = require("./transaction-decorator");

var _updateAssociations = require("./update-associations");

var _updateGuard = require("./update-guard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

const debug = require('debug')('noco-database');

const transaction = (0, _transactionDecorator.transactionWrapperBuilder)(function () {
  return this.collection.model.sequelize.transaction();
});

class RelationRepositoryBuilder {
  constructor(collection, associationName) {
    this.collection = void 0;
    this.associationName = void 0;
    this.association = void 0;
    this.builderMap = {
      HasOne: _hasoneRepository.HasOneRepository,
      BelongsTo: _belongsToRepository.BelongsToRepository,
      BelongsToMany: _belongsToManyRepository.BelongsToManyRepository,
      HasMany: _hasmanyRepository.HasManyRepository
    };
    this.collection = collection;
    this.associationName = associationName;
    this.association = this.collection.model.associations[this.associationName];
  }

  builder() {
    return this.builderMap;
  }

  of(id) {
    const klass = this.builder()[this.association.associationType];
    return new klass(this.collection, this.associationName, id);
  }

}

class Repository {
  constructor(collection) {
    this.database = void 0;
    this.collection = void 0;
    this.model = void 0;
    this.database = collection.context.database;
    this.collection = collection;
    this.model = collection.model;
  }
  /**
   * return count by filter
   */


  count(countOptions) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let options = countOptions ? _lodash().default.clone(countOptions) : {};
      const transaction = yield _this.getTransaction(options);

      if (countOptions === null || countOptions === void 0 ? void 0 : countOptions.filter) {
        options = _objectSpread(_objectSpread({}, options), _this.parseFilter(countOptions.filter, countOptions));
      }

      const count = yield _this.collection.model.count(_objectSpread(_objectSpread({}, options), {}, {
        distinct: true,
        transaction
      }));
      return count;
    })();
  }
  /**
   * find
   * @param options
   */


  find(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const model = _this2.collection.model;
      const transaction = yield _this2.getTransaction(options);

      const opts = _objectSpread({
        subQuery: false
      }, _this2.buildQueryOptions(options));

      if (opts.include && opts.include.length > 0) {
        // @ts-ignore
        const primaryKeyField = model.primaryKeyField || model.primaryKeyAttribute;
        const ids = (yield model.findAll(_objectSpread(_objectSpread({}, opts), {}, {
          includeIgnoreAttributes: false,
          attributes: [primaryKeyField],
          group: `${model.name}.${primaryKeyField}`,
          transaction
        }))).map(row => row.get(primaryKeyField));
        const where = {
          [primaryKeyField]: {
            [_sequelize().Op.in]: ids
          }
        };
        return yield model.findAll(_objectSpread(_objectSpread({}, (0, _lodash().omit)(opts, ['limit', 'offset'])), {}, {
          where,
          transaction
        }));
      }

      return yield model.findAll(_objectSpread(_objectSpread({}, opts), {}, {
        transaction
      }));
    })();
  }
  /**
   * find and count
   * @param options
   */


  findAndCount(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this3.getTransaction(options);
      options = _objectSpread(_objectSpread({}, options), {}, {
        transaction
      });
      return [yield _this3.find(options), yield _this3.count(options)];
    })();
  }
  /**
   * Find By Id
   *
   */


  findById(id) {
    return this.collection.model.findByPk(id);
  }
  /**
   * Find one record from database
   *
   * @param options
   */


  findOne(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this4.getTransaction(options);
      const rows = yield _this4.find(_objectSpread(_objectSpread({}, options), {}, {
        limit: 1,
        transaction
      }));
      return rows.length == 1 ? rows[0] : null;
    })();
  }
  /**
   * Save instance to database
   *
   * @param values
   * @param options
   */


  create(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this5.getTransaction(options);

      const guard = _updateGuard.UpdateGuard.fromOptions(_this5.model, _objectSpread(_objectSpread({}, options), {}, {
        action: 'create'
      }));

      const values = guard.sanitize(options.values || {});
      const instance = yield _this5.model.create(values, _objectSpread(_objectSpread({}, options), {}, {
        transaction
      }));

      if (!instance) {
        return;
      }

      yield (0, _updateAssociations.updateAssociations)(instance, values, _objectSpread(_objectSpread({}, options), {}, {
        transaction
      }));

      if (options.hooks !== false) {
        yield _this5.database.emitAsync(`${_this5.collection.name}.afterCreateWithAssociations`, instance, options);
        yield _this5.database.emitAsync(`${_this5.collection.name}.afterSaveWithAssociations`, instance, options);
      }

      return instance;
    })();
  }
  /**
   * Save Many instances to database
   *
   * @param records
   * @param options
   */


  createMany(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this6.getTransaction(options);
      const records = options.records;
      const instances = [];

      var _iterator = _createForOfIteratorHelper(records),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const values = _step.value;
          const instance = yield _this6.create({
            values,
            transaction
          });
          instances.push(instance);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return instances;
    })();
  }
  /**
   * Update model value
   *
   * @param values
   * @param options
   */


  update(options) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this7.getTransaction(options);

      const guard = _updateGuard.UpdateGuard.fromOptions(_this7.model, options);

      const values = guard.sanitize(options.values);

      const queryOptions = _this7.buildQueryOptions(options);

      const instances = yield _this7.find(_objectSpread(_objectSpread({}, queryOptions), {}, {
        transaction
      }));

      var _iterator2 = _createForOfIteratorHelper(instances),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const instance = _step2.value;
          yield (0, _updateAssociations.updateModelByValues)(instance, values, _objectSpread(_objectSpread({}, options), {}, {
            sanitized: true,
            transaction
          }));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (options.hooks !== false) {
        var _iterator3 = _createForOfIteratorHelper(instances),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            const instance = _step3.value;
            yield _this7.database.emitAsync(`${_this7.collection.name}.afterUpdateWithAssociations`, instance, options);
            yield _this7.database.emitAsync(`${_this7.collection.name}.afterSaveWithAssociations`, instance, options);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return instances;
    })();
  }

  destroy(options) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this8.getTransaction(options);
      const modelFilterKey = _this8.collection.filterTargetKey;
      options = options;

      if (options['individualHooks'] === undefined) {
        options['individualHooks'] = true;
      }

      const filterByTk = options.filterByTk && !_lodash().default.isArray(options.filterByTk) ? [options.filterByTk] : options.filterByTk;

      if (filterByTk && !options.filter) {
        return yield _this8.model.destroy(_objectSpread(_objectSpread({}, options), {}, {
          where: {
            [modelFilterKey]: {
              [_sequelize().Op.in]: filterByTk
            }
          },
          transaction
        }));
      }

      if (options.filter) {
        let pks = (yield _this8.find({
          filter: options.filter,
          transaction
        })).map(instance => instance.get(modelFilterKey));

        if (filterByTk) {
          pks = _lodash().default.intersection(pks.map(i => `${i}`), filterByTk.map(i => `${i}`));
        }

        return yield _this8.destroy(_objectSpread(_objectSpread({}, _lodash().default.omit(options, 'filter')), {}, {
          filterByTk: pks,
          transaction
        }));
      }

      if (options.truncate) {
        return yield _this8.model.destroy(_objectSpread(_objectSpread({}, options), {}, {
          truncate: true,
          transaction
        }));
      }
    })();
  }
  /**
   * @param association target association
   */


  relation(association) {
    return new RelationRepositoryBuilder(this.collection, association);
  }

  buildQueryOptions(options) {
    const parser = new _optionsParser.OptionsParser(options, {
      collection: this.collection
    });
    const params = parser.toSequelizeParams();
    debug('sequelize query params %o', params);
    return _objectSpread(_objectSpread({
      where: {}
    }, options), params);
  }

  parseFilter(filter, options) {
    const parser = new _filterParser.default(filter, {
      collection: this.collection,
      app: {
        ctx: options === null || options === void 0 ? void 0 : options.context
      }
    });
    return parser.toSequelizeParams();
  }

  getTransaction(options, autoGen = false) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (_lodash().default.isPlainObject(options) && options.transaction) {
        return options.transaction;
      }

      if (autoGen) {
        return yield _this9.model.sequelize.transaction();
      }

      return null;
    })();
  }

}

exports.Repository = Repository;

__decorate([transaction()], Repository.prototype, "create", null);

__decorate([transaction()], Repository.prototype, "createMany", null);

__decorate([transaction()], Repository.prototype, "update", null);

__decorate([transaction((args, transaction) => {
  return {
    filterByTk: args[0],
    transaction
  };
})], Repository.prototype, "destroy", null);