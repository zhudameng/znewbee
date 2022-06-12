"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicAttributeModel = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _model = require("./model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

class MagicAttributeModel extends _model.Model {
  get magicAttribute() {
    const db = this.constructor.database;
    const collection = db.getCollection(this.constructor.name);
    return collection.options.magicAttribute || 'options';
  }

  set(key, value, options) {
    if (typeof key === 'string') {
      const _key$split = key.split('.'),
            _key$split2 = _slicedToArray(_key$split, 1),
            column = _key$split2[0];

      if (this.constructor.hasAlias(column)) {
        return super.set(key, value, options);
      }

      if (this.constructor.rawAttributes[column]) {
        return super.set(key, value, options);
      }

      if (_lodash().default.isPlainObject(value)) {
        const opts = super.get(this.magicAttribute) || {};
        return super.set(`${this.magicAttribute}.${key}`, (0, _utils().merge)(opts === null || opts === void 0 ? void 0 : opts[key], value), options);
      }

      return super.set(`${this.magicAttribute}.${key}`, value, options);
    } else {
      if (!key) {
        return;
      }

      Object.keys(key).forEach(k => {
        this.set(k, key[k], options);
      });
    }

    return super.set(key, value, options);
  }

  get(key, value) {
    if (typeof key === 'string') {
      const _key$split3 = key.split('.'),
            _key$split4 = _slicedToArray(_key$split3, 1),
            column = _key$split4[0];

      if (this.constructor.hasAlias(column)) {
        return super.get(key, value);
      }

      if (this.constructor.rawAttributes[column]) {
        return super.get(key, value);
      }

      const options = super.get(this.magicAttribute, value);
      return _lodash().default.get(options, key);
    }

    const data = super.get(key, value);
    return _objectSpread(_objectSpread({}, _lodash().default.omit(data, this.magicAttribute)), data[this.magicAttribute]);
  }

  update(values, options) {
    var _superprop_getUpdate = () => super.update,
        _this = this;

    return _asyncToGenerator(function* () {
      // @ts-ignore
      _this._changed = new Set();
      return _superprop_getUpdate().call(_this, values, options);
    })();
  }

}

exports.MagicAttributeModel = MagicAttributeModel;
