"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transaction = exports.RelationRepository = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _filterParser = _interopRequireDefault(require("../filter-parser"));

var _optionsParser = require("../options-parser");

var _transactionDecorator = require("../transaction-decorator");

var _updateAssociations = require("../update-associations");

var _updateGuard = require("../update-guard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const transaction = (0, _transactionDecorator.transactionWrapperBuilder)(function () {
  return this.sourceCollection.model.sequelize.transaction();
});
exports.transaction = transaction;

class RelationRepository {
  constructor(sourceCollection, association, sourceKeyValue) {
    this.sourceCollection = void 0;
    this.association = void 0;
    this.targetModel = void 0;
    this.targetCollection = void 0;
    this.associationName = void 0;
    this.associationField = void 0;
    this.sourceKeyValue = void 0;
    this.sourceInstance = void 0;
    this.db = void 0;
    this.db = sourceCollection.context.database;
    this.sourceCollection = sourceCollection;
    this.sourceKeyValue = sourceKeyValue;
    this.associationName = association;
    this.association = this.sourceCollection.model.associations[association];
    this.associationField = this.sourceCollection.getField(association);
    this.targetModel = this.association.target;
    this.targetCollection = this.sourceCollection.context.database.modelCollection.get(this.targetModel);
  }

  targetKey() {
    return this.associationField.targetKey;
  }

  accessors() {
    return this.association.accessors;
  }

  create(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const createAccessor = _this.accessors().create;

      const guard = _updateGuard.UpdateGuard.fromOptions(_this.targetModel, options);

      const values = options.values;
      const transaction = yield _this.getTransaction(options);
      const sourceModel = yield _this.getSourceModel(transaction);
      const instance = yield sourceModel[createAccessor](guard.sanitize(options.values), _objectSpread(_objectSpread({}, options), {}, {
        transaction
      }));
      yield (0, _updateAssociations.updateAssociations)(instance, values, _objectSpread(_objectSpread({}, options), {}, {
        transaction
      }));

      if (options.hooks !== false) {
        yield _this.db.emitAsync(`${_this.targetCollection.name}.afterCreateWithAssociations`, instance, _objectSpread(_objectSpread({}, options), {}, {
          transaction
        }));
        const eventName = `${_this.targetCollection.name}.afterSaveWithAssociations`;
        yield _this.db.emitAsync(eventName, instance, _objectSpread(_objectSpread({}, options), {}, {
          transaction
        }));
      }

      return instance;
    })();
  }

  getSourceModel(transaction) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.sourceInstance) {
        _this2.sourceInstance = yield _this2.sourceCollection.model.findOne({
          where: {
            [_this2.associationField.sourceKey]: _this2.sourceKeyValue
          },
          transaction
        });
      }

      return _this2.sourceInstance;
    })();
  }

  buildQueryOptions(options) {
    const parser = new _optionsParser.OptionsParser(options, {
      collection: this.targetCollection,
      targetKey: this.targetKey()
    });
    const params = parser.toSequelizeParams();
    return _objectSpread(_objectSpread({}, options), params);
  }

  parseFilter(filter, options) {
    const parser = new _filterParser.default(filter, {
      collection: this.targetCollection,
      app: {
        ctx: options === null || options === void 0 ? void 0 : options.context
      }
    });
    return parser.toSequelizeParams();
  }

  getTransaction(options, autoGen = false) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_lodash().default.isPlainObject(options) && options.transaction) {
        return options.transaction;
      }

      if (autoGen) {
        return yield _this3.sourceCollection.model.sequelize.transaction();
      }

      return null;
    })();
  }

}

exports.RelationRepository = RelationRepository;