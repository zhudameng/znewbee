"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerHooks = void 0;

var _hooks = require("./hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ServerHooks {
  constructor(db) {
    this.db = void 0;
    this.hooks = new Map();
    this.db = db;
    this.listen();
    this.registerHooks();
  }

  registerHooks() {
    _hooks.hooks.forEach(hook => this.register(hook.hookType, hook.hookName, hook.hookFunc));
  }

  listen() {
    var _this = this;

    this.db.on('fields.afterDestroy', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (model, options) {
        yield _this.onCollectionFieldDestroy(model, options);
        yield _this.onAnyCollectionFieldDestroy(model, options);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    this.db.on('collections.afterDestroy', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (model, options) {
        yield _this.onCollectionDestroy(model, options);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.db.on('uiSchemas.afterCreateWithAssociations', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (model, options) {
        yield _this.onUiSchemaCreate(model, options);
      });

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
    this.db.on('uiSchemaMove', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* (model, options) {
        yield _this.onUiSchemaMove(model, options);
      });

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());
  }

  callSchemaInstanceHooksByType(schemaInstance, options, type) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const hooks = schemaInstance.getServerHooksByType(type);

      var _iterator = _createForOfIteratorHelper(hooks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _this2$hooks$get;

          const hook = _step.value;
          const hookFunc = (_this2$hooks$get = _this2.hooks.get(type)) === null || _this2$hooks$get === void 0 ? void 0 : _this2$hooks$get.get(hook['method']);
          yield hookFunc({
            schemaInstance,
            options,
            db: _this2.db,
            params: hook['params']
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    })();
  }

  onUiSchemaMove(schemaInstance, options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.callSchemaInstanceHooksByType(schemaInstance, options, 'onSelfMove');
    })();
  }

  onCollectionDestroy(collectionModel, options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      yield _this4.findHooksAndCall({
        type: 'onCollectionDestroy',
        collection: collectionModel.get('name')
      }, {
        collectionInstance: collectionModel,
        options
      }, transaction);
    })();
  }

  onAnyCollectionFieldDestroy(fieldModel, options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const collectionName = fieldModel.get('collectionName');
      yield _this5.findHooksAndCall({
        type: 'onAnyCollectionFieldDestroy',
        collection: collectionName
      }, {
        collectionFieldInstance: fieldModel,
        options
      }, transaction);
    })();
  }

  onCollectionFieldDestroy(fieldModel, options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;
      const collectionName = fieldModel.get('collectionName');
      const fieldName = fieldModel.get('name');
      yield _this6.findHooksAndCall({
        type: 'onCollectionFieldDestroy',
        collection: collectionName,
        field: fieldName
      }, {
        collectionFieldInstance: fieldModel,
        options
      }, transaction);
    })();
  }

  onUiSchemaCreate(schemaInstance, options) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      yield _this7.callSchemaInstanceHooksByType(schemaInstance, options, 'onSelfCreate');
    })();
  }

  findHooksAndCall(hooksFilter, hooksArgs, transaction) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const hooks = yield _this8.db.getRepository('uiSchemaServerHooks').find({
        filter: hooksFilter,
        appends: ['uiSchema'],
        transaction
      });

      var _iterator2 = _createForOfIteratorHelper(hooks),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _this8$hooks$get;

          const hookRecord = _step2.value;
          const hoodMethodName = hookRecord.get('method');
          const hookFunc = (_this8$hooks$get = _this8.hooks.get(hookRecord.get('type'))) === null || _this8$hooks$get === void 0 ? void 0 : _this8$hooks$get.get(hoodMethodName);

          if (hookFunc) {
            yield hookFunc(_objectSpread(_objectSpread({}, hooksArgs), {}, {
              schemaInstance: hookRecord.uiSchema,
              db: _this8.db,
              params: hookRecord.get('params')
            }));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    })();
  }
  /**
   * register a server hook function
   * @param type type of server hook
   * @param name name of server hook
   * @param hookFunc server hook function
   */


  register(type, name, hookFunc) {
    if (!this.hooks.has(type)) {
      this.hooks.set(type, new Map());
    }

    const hookTypeMap = this.hooks.get(type);
    hookTypeMap.set(name, hookFunc);
  }

}

exports.ServerHooks = ServerHooks;