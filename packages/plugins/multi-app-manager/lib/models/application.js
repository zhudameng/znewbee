"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
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

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function path() {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ApplicationModel extends _database().Model {
  static getDatabaseConfig(app) {
    return _lodash().default.cloneDeep(_lodash().default.isPlainObject(app.options.database) ? app.options.database : app.options.database.options);
  }

  static handleAppStart(app, options) {
    return _asyncToGenerator(function* () {
      yield app.load();

      if (!_lodash().default.get(options, 'skipInstall', false)) {
        yield app.install();
      }

      yield app.start();
    })();
  }

  registerToMainApp(mainApp, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const appName = _this.get('name');

      const appOptions = _this.get('options') || {};
      const AppModel = _this.constructor;
      const app = mainApp.appManager.createApplication(appName, _objectSpread(_objectSpread({}, AppModel.initOptions(appName, mainApp)), appOptions)); // create database before installation if it not exists

      app.on('beforeInstall', /*#__PURE__*/function () {
        var _createDatabase = _asyncToGenerator(function* () {
          const _AppModel$getDatabase = AppModel.getDatabaseConfig(app),
                host = _AppModel$getDatabase.host,
                port = _AppModel$getDatabase.port,
                username = _AppModel$getDatabase.username,
                password = _AppModel$getDatabase.password,
                database = _AppModel$getDatabase.database,
                dialect = _AppModel$getDatabase.dialect;

          if (dialect === 'mysql') {
            const mysql = require('mysql2/promise');

            const connection = yield mysql.createConnection({
              host,
              port,
              user: username,
              password
            });
            yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
            yield connection.close();
          }

          if (dialect === 'postgres') {
            const _require = require('pg'),
                  Client = _require.Client;

            const client = new Client({
              user: username,
              host,
              password: password,
              port
            });
            yield client.connect();

            try {
              yield client.query(`CREATE DATABASE "${database}"`);
            } catch (e) {}

            yield client.end();
          }
        });

        function createDatabase() {
          return _createDatabase.apply(this, arguments);
        }

        return createDatabase;
      }());
      yield AppModel.handleAppStart(app, options);
      yield AppModel.update({
        status: 'running'
      }, {
        transaction: options.transaction,
        where: {
          [AppModel.primaryKeyAttribute]: _this.get(AppModel.primaryKeyAttribute)
        },
        hooks: false
      });
    })();
  }

  static initOptions(appName, mainApp) {
    const rawDatabaseOptions = this.getDatabaseConfig(mainApp);

    if (rawDatabaseOptions.dialect === 'sqlite') {
      const mainAppStorage = rawDatabaseOptions.storage;

      if (mainAppStorage !== ':memory:') {
        const mainStorageDir = path().dirname(mainAppStorage);
        rawDatabaseOptions.storage = path().join(mainStorageDir, `${appName}.sqlite`);
      }
    } else {
      rawDatabaseOptions.database = appName;
    }

    return {
      database: rawDatabaseOptions
    };
  }

}

exports.ApplicationModel = ApplicationModel;
