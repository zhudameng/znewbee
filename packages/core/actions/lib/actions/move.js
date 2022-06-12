"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortAbleCollection = void 0;
exports.move = move;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function move(_x, _x2) {
  return _move.apply(this, arguments);
}

function _move() {
  _move = _asyncToGenerator(function* (ctx, next) {
    const repository = (0, _utils.getRepositoryFromParams)(ctx);
    const _ctx$action$params = ctx.action.params,
          sourceId = _ctx$action$params.sourceId,
          targetId = _ctx$action$params.targetId,
          sortField = _ctx$action$params.sortField,
          targetScope = _ctx$action$params.targetScope,
          sticky = _ctx$action$params.sticky,
          method = _ctx$action$params.method;

    if (repository instanceof _database().Repository) {
      const sortAbleCollection = new SortAbleCollection(repository.collection, sortField);

      if (sourceId && targetId) {
        yield sortAbleCollection.move(sourceId, targetId, {
          insertAfter: method === 'insertAfter'
        });
      } // change scope


      if (sourceId && targetScope) {
        yield sortAbleCollection.changeScope(sourceId, targetScope, method);
      }

      if (sourceId && sticky) {
        yield sortAbleCollection.sticky(sourceId);
      }
    }

    yield next();
  });
  return _move.apply(this, arguments);
}

class SortAbleCollection {
  constructor(collection, fieldName = 'sort') {
    this.collection = void 0;
    this.field = void 0;
    this.scopeKey = void 0;
    this.collection = collection;
    this.field = collection.getField(fieldName);

    if (!(this.field instanceof _database().SortField)) {
      throw new Error(`${fieldName} is not a sort field`);
    }

    this.scopeKey = this.field.get('scopeKey');
  } // insert source position to target position


  move(sourceInstanceId, targetInstanceId, options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const sourceInstance = yield _this.collection.repository.findById(sourceInstanceId);
      const targetInstance = yield _this.collection.repository.findById(targetInstanceId);

      if (_this.scopeKey && sourceInstance.get(_this.scopeKey) !== targetInstance.get(_this.scopeKey)) {
        yield sourceInstance.update({
          [_this.scopeKey]: targetInstance.get(_this.scopeKey)
        });
      }

      yield _this.sameScopeMove(sourceInstance, targetInstance, options);
    })();
  }

  changeScope(sourceInstanceId, targetScope, method) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const sourceInstance = yield _this2.collection.repository.findById(sourceInstanceId);
      const targetScopeValue = targetScope[_this2.scopeKey];

      if (targetScopeValue && sourceInstance.get(_this2.scopeKey) !== targetScopeValue) {
        yield sourceInstance.update({
          [_this2.scopeKey]: targetScopeValue
        }, {
          silent: false
        });

        if (method === 'prepend') {
          yield _this2.sticky(sourceInstanceId);
        }
      }
    })();
  }

  sticky(sourceInstanceId) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const sourceInstance = yield _this3.collection.repository.findById(sourceInstanceId);
      yield sourceInstance.update({
        [_this3.field.get('name')]: 0
      }, {
        silent: true
      });
    })();
  }

  sameScopeMove(sourceInstance, targetInstance, options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const fieldName = _this4.field.get('name');

      const sourceSort = sourceInstance.get(fieldName);
      let targetSort = targetInstance.get(fieldName);

      if (options.insertAfter) {
        targetSort = targetSort + 1;
      }

      let scopeValue = _this4.scopeKey ? sourceInstance.get(_this4.scopeKey) : null;
      let updateCondition;
      let change;

      if (targetSort > sourceSort) {
        updateCondition = {
          [_sequelize().Op.gt]: sourceSort,
          [_sequelize().Op.lte]: targetSort
        };
        change = -1;
      } else {
        updateCondition = {
          [_sequelize().Op.lt]: sourceSort,
          [_sequelize().Op.gte]: targetSort
        };
        change = 1;
      }

      const where = {
        [fieldName]: updateCondition
      };

      if (scopeValue) {
        where[_this4.scopeKey] = {
          [_sequelize().Op.eq]: scopeValue
        };
      }

      yield _this4.collection.model.increment(fieldName, {
        where,
        by: change,
        silent: true
      });
      yield sourceInstance.update({
        [fieldName]: targetSort
      }, {
        silent: true
      });
    })();
  }

}

exports.SortAbleCollection = SortAbleCollection;
