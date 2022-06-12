"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UserModel extends _database().Model {
  setDefaultRole(roleName, options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (roleName == 'anonymous') {
        return false;
      }

      const db = _this.constructor.database;
      const repository = db.getRepository('rolesUsers');

      if (!repository) {
        return false;
      }

      const transaction = options.transaction || (yield db.sequelize.transaction());

      try {
        yield repository.update({
          filter: {
            userId: _this.get('id')
          },
          values: {
            default: false
          },
          transaction
        });
        yield repository.update({
          filter: {
            userId: _this.get('id'),
            roleName
          },
          values: {
            default: true
          },
          transaction
        });
        yield transaction.commit();
      } catch (error) {
        yield transaction.rollback();
        throw error;
      }

      return true;
    })();
  }

}

exports.UserModel = UserModel;
