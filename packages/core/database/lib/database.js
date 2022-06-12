"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineCollection = exports.default = exports.Database = void 0;
exports.extend = extend;
exports.extendCollection = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _events() {
  const data = require("events");

  _events = function _events() {
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

function _path() {
  const data = require("path");

  _path = function _path() {
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

var _collection = require("./collection");

var _collectionImporter = require("./collection-importer");

var FieldTypes = _interopRequireWildcard(require("./fields"));

var _modelHook = require("./model-hook");

var _operators = _interopRequireDefault(require("./operators"));

const _excluded = ["drop"],
      _excluded2 = ["repeat"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Database extends _events().EventEmitter {
  constructor(options) {
    super();
    this.sequelize = void 0;
    this.fieldTypes = new Map();
    this.options = void 0;
    this.models = new Map();
    this.repositories = new Map();
    this.operators = new Map();
    this.collections = new Map();
    this.pendingFields = new Map();
    this.modelCollection = new Map();
    this.modelHook = void 0;
    this.delayCollectionExtend = new Map();

    if (options instanceof _sequelize().Sequelize) {
      this.sequelize = options;
    } else {
      const opts = _objectSpread({
        sync: {
          alter: {
            drop: false
          },
          force: false
        }
      }, options);

      if (options.storage && options.storage !== ':memory:') {
        if (!(0, _path().isAbsolute)(options.storage)) {
          opts.storage = (0, _path().resolve)(process.cwd(), options.storage);
        }
      }

      this.sequelize = new (_sequelize().Sequelize)(opts);
      this.options = opts;
    }

    this.collections = new Map();
    this.modelHook = new _modelHook.ModelHook(this);
    this.on('afterDefineCollection', collection => {
      var _this$pendingFields$g, _this$delayCollection;

      // after collection defined, call bind method on pending fields
      (_this$pendingFields$g = this.pendingFields.get(collection.name)) === null || _this$pendingFields$g === void 0 ? void 0 : _this$pendingFields$g.forEach(field => field.bind());
      (_this$delayCollection = this.delayCollectionExtend.get(collection.name)) === null || _this$delayCollection === void 0 ? void 0 : _this$delayCollection.forEach(collectionExtend => {
        collection.updateOptions(collectionExtend.collectionOptions, collectionExtend.mergeOptions);
      });
    }); // register database field types

    for (var _i = 0, _Object$entries = Object.entries(FieldTypes); _i < _Object$entries.length; _i++) {
      const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            field = _Object$entries$_i[1];

      if (['Field', 'RelationField'].includes(name)) {
        continue;
      }

      let key = name.replace(/Field$/g, '');
      key = key.substring(0, 1).toLowerCase() + key.substring(1);
      this.registerFieldTypes({
        [key]: field
      });
    }

    this.initOperators();
  }
  /**
   * Add collection to database
   * @param options
   */


  collection(options) {
    this.emit('beforeDefineCollection', options);
    const collection = new _collection.Collection(options, {
      database: this
    });
    this.collections.set(collection.name, collection);
    this.modelCollection.set(collection.model, collection);
    this.emit('afterDefineCollection', collection);
    return collection;
  }

  getTablePrefix() {
    return this.options.tablePrefix || '';
  }
  /**
   * get exists collection by its name
   * @param name
   */


  getCollection(name) {
    return this.collections.get(name);
  }

  hasCollection(name) {
    return this.collections.has(name);
  }

  removeCollection(name) {
    const collection = this.collections.get(name);
    this.emit('beforeRemoveCollection', collection);
    const result = this.collections.delete(name);

    if (result) {
      this.emit('afterRemoveCollection', collection);
    }
  }

  getModel(name) {
    return this.getCollection(name).model;
  }

  getRepository(name, relationId) {
    var _this$getCollection;

    if (relationId) {
      var _this$getRepository, _this$getRepository$r;

      const _name$split = name.split('.'),
            _name$split2 = _slicedToArray(_name$split, 2),
            collection = _name$split2[0],
            relation = _name$split2[1];

      return (_this$getRepository = this.getRepository(collection)) === null || _this$getRepository === void 0 ? void 0 : (_this$getRepository$r = _this$getRepository.relation(relation)) === null || _this$getRepository$r === void 0 ? void 0 : _this$getRepository$r.of(relationId);
    }

    return (_this$getCollection = this.getCollection(name)) === null || _this$getCollection === void 0 ? void 0 : _this$getCollection.repository;
  }

  addPendingField(field) {
    const associating = this.pendingFields;
    const items = this.pendingFields.get(field.target) || [];
    items.push(field);
    associating.set(field.target, items);
  }

  removePendingField(field) {
    const items = this.pendingFields.get(field.target) || [];
    const index = items.indexOf(field);

    if (index !== -1) {
      delete items[index];
      this.pendingFields.set(field.target, items);
    }
  }

  registerFieldTypes(fieldTypes) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(fieldTypes); _i2 < _Object$entries2.length; _i2++) {
      const _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            type = _Object$entries2$_i[0],
            fieldType = _Object$entries2$_i[1];

      this.fieldTypes.set(type, fieldType);
    }
  }

  registerModels(models) {
    for (var _i3 = 0, _Object$entries3 = Object.entries(models); _i3 < _Object$entries3.length; _i3++) {
      const _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            type = _Object$entries3$_i[0],
            schemaType = _Object$entries3$_i[1];

      this.models.set(type, schemaType);
    }
  }

  registerRepositories(repositories) {
    for (var _i4 = 0, _Object$entries4 = Object.entries(repositories); _i4 < _Object$entries4.length; _i4++) {
      const _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
            type = _Object$entries4$_i[0],
            schemaType = _Object$entries4$_i[1];

      this.repositories.set(type, schemaType);
    }
  }

  initOperators() {
    const operators = new Map(); // Sequelize 内置

    for (const key in _sequelize().Op) {
      operators.set('$' + key, _sequelize().Op[key]);

      const val = _sequelize().Utils.underscoredIf(key, true);

      operators.set('$' + val, _sequelize().Op[key]);
      operators.set('$' + val.replace(/_/g, ''), _sequelize().Op[key]);
    }

    this.operators = operators;
    this.registerOperators(_objectSpread({}, _operators.default));
  }

  registerOperators(operators) {
    for (var _i5 = 0, _Object$entries5 = Object.entries(operators); _i5 < _Object$entries5.length; _i5++) {
      const _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
            key = _Object$entries5$_i[0],
            operator = _Object$entries5$_i[1];

      this.operators.set(key, operator);
    }
  }

  buildField(options, context) {
    const type = options.type;
    const Field = this.fieldTypes.get(type);

    if (!Field) {
      throw Error(`unsupported field type ${type}`);
    }

    return new Field(options, context);
  }

  sync(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const isMySQL = _this.sequelize.getDialect() === 'mysql';

      if (isMySQL) {
        yield _this.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null);
      }

      const result = yield _this.sequelize.sync(options);

      if (isMySQL) {
        yield _this.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null);
      }

      return result;
    })();
  }

  clean(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const drop = options.drop,
            others = _objectWithoutProperties(options, _excluded);

      if (drop) {
        yield _this2.sequelize.getQueryInterface().dropAllTables(others);
      }
    })();
  }

  isSqliteMemory() {
    return this.sequelize.getDialect() === 'sqlite' && _lodash().default.get(this.options, 'storage') == ':memory:';
  }

  auth(options = {}) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const _options$repeat = options.repeat,
            repeat = _options$repeat === void 0 ? 10 : _options$repeat,
            others = _objectWithoutProperties(options, _excluded2);

      const delay = ms => new Promise(yea => setTimeout(yea, ms));

      let count = 1;

      const authenticate = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* () {
          try {
            yield _this3.sequelize.authenticate(others);
            console.log('Connection has been established successfully.');
            return true;
          } catch (error) {
            if (count >= repeat) {
              throw error;
            }

            console.log('reconnecting...', count);
            ++count;
            yield delay(500);
            return yield authenticate();
          }
        });

        return function authenticate() {
          return _ref.apply(this, arguments);
        };
      }();

      return yield authenticate();
    })();
  }

  reconnect() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (_this4.isSqliteMemory()) {
        return;
      } // @ts-ignore


      const ConnectionManager = _this4.sequelize.dialect.connectionManager.constructor; // @ts-ignore

      const connectionManager = new ConnectionManager(_this4.sequelize.dialect, _this4.sequelize); // @ts-ignore

      _this4.sequelize.dialect.connectionManager = connectionManager; // @ts-ignore

      _this4.sequelize.connectionManager = connectionManager;
    })();
  }

  closed() {
    // @ts-ignore
    return this.sequelize.connectionManager.pool._draining;
  }

  close() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (_this5.isSqliteMemory()) {
        return;
      }

      return _this5.sequelize.close();
    })();
  }

  on(event, listener) {
    const modelEventName = this.modelHook.isModelHook(event);

    if (modelEventName && !this.modelHook.hasBindEvent(modelEventName)) {
      this.sequelize.addHook(modelEventName, this.modelHook.sequelizeHookBuilder(modelEventName));
      this.modelHook.bindEvent(modelEventName);
    }

    return super.on(event, listener);
  }

  import(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const reader = new _collectionImporter.ImporterReader(options.directory, options.extensions);
      const modules = yield reader.read();
      const result = new Map();

      var _iterator = _createForOfIteratorHelper(modules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const module = _step.value;

          if (module.extend) {
            const collectionName = module.collectionOptions.name;

            const existCollection = _this6.getCollection(collectionName);

            if (existCollection) {
              existCollection.updateOptions(module.collectionOptions, module.mergeOptions);
            } else {
              const existDelayExtends = _this6.delayCollectionExtend.get(collectionName) || [];

              _this6.delayCollectionExtend.set(collectionName, [...existDelayExtends, module]);
            }
          } else {
            const collection = _this6.collection(module);

            result.set(collection.name, collection);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    })();
  }

}

exports.Database = Database;

function extend(collectionOptions, mergeOptions) {
  return {
    collectionOptions,
    mergeOptions,
    extend: true
  };
}

const defineCollection = collectionOptions => {
  return collectionOptions;
};

exports.defineCollection = defineCollection;

const extendCollection = (collectionOptions, mergeOptions) => {
  return {
    collectionOptions,
    mergeOptions,
    extend: true
  };
};

exports.extendCollection = extendCollection;
(0, _utils().applyMixins)(Database, [_utils().AsyncEmitter]);
var _default = Database;
exports.default = _default;
