"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _flat() {
  const data = require("flat");

  _flat = function _flat() {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const debug = require('debug')('noco-database');

class FilterParser {
  constructor(filter, context) {
    this.collection = void 0;
    this.database = void 0;
    this.model = void 0;
    this.filter = void 0;
    this.context = void 0;
    const collection = context.collection;
    this.collection = collection;
    this.context = context;
    this.model = collection.model;
    this.filter = this.prepareFilter(filter);
    this.database = collection.context.database;
  }

  prepareFilter(filter) {
    if (_lodash().default.isPlainObject(filter)) {
      const renamedKey = {};

      for (var _i = 0, _Object$keys = Object.keys(filter); _i < _Object$keys.length; _i++) {
        const key = _Object$keys[_i];

        if (key.endsWith('.$exists') || key.endsWith('.$notExists')) {
          const keyArr = key.split('.');

          if (keyArr[keyArr.length - 2] == 'id') {
            continue;
          }

          keyArr.splice(keyArr.length - 1, 0, 'id');
          renamedKey[key] = keyArr.join('.');
        }
      }

      for (var _i2 = 0, _Object$entries = Object.entries(renamedKey); _i2 < _Object$entries.length; _i2++) {
        const _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              oldKey = _Object$entries$_i[0],
              newKey = _Object$entries$_i[1];

        // @ts-ignore
        filter[newKey] = filter[oldKey];
        delete filter[oldKey];
      }
    }

    return filter;
  }

  toSequelizeParams() {
    debug('filter %o', this.filter);

    if (!this.filter) {
      return {};
    }

    const filter = this.filter;
    const model = this.model; // supported operators

    const operators = this.database.operators;

    const originalFiler = _lodash().default.cloneDeep(filter || {});

    const flattenedFilter = (0, _flat().flatten)(filter || {});
    debug('flattened filter %o', flattenedFilter);
    const include = {};
    const where = {};

    const filter2 = _lodash().default.cloneDeep(flattenedFilter);

    let skipPrefix = null;
    const associations = model.associations;
    debug('associations %O', associations);

    for (var _i3 = 0, _Object$entries2 = Object.entries(flattenedFilter); _i3 < _Object$entries2.length; _i3++) {
      let _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      // 处理 filter 条件
      if (skipPrefix && key.startsWith(skipPrefix)) {
        continue;
      }

      debug('handle filter key "%s: "%s"', key, value);
      let keys = key.split('.'); // paths ?

      const paths = []; // origins ?

      const origins = [];

      while (keys.length) {
        debug('keys: %o, paths: %o, origins: %o', keys, paths, origins); // move key from keys to origins

        const firstKey = keys.shift();
        origins.push(firstKey);
        debug('origins: %o', origins);

        if (firstKey.startsWith('$')) {
          if (operators.has(firstKey)) {
            debug('%s is operator', firstKey); // if firstKey is operator

            const opKey = operators.get(firstKey);
            debug('operator key %s, operator: %o', firstKey, opKey); // 默认操作符

            if (typeof opKey === 'symbol') {
              paths.push(opKey);
              continue;
            } else if (typeof opKey === 'function') {
              skipPrefix = origins.join('.');

              const queryValue = _lodash().default.get((0, _flat().unflatten)(originalFiler), skipPrefix);

              value = opKey(queryValue, {
                app: this.context.app,
                db: this.database,
                path: skipPrefix,
                fieldName: this.getFieldNameFromQueryPath(skipPrefix),
                model: this.model
              });
              break;
            }
          } else {
            paths.push(firstKey);
            continue;
          }
        } // firstKey is number


        if (!_lodash().default.isNaN(parseInt(firstKey))) {
          paths.push(firstKey);
          continue;
        } // firstKey is not association


        if (!associations[firstKey]) {
          paths.push(firstKey);
          continue;
        }

        const associationKeys = [];
        associationKeys.push(firstKey);
        debug('associationKeys %o', associationKeys); // set sequelize include option

        _lodash().default.set(include, firstKey, {
          association: firstKey,
          attributes: [] // out put empty fields by default

        }); // association target model


        let target = associations[firstKey].target;
        debug('association target %o', target);

        while (target) {
          const attr = keys.shift();
          origins.push(attr); // if it is target model attribute

          if (target.rawAttributes[attr]) {
            associationKeys.push(attr);
            target = null;
          } else if (target.associations[attr]) {
            // if it is target model association (nested association filter)
            associationKeys.push(attr);
            const assoc = [];
            associationKeys.forEach((associationKey, index) => {
              if (index > 0) {
                assoc.push('include');
              }

              assoc.push(associationKey);
            });

            _lodash().default.set(include, assoc, {
              association: attr,
              attributes: []
            });

            target = target.associations[attr].target;
          } else {
            throw new Error(`${attr} neither ${firstKey}'s association nor ${firstKey}'s attribute`);
          }
        }

        debug('associationKeys %o', associationKeys);

        if (associationKeys.length > 1) {
          paths.push(`$${associationKeys.join('.')}$`);
        } else {
          paths.push(firstKey);
        }
      }

      debug('where %o, paths %o, value, %o', where, paths, value);

      const values = _lodash().default.get(where, paths);

      if (values && typeof values === 'object' && value && typeof value === 'object') {
        value = _objectSpread(_objectSpread({}, value), values);
      }

      _lodash().default.set(where, paths, value);
    }

    const toInclude = items => {
      return Object.values(items).map(item => {
        if (item.include) {
          item.include = toInclude(item.include);
        }

        return item;
      });
    };

    debug('where %o, include %o', where, include);
    return {
      where,
      include: toInclude(include)
    };
  }

  getFieldNameFromQueryPath(queryPath) {
    const paths = queryPath.split('.');
    let fieldName;

    var _iterator = _createForOfIteratorHelper(paths),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const path = _step.value;

        if (path.startsWith('$') || !_lodash().default.isNaN(parseInt(path))) {
          continue;
        }

        fieldName = path;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return fieldName;
  }

}

exports.default = FilterParser;