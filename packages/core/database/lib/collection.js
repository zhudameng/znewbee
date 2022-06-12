"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = void 0;

function _deepmerge() {
  const data = _interopRequireDefault(require("deepmerge"));

  _deepmerge = function _deepmerge() {
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

var _model = require("./model");

var _repository = require("./repository");

const _excluded = ["name"],
      _excluded2 = ["name"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Collection extends _events().EventEmitter {
  get filterTargetKey() {
    return _lodash().default.get(this.options, 'filterTargetKey', this.model.primaryKeyAttribute);
  }

  get name() {
    return this.options.name;
  }

  constructor(options, context) {
    super();
    this.options = void 0;
    this.context = void 0;
    this.isThrough = void 0;
    this.fields = new Map();
    this.model = void 0;
    this.repository = void 0;
    this.context = context;
    this.options = options;
    this.bindFieldEventListener();
    this.modelInit();
    this.setFields(options.fields);
    this.setRepository(options.repository);
    this.setSortable(options.sortable);
  }

  sequelizeModelOptions() {
    const _this$options = this.options,
          name = _this$options.name,
          tableName = _this$options.tableName;
    return _objectSpread(_objectSpread({}, _lodash().default.omit(this.options, ['name', 'fields', 'model', 'targetKey'])), {}, {
      modelName: name,
      sequelize: this.context.database.sequelize,
      tableName: tableName || name
    });
  }
  /**
   * TODO
   */


  modelInit() {
    if (this.model) {
      return;
    }

    const _this$options2 = this.options,
          name = _this$options2.name,
          model = _this$options2.model,
          _this$options2$autoGe = _this$options2.autoGenId,
          autoGenId = _this$options2$autoGe === void 0 ? true : _this$options2$autoGe;
    let M = _model.Model;

    if (this.context.database.sequelize.isDefined(name)) {
      const m = this.context.database.sequelize.model(name);

      if (m.isThrough) {
        // @ts-ignore
        this.model = m; // @ts-ignore

        this.model.database = this.context.database; // @ts-ignore

        this.model.collection = this;
        return;
      }
    }

    if (typeof model === 'string') {
      M = this.context.database.models.get(model) || _model.Model;
    } else if (model) {
      M = model;
    } // @ts-ignore


    this.model = class extends M {};
    this.model.init(null, this.sequelizeModelOptions());

    if (!autoGenId) {
      this.model.removeAttribute('id');
    } // @ts-ignore


    this.model.database = this.context.database; // @ts-ignore

    this.model.collection = this;
  }

  setRepository(repository) {
    let repo = _repository.Repository;

    if (typeof repository === 'string') {
      repo = this.context.database.repositories.get(repository) || _repository.Repository;
    }

    this.repository = new repo(this);
  }

  bindFieldEventListener() {
    this.on('field.afterAdd', field => {
      field.bind();
    });
    this.on('field.afterRemove', field => field.unbind());
  }

  forEachField(callback) {
    return [...this.fields.values()].forEach(callback);
  }

  findField(callback) {
    return [...this.fields.values()].find(callback);
  }

  hasField(name) {
    return this.fields.has(name);
  }

  getField(name) {
    return this.fields.get(name);
  }

  addField(name, options) {
    return this.setField(name, options);
  }

  setField(name, options) {
    const database = this.context.database;
    const field = database.buildField(_objectSpread({
      name
    }, options), _objectSpread(_objectSpread({}, this.context), {}, {
      collection: this
    }));
    this.removeField(name);
    this.fields.set(name, field);
    this.emit('field.afterAdd', field);
    return field;
  }

  setFields(fields, resetFields = true) {
    if (!Array.isArray(fields)) {
      return;
    }

    if (resetFields) {
      this.resetFields();
    }

    var _iterator = _createForOfIteratorHelper(fields),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const _ref = _step.value;

        const name = _ref.name,
              options = _objectWithoutProperties(_ref, _excluded);

        this.addField(name, options);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  resetFields() {
    const fieldNames = this.fields.keys();

    var _iterator2 = _createForOfIteratorHelper(fieldNames),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        const fieldName = _step2.value;
        this.removeField(fieldName);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  removeField(name) {
    if (!this.fields.has(name)) {
      return;
    }

    const field = this.fields.get(name);
    const bool = this.fields.delete(name);

    if (bool) {
      this.emit('field.afterRemove', field);
    }

    return bool;
  }
  /**
   * TODO
   */


  updateOptions(options, mergeOptions) {
    let newOptions = _lodash().default.cloneDeep(options);

    newOptions = (0, _deepmerge().default)(this.options, newOptions, mergeOptions);
    this.context.database.emit('beforeUpdateCollection', this, newOptions);
    this.setFields(options.fields, false);
    this.setRepository(options.repository);
    this.context.database.emit('afterUpdateCollection', this);
    return this;
  }

  setSortable(sortable) {
    if (!sortable) {
      return;
    }

    if (sortable === true) {
      this.setField('sort', {
        type: 'sort',
        hidden: true
      });
    }

    if (typeof sortable === 'string') {
      this.setField(sortable, {
        type: 'sort',
        hidden: true
      });
    } else if (typeof sortable === 'object') {
      const name = sortable.name,
            opts = _objectWithoutProperties(sortable, _excluded2);

      this.setField(name || 'sort', _objectSpread({
        type: 'sort',
        hidden: true
      }, opts));
    }
  }
  /**
   * TODO
   *
   * @param name
   * @param options
   */


  updateField(name, options) {
    if (!this.hasField(name)) {
      throw new Error(`field ${name} not exists`);
    }

    if (options.name && options.name !== name) {
      this.removeField(name);
    }

    this.setField(options.name || name, options);
  }

  sync(syncOptions) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const modelNames = [_this.model.name];
      const associations = _this.model.associations;

      for (const associationKey in associations) {
        const association = associations[associationKey];
        modelNames.push(association.target.name);

        if (association.through) {
          modelNames.push(association.through.model.name);
        }
      }

      const models = []; // @ts-ignore

      _this.context.database.sequelize.modelManager.forEachModel(model => {
        if (modelNames.includes(model.name)) {
          models.push(model);
        }
      });

      for (var _i = 0, _models = models; _i < _models.length; _i++) {
        const model = _models[_i];
        yield model.sync(syncOptions);
      }
    })();
  }

}

exports.Collection = Collection;