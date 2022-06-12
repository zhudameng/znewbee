"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSchema = removeSchema;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function removeSchema(_x) {
  return _removeSchema.apply(this, arguments);
}

function _removeSchema() {
  _removeSchema = _asyncToGenerator(function* ({
    schemaInstance,
    options,
    db,
    params
  }) {
    const transaction = options.transaction;
    const uiSchemaRepository = db.getRepository('uiSchemas');
    const uid = schemaInstance.get('x-uid');

    if (params === null || params === void 0 ? void 0 : params.removeParentsIfNoChildren) {
      yield uiSchemaRepository.removeEmptyParents({
        uid,
        breakRemoveOn: params['breakRemoveOn'],
        transaction
      });
    } else {
      yield uiSchemaRepository.remove(uid, {
        transaction
      });
    }
  });
  return _removeSchema.apply(this, arguments);
}