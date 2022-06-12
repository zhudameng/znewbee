"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterUpdate = afterUpdate;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

var _constants = require("../constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function afterUpdate(_x, _x2) {
  return _afterUpdate.apply(this, arguments);
}

function _afterUpdate() {
  _afterUpdate = _asyncToGenerator(function* (model, options) {
    var _options$context, _options$context$stat, _options$context$stat2;

    const db = model.constructor.database;
    const collection = db.getCollection(model.constructor.name);

    if (!collection.options.logging) {
      return;
    }

    const changed = model.changed();

    if (!changed) {
      return;
    }

    const transaction = options.transaction;
    const ActionLog = db.getCollection('action_logs');
    const currentUserId = options === null || options === void 0 ? void 0 : (_options$context = options.context) === null || _options$context === void 0 ? void 0 : (_options$context$stat = _options$context.state) === null || _options$context$stat === void 0 ? void 0 : (_options$context$stat2 = _options$context$stat.currentUser) === null || _options$context$stat2 === void 0 ? void 0 : _options$context$stat2.id;
    const changes = [];
    changed.forEach(key => {
      const field = collection.findField(field => {
        return field.name === key || field.options.field === key;
      });

      if (field && !field.options.hidden && field.options.type !== 'formula') {
        changes.push({
          field: field.options,
          after: model.get(key),
          before: model.previous(key)
        });
      }
    });

    if (!changes.length) {
      return;
    }

    try {
      const log = yield ActionLog.model.create({
        type: _constants.LOG_TYPE_UPDATE,
        collectionName: model.constructor.name,
        index: model.get(model.constructor.primaryKeyAttribute),
        createdAt: model.get('updatedAt'),
        userId: currentUserId
      }, {
        transaction,
        hooks: false
      });
      yield (0, _database().updateAssociations)(log, {
        changes
      }, {
        transaction
      }); // if (!options.transaction) {
      //   await transaction.commit();
      // }
    } catch (error) {// if (!options.transaction) {
      //   await transaction.rollback();
      // }
    }
  });
  return _afterUpdate.apply(this, arguments);
}
