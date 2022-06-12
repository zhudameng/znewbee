"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

class WorkflowModel extends _database().Model {
  constructor(...args) {
    var _this;

    super(...args);
    _this = this;

    this.trigger = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (context, options = {}) {
        // `null` means not to trigger
        if (context === null) {
          return;
        }

        const transaction = yield _this.getTransaction(options);

        if (_this.useTransaction) {
          const existed = yield _this.countExecutions({
            where: {
              transaction: transaction.id
            },
            transaction
          });

          if (existed) {
            console.warn(`workflow ${_this.id} has already been triggered in same execution (${transaction.id}), and newly triggering will be skipped.`);
            return;
          }
        }

        const execution = yield _this.createExecution({
          context,
          status: _constants.EXECUTION_STATUS.STARTED,
          useTransaction: _this.useTransaction,
          transaction: transaction.id
        }, {
          transaction
        });
        const executed = yield _this.countExecutions({
          transaction
        }); // NOTE: not to trigger afterUpdate hook here

        yield _this.update({
          executed
        }, {
          transaction,
          hooks: false
        });
        execution.workflow = _this;
        yield execution.start({
          transaction
        }); // @ts-ignore

        if (transaction && (!options.transaction || options.transaction.finished)) {
          yield transaction.commit();
        }

        return execution;
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  getTransaction(options) {
    if (!this.useTransaction) {
      return null;
    }

    return options.transaction && !options.transaction.finished ? options.transaction : this.constructor.database.sequelize.transaction();
  }

}

exports.default = WorkflowModel;
