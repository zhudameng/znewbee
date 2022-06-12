"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Notification extends _database().Model {
  get db() {
    return this.constructor['database'];
  }

  getReceiversByOptions() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const _this$receiver_option = _this.receiver_options,
            data = _this$receiver_option.data,
            fromTable = _this$receiver_option.fromTable,
            filter = _this$receiver_option.filter,
            dataField = _this$receiver_option.dataField;
      let receivers = [];

      if (data) {
        receivers = Array.isArray(data) ? data : [data];
      } else if (fromTable) {
        const collection = _this.db.getCollection(fromTable);

        const rows = yield collection.repository.find({
          filter
        });
        receivers = rows.map(row => row[dataField]);
      }

      return receivers;
    })();
  }

  send(options = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const transaction = options.transaction;

      if (!_this2.service) {
        _this2.service = yield _this2.getService();
      }

      const receivers = yield _this2.getReceiversByOptions();
      let to = options.to;

      if (to) {
        to = Array.isArray(to) ? to : [to];
        receivers.push(...to);
      }

      console.log(receivers);

      var _iterator = _createForOfIteratorHelper(receivers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const receiver = _step.value;

          try {
            const response = yield _this2.service.send({
              to: receiver,
              subject: _this2.getSubject(),
              html: _this2.getBody(options)
            });
            yield _this2.createLog({
              receiver,
              state: 'success',
              response
            }, {
              transaction
            });
            yield new Promise(resolve => {
              setTimeout(resolve, 100);
            });
          } catch (error) {
            console.error(error);
            yield _this2.createLog({
              receiver,
              state: 'fail',
              response: {}
            }, {
              transaction
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    })();
  }

  getSubject() {
    return this.subject;
  }

  getBody(data) {
    const compiled = _lodash().default.template(this.body);

    const body = compiled(data);
    return body;
  }

}

exports.Notification = Notification;
