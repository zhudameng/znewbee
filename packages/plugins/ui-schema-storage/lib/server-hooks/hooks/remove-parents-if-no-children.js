"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeParentsIfNoChildren = removeParentsIfNoChildren;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function removeParentsIfNoChildren(_x) {
  return _removeParentsIfNoChildren.apply(this, arguments);
}

function _removeParentsIfNoChildren() {
  _removeParentsIfNoChildren = _asyncToGenerator(function* ({
    schemaInstance,
    db,
    options,
    params
  }) {
    const transaction = options.transaction,
          oldParentUid = options.oldParentUid;
    const uiSchemaRepository = db.getRepository('uiSchemas');
    yield uiSchemaRepository.recursivelyRemoveIfNoChildren({
      transaction,
      uid: oldParentUid,
      breakRemoveOn: params === null || params === void 0 ? void 0 : params.breakRemoveOn
    });
  });
  return _removeParentsIfNoChildren.apply(this, arguments);
}