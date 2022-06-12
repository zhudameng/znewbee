"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockDatabase = void 0;
exports.getConfigByEnv = getConfigByEnv;
exports.mockDatabase = mockDatabase;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
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

var _database = require("./database");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MockDatabase extends _database.Database {
  constructor(options) {
    super(_objectSpread({
      storage: ':memory:',
      tablePrefix: `mock_${(0, _utils().uid)(6)}_`,
      dialect: 'sqlite'
    }, options));
    this.sequelize.beforeDefine((model, opts) => {
      opts.tableName = `${this.getTablePrefix()}${opts.tableName || opts.modelName || opts.name.plural}`;
    });
  }

}

exports.MockDatabase = MockDatabase;

function getConfigByEnv() {
  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'on' ? console.log : false,
    storage: process.env.DB_STORAGE && process.env.DB_STORAGE !== ':memory:' ? (0, _path().resolve)(process.cwd(), process.env.DB_STORAGE) : ':memory:',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  };
}

function mockDatabase(options = {}) {
  const dbOptions = (0, _utils().merge)(getConfigByEnv(), options);
  return new MockDatabase(dbOptions);
}
