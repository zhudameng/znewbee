"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UiSchemaStoragePlugin = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

var _uiSchemaAction = require("./actions/ui-schema-action");

var _model = require("./model");

var _repository = _interopRequireDefault(require("./repository"));

var _serverHooks = require("./server-hooks");

var _model2 = require("./server-hooks/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UiSchemaStoragePlugin extends _server().Plugin {
  constructor(...args) {
    super(...args);
    this.serverHooks = void 0;
  }

  registerRepository() {
    this.app.db.registerRepositories({
      UiSchemaRepository: _repository.default
    });
  }

  beforeLoad() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const db = _this.app.db;
      _this.serverHooks = new _serverHooks.ServerHooks(db);

      _this.app.db.registerModels({
        MagicAttributeModel: _database().MagicAttributeModel,
        UiSchemaModel: _model.UiSchemaModel,
        ServerHookModel: _model2.ServerHookModel
      });

      _this.registerRepository();

      db.on('uiSchemas.beforeCreate', function setUid(model) {
        if (!model.get('name')) {
          model.set('name', (0, _utils().uid)());
        }
      });
      db.on('uiSchemas.afterCreate', /*#__PURE__*/function () {
        var _insertSchema = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          const uiSchemaRepository = db.getCollection('uiSchemas').repository;
          const context = options.context;

          if (context === null || context === void 0 ? void 0 : context.disableInsertHook) {
            return;
          }

          yield uiSchemaRepository.insert(model.toJSON(), {
            transaction
          });
        });

        function insertSchema(_x, _x2) {
          return _insertSchema.apply(this, arguments);
        }

        return insertSchema;
      }());
      db.on('uiSchemas.afterUpdate', /*#__PURE__*/function () {
        var _patchSchema = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          const uiSchemaRepository = db.getCollection('uiSchemas').repository;
          yield uiSchemaRepository.patch(model.toJSON(), {
            transaction
          });
        });

        function patchSchema(_x3, _x4) {
          return _patchSchema.apply(this, arguments);
        }

        return patchSchema;
      }());

      _this.app.resourcer.define({
        name: 'uiSchemas',
        actions: _uiSchemaAction.uiSchemaActions
      });

      _this.app.acl.allow('uiSchemas', '*', 'loggedIn');

      _this.app.acl.allow('uiSchemaTemplates', '*', 'loggedIn');
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.db.import({
        directory: _path().default.resolve(__dirname, 'collections')
      });
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.UiSchemaStoragePlugin = UiSchemaStoragePlugin;
var _default = UiSchemaStoragePlugin;
exports.default = _default;
