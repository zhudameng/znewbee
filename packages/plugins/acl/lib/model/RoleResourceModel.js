"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleResourceModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _acl() {
  const data = require("@znewbee/acl");

  _acl = function _acl() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class RoleResourceModel extends _database().Model {
  revoke(options) {
    return _asyncToGenerator(function* () {
      const role = options.role,
            resourceName = options.resourceName,
            grantHelper = options.grantHelper;
      role.revokeResource(resourceName);
      const targetActions = grantHelper.resourceTargetActionMap.get(`${role.name}.${resourceName}`) || [];

      var _iterator = _createForOfIteratorHelper(targetActions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const targetAction = _step.value;
          const targetActionResource = (grantHelper.targetActionResourceMap.get(targetAction) || []).filter(item => `${role.name}.${resourceName}` !== item);
          grantHelper.targetActionResourceMap.set(targetAction, targetActionResource);

          if (targetActionResource.length == 0) {
            role.revokeAction(targetAction);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      grantHelper.resourceTargetActionMap.set(`${role.name}.${resourceName}`, []);
    })();
  }

  writeToACL(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const acl = options.acl,
            associationFieldsActions = options.associationFieldsActions,
            grantHelper = options.grantHelper;

      const resourceName = _this.get('name');

      const roleName = _this.get('roleName');

      const role = acl.getRole(roleName); // revoke resource of role

      yield _this.revoke({
        role,
        resourceName,
        grantHelper
      }); // @ts-ignore

      if (_this.usingActionsConfig === false) {
        return;
      }

      const resource = new (_acl().ACLResource)({
        role,
        name: resourceName
      });
      role.resources.set(resourceName, resource); // @ts-ignore

      const actions = yield _this.getActions({
        transaction: options.transaction
      });

      var _iterator2 = _createForOfIteratorHelper(actions),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const action = _step2.value;
          yield action.writeToACL({
            acl,
            role,
            resourceName,
            associationFieldsActions,
            grantHelper: options.grantHelper
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    })();
  }

}

exports.RoleResourceModel = RoleResourceModel;
