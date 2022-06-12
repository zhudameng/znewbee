"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeCreateForReverseField = beforeCreateForReverseField;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function beforeCreateForReverseField(db) {
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
      model.set('collectionName', reverse.get('target'));
      model.set('target', reverse.get('collectionName'));
      const reverseType = reverse.get('type');

      if (['hasMany', 'hasOne'].includes(reverseType)) {
        model.set('type', 'belongsTo');
        model.set('targetKey', reverse.get('sourceKey'));
        model.set('foreignKey', reverse.get('foreignKey'));
        model.set('sourceKey', reverse.get('targetKey'));
      }

      if (['belongsTo'].includes(reverseType)) {
        if (!model.get('type')) {
          model.set('type', 'hasMany');
        }

        model.set('sourceKey', reverse.get('targetKey'));
        model.set('foreignKey', reverse.get('foreignKey'));
        model.set('targetKey', reverse.get('sourceKey'));
      }

      if (['belongsToMany'].includes(reverseType)) {
        model.set('type', 'belongsToMany');
        model.set('through', reverse.get('through'));
        model.set('sourceKey', reverse.get('targetKey'));
        model.set('foreignKey', reverse.get('otherKey'));
        model.set('targetKey', reverse.get('sourceKey'));
        model.set('otherKey', reverse.get('foreignKey'));
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}