"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BelongsToManyRepository = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

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

var _multipleRelationRepository = require("./multiple-relation-repository");

var _relationRepository = require("./relation-repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

class BelongsToManyRepository extends _multipleRelationRepository.MultipleRelationRepository {
  create(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this.getTransaction(options);

      const createAccessor = _this.accessors().create;

      const values = options.values || {};
      const sourceModel = yield _this.getSourceModel(transaction);

      const createOptions = _objectSpread(_objectSpread({}, options), {}, {
        through: values[_this.throughName()],
        transaction
      });

      return sourceModel[createAccessor](values, createOptions);
    })();
  }

  destroy(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this2.getTransaction(options);
      const association = _this2.association;

      const instancesToIds = instances => {
        return instances.map(instance => instance.get(_this2.targetKey()));
      }; // Through Table


      const throughTableWhere = [{
        [association.foreignKey]: _this2.sourceKeyValue
      }];
      let ids;

      if (options && options['filter']) {
        const instances = yield _this2.find({
          filter: options['filter'],
          transaction
        });
        ids = instancesToIds(instances);
      }

      if (options && options['filterByTk']) {
        const instances = _this2.association.toInstanceArray(options['filterByTk']);

        ids = ids ? _lodash().default.intersection(ids, instancesToIds(instances)) : instancesToIds(instances);
      }

      if (options && !options['filterByTk'] && !options['filter']) {
        const sourceModel = yield _this2.getSourceModel(transaction);
        const instances = yield sourceModel[_this2.accessors().get]({
          transaction
        });
        ids = instancesToIds(instances);
      }

      throughTableWhere.push({
        [association.otherKey]: {
          [_sequelize().Op.in]: ids
        }
      }); // delete through table data

      yield _this2.throughModel().destroy({
        where: throughTableWhere,
        transaction
      });
      yield _this2.targetModel.destroy({
        where: {
          [_this2.targetKey()]: {
            [_sequelize().Op.in]: ids
          }
        },
        transaction
      });
      return true;
    })();
  }

  setTargets(call, options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let handleKeys;
      const transaction = yield _this3.getTransaction(options, false);

      if (_lodash().default.isPlainObject(options)) {
        options = options.tk || [];
      }

      if (_lodash().default.isString(options) || _lodash().default.isNumber(options)) {
        handleKeys = [options];
      } // if it is type primaryKeyWithThroughValues
      else if (_lodash().default.isArray(options) && options.length == 2 && _lodash().default.isPlainObject(options[0][1])) {
        handleKeys = [options];
      } else {
        handleKeys = options;
      }

      const sourceModel = yield _this3.getSourceModel(transaction);
      const setObj = handleKeys.reduce((carry, item) => {
        if (Array.isArray(item)) {
          carry[item[0]] = item[1];
        } else {
          carry[item] = true;
        }

        return carry;
      }, {});
      yield sourceModel[_this3.accessors()[call]](Object.keys(setObj), {
        transaction
      });

      for (var _i = 0, _Object$entries = Object.entries(setObj); _i < _Object$entries.length; _i++) {
        const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              id = _Object$entries$_i[0],
              throughValues = _Object$entries$_i[1];

        if (typeof throughValues === 'object') {
          const instance = yield _this3.targetModel.findByPk(id, {
            transaction
          });
          yield (0, _updateAssociations.updateThroughTableValue)(instance, _this3.throughName(), throughValues, sourceModel, transaction);
        }
      }
    })();
  }

  add(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      yield _this4.setTargets('add', options);
    })();
  }

  set(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      yield _this5.setTargets('set', options);
    })();
  }

  toggle(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this6.getTransaction(options);
      const sourceModel = yield _this6.getSourceModel(transaction);
      const has = yield sourceModel[_this6.accessors().hasSingle](options['tk'], {
        transaction
      });

      if (has) {
        yield _this6.remove(_objectSpread(_objectSpread({}, options), {}, {
          transaction
        }));
      } else {
        yield _this6.add(_objectSpread(_objectSpread({}, options), {}, {
          transaction
        }));
      }

      return;
    })();
  }

  extendFindOptions(findOptions) {
    let joinTableAttributes;

    if (_lodash().default.get(findOptions, 'fields')) {
      joinTableAttributes = [];
    }

    return _objectSpread(_objectSpread({}, findOptions), {}, {
      joinTableAttributes
    });
  }

  throughName() {
    return this.throughModel().name;
  }

  throughModel() {
    return this.association.through.model;
  }

}

exports.BelongsToManyRepository = BelongsToManyRepository;

__decorate([(0, _relationRepository.transaction)()], BelongsToManyRepository.prototype, "create", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    filterByTk: args[0],
    transaction
  };
})], BelongsToManyRepository.prototype, "destroy", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    tk: args[0],
    transaction
  };
})], BelongsToManyRepository.prototype, "add", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    tk: args[0],
    transaction
  };
})], BelongsToManyRepository.prototype, "set", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    tk: args[0],
    transaction
  };
})], BelongsToManyRepository.prototype, "toggle", null);