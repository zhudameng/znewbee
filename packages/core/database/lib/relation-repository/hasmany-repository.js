"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasManyRepository = void 0;

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

var _multipleRelationRepository = require("./multiple-relation-repository");

var _relationRepository = require("./relation-repository");

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

class HasManyRepository extends _multipleRelationRepository.MultipleRelationRepository {
  find(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const targetRepository = _this.targetCollection.repository;
      const addFilter = {
        [_this.association.foreignKey]: _this.sourceKeyValue
      };

      if (options === null || options === void 0 ? void 0 : options.filterByTk) {
        addFilter[_this.associationField.targetKey] = options.filterByTk;
      }

      return yield targetRepository.find(_objectSpread(_objectSpread({}, (0, _lodash().omit)(options, ['filterByTk'])), {}, {
        filter: {
          $and: [options.filter || {}, addFilter]
        }
      }));
    })();
  }

  destroy(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this2.getTransaction(options);
      const sourceModel = yield _this2.getSourceModel(transaction);
      const where = [{
        [_this2.association.foreignKey]: sourceModel.get(_this2.association.sourceKey)
      }];

      if (options && options['filter']) {
        const filterResult = _this2.parseFilter(options['filter'], options);

        if (filterResult.include && filterResult.include.length > 0) {
          return yield _this2.destroyByFilter(options['filter'], transaction);
        }

        where.push(filterResult.where);
      }

      if (options && options['filterByTk']) {
        if (typeof options === 'object' && options['filterByTk']) {
          options = options['filterByTk'];
        }

        where.push({
          [_this2.targetKey()]: options
        });
      }

      yield _this2.targetModel.destroy({
        where: {
          [_sequelize().Op.and]: where
        },
        individualHooks: true,
        transaction
      });
      return true;
    })();
  }

  handleKeyOfAdd(options) {
    let handleKeys;

    if (typeof options !== 'object' && !Array.isArray(options)) {
      handleKeys = [options];
    } else {
      handleKeys = options['pk'];
    }

    return handleKeys;
  }

  set(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this3.getTransaction(options);
      const sourceModel = yield _this3.getSourceModel(transaction);
      yield sourceModel[_this3.accessors().set](_this3.handleKeyOfAdd(options), {
        transaction
      });
    })();
  }

  add(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this4.getTransaction(options);
      const sourceModel = yield _this4.getSourceModel(transaction);
      yield sourceModel[_this4.accessors().add](_this4.handleKeyOfAdd(options), {
        transaction
      });
    })();
  }

  accessors() {
    return this.association.accessors;
  }

}

exports.HasManyRepository = HasManyRepository;

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    filterByTk: args[0],
    transaction
  };
})], HasManyRepository.prototype, "destroy", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    pk: args[0],
    transaction
  };
})], HasManyRepository.prototype, "set", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    pk: args[0],
    transaction
  };
})], HasManyRepository.prototype, "add", null);