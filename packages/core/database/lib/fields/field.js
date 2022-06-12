"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

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

class Field {
  get name() {
    return this.options.name;
  }

  get type() {
    return this.options.type;
  }

  get dataType() {
    return this.options.dataType;
  }

  constructor(options, context) {
    this.options = void 0;
    this.context = void 0;
    this.database = void 0;
    this.collection = void 0;
    this.context = context;
    this.database = context.database;
    this.collection = context.collection;
    this.options = options || {};
    this.init();
  } // TODO


  sync(syncOptions) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.collection.sync(_objectSpread(_objectSpread({}, syncOptions), {}, {
        force: false,
        alter: {
          drop: false
        }
      }));
    })();
  }

  init() {// code
  }

  on(eventName, listener) {
    this.database.on(`${this.collection.name}.${eventName}`, listener);
    return this;
  }

  off(eventName, listener) {
    this.database.off(`${this.collection.name}.${eventName}`, listener);
    return this;
  }

  get(name) {
    return this.options[name];
  }

  merge(obj) {
    Object.assign(this.options, obj);
  }

  bind() {
    const model = this.context.collection.model;
    model.rawAttributes[this.name] = this.toSequelize(); // @ts-ignore

    model.refreshAttributes();
  }

  unbind() {
    const model = this.context.collection.model;
    model.removeAttribute(this.name);
  }

  toSequelize() {
    const opts = _lodash().default.omit(this.options, ['name']);

    if (this.dataType) {
      Object.assign(opts, {
        type: this.dataType
      });
    }

    return opts;
  }

  isSqlite() {
    return this.database.sequelize.getDialect() === 'sqlite';
  }

}

exports.Field = Field;