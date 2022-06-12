"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionWrapperBuilder = transactionWrapperBuilder;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function transactionWrapperBuilder(transactionGenerator) {
  return function transaction(transactionInjector) {
    return (target, name, descriptor) => {
      const oldValue = descriptor.value;
      descriptor.value = /*#__PURE__*/_asyncToGenerator(function* () {
        let transaction;
        let newTransaction = false;

        if (arguments.length > 0 && typeof arguments[0] === 'object') {
          transaction = arguments[0]['transaction'];
        }

        if (!transaction) {
          transaction = yield transactionGenerator.apply(this);
          newTransaction = true;
        } // 需要将 newTransaction 注入到被装饰函数参数内


        if (newTransaction) {
          try {
            let callArguments;

            if (_lodash().default.isPlainObject(arguments[0])) {
              callArguments = _objectSpread(_objectSpread({}, arguments[0]), {}, {
                transaction
              });
            } else if (transactionInjector) {
              callArguments = transactionInjector(arguments, transaction);
            } else if (_lodash().default.isNull(arguments[0]) || _lodash().default.isUndefined(arguments[0])) {
              callArguments = {
                transaction
              };
            } else {
              throw new Error(`please provide transactionInjector for ${name} call`);
            }

            const results = yield oldValue.apply(this, [callArguments]);
            yield transaction.commit();
            return results;
          } catch (err) {
            console.error({
              err
            });
            yield transaction.rollback();
            throw err;
          }
        } else {
          return oldValue.apply(this, arguments);
        }
      });
      return descriptor;
    };
  };
}