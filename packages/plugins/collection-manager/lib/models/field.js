"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class FieldModel extends _database().MagicAttributeModel {
  get db() {
    return this.constructor.database;
  }

  load(loadOptions) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const _ref = loadOptions || {},
            _ref$skipExist = _ref.skipExist,
            skipExist = _ref$skipExist === void 0 ? false : _ref$skipExist;

      const collectionName = _this.get('collectionName');

      if (!_this.db.hasCollection(collectionName)) {
        return;
      }

      const collection = _this.db.getCollection(collectionName);

      const name = _this.get('name');

      if (skipExist && collection.hasField(name)) {
        return collection.getField(name);
      }

      return collection.setField(name, _this.get());
    })();
  }

  migrate(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const field = yield _this2.load({
        transaction: options.transaction
      });

      if (!field) {
        return;
      }

      yield field.sync(options);
    })();
  }

}

exports.FieldModel = FieldModel;
