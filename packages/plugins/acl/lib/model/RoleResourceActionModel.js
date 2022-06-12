"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleResourceActionModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class RoleResourceActionModel extends _database().Model {
  writeToACL(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // @ts-ignore
      const db = _this.constructor.database;
      const resourceName = options.resourceName,
            role = options.role,
            acl = options.acl,
            associationFieldsActions = options.associationFieldsActions,
            grantHelper = options.grantHelper;

      const actionName = _this.get('name');

      const fields = _this.get('fields');

      const actionPath = `${resourceName}:${actionName}`;
      const actionParams = {
        fields
      }; // @ts-ignore

      const scope = yield _this.getScope();

      if (scope) {
        actionParams['own'] = scope.get('key') === 'own';
        actionParams['filter'] = scope.get('scope');
      }

      role.grantAction(actionPath, actionParams);
      const collection = db.getCollection(resourceName);

      if (!collection) {
        return;
      }

      const availableAction = acl.resolveActionAlias(actionName);

      var _iterator = _createForOfIteratorHelper(fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _associationFieldsAct;

          const field = _step.value;
          const collectionField = collection.getField(field);
          const fieldType = collectionField.get('interface');
          const fieldActions = associationFieldsActions === null || associationFieldsActions === void 0 ? void 0 : (_associationFieldsAct = associationFieldsActions[fieldType]) === null || _associationFieldsAct === void 0 ? void 0 : _associationFieldsAct[availableAction];
          const fieldTarget = collectionField.get('target');

          if (fieldActions) {
            // grant association actions to role
            const associationActions = fieldActions.associationActions || [];
            associationActions.forEach(associationAction => {
              const actionName = `${resourceName}.${fieldTarget}:${associationAction}`;
              role.grantAction(actionName);
            });
            const targetActions = fieldActions.targetActions || [];
            targetActions.forEach(targetAction => {
              const targetActionPath = `${fieldTarget}:${targetAction}`; // set resource target action with current resourceName

              grantHelper.resourceTargetActionMap.set(`${role.name}.${resourceName}`, [...(grantHelper.resourceTargetActionMap.get(resourceName) || []), targetActionPath]);
              grantHelper.targetActionResourceMap.set(targetActionPath, [...(grantHelper.targetActionResourceMap.get(targetActionPath) || []), `${role.name}.${resourceName}`]);
              role.grantAction(targetActionPath);
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

}

exports.RoleResourceActionModel = RoleResourceActionModel;
