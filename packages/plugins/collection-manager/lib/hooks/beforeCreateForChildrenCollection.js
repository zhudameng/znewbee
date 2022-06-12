"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeCreateForChildrenCollection = beforeCreateForChildrenCollection;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function beforeCreateForChildrenCollection(db) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (model, {
      transaction,
      context
    }) {
      const Collection = db.getCollection('collections');
      const Field = db.getCollection('fields');
      const parentKey = model.get('parentKey');

      if (!parentKey) {
        return;
      }

      const parent = yield Field.model.findByPk(parentKey, {
        transaction
      });
      const parentTarget = parent.get('target');
      model.set('collectionName', parentTarget);
      const collection = yield Collection.model.findOne({
        transaction,
        where: {
          name: parentTarget
        }
      });

      if (!collection) {
        yield Collection.repository.create({
          values: {
            name: parentTarget,
            createdBy: true,
            updatedBy: true,
            sortable: true,
            inherit: true
          },
          transaction,
          context
        });
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}