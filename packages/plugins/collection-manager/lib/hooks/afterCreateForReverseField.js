"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterCreateForReverseField = afterCreateForReverseField;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function afterCreateForReverseField(db) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (model, {
      transaction
    }) {
      const Field = db.getCollection('fields');
      const reverseKey = model.get('reverseKey');

      if (!reverseKey) {
        return;
      }

      const reverse = yield Field.model.findByPk(reverseKey, {
        transaction
      });
      yield reverse.update({
        reverseKey: model.get('key')
      }, {
        hooks: false,
        transaction
      });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}