"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleRelationRepository = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _updateAssociations = require("../update-associations");

var _relationRepository = require("./relation-repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

class SingleRelationRepository extends _relationRepository.RelationRepository {
  remove(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this.getTransaction(options);
      const sourceModel = yield _this.getSourceModel(transaction);
      return yield sourceModel[_this.accessors().set](null, {
        transaction
      });
    })();
  }

  set(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this2.getTransaction(options);
      let handleKey = _lodash().default.isPlainObject(options) ? options.tk : options;
      const sourceModel = yield _this2.getSourceModel(transaction);
      return yield sourceModel[_this2.accessors().set](handleKey, {
        transaction
      });
    })();
  }

  find(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this3.getTransaction(options);

      const findOptions = _this3.buildQueryOptions(_objectSpread({}, options));

      const getAccessor = _this3.accessors().get;

      const sourceModel = yield _this3.getSourceModel(transaction);
      return yield sourceModel[getAccessor](_objectSpread(_objectSpread({}, findOptions), {}, {
        transaction
      }));
    })();
  }

  findOne(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      return _this4.find(options);
    })();
  }

  destroy(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this5.getTransaction(options);
      const target = yield _this5.find({
        transaction
      });
      yield target.destroy({
        transaction
      });
      return true;
    })();
  }

  update(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const transaction = yield _this6.getTransaction(options);
      const target = yield _this6.find({
        transaction
      });
      yield (0, _updateAssociations.updateModelByValues)(target, options === null || options === void 0 ? void 0 : options.values, _objectSpread(_objectSpread({}, _lodash().default.omit(options, 'values')), {}, {
        transaction
      }));
      return target;
    })();
  }

  accessors() {
    return super.accessors();
  }

}

exports.SingleRelationRepository = SingleRelationRepository;

__decorate([(0, _relationRepository.transaction)()], SingleRelationRepository.prototype, "remove", null);

__decorate([(0, _relationRepository.transaction)((args, transaction) => {
  return {
    tk: args[0],
    transaction
  };
})], SingleRelationRepository.prototype, "set", null);

__decorate([(0, _relationRepository.transaction)()], SingleRelationRepository.prototype, "destroy", null);

__decorate([(0, _relationRepository.transaction)()], SingleRelationRepository.prototype, "update", null);