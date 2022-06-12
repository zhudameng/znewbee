"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACLRole = void 0;

var _aclResource = require("./acl-resource");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

class ACLRole {
  constructor(acl, name) {
    this.acl = void 0;
    this.name = void 0;
    this.strategy = void 0;
    this.resources = new Map();
    this.acl = acl;
    this.name = name;
  }

  getResource(name) {
    return this.resources.get(name);
  }

  setResource(name, resource) {
    this.resources.set(name, resource);
  }

  setStrategy(value) {
    this.strategy = value;
  }

  grantResource(resourceName, options) {
    const resource = new _aclResource.ACLResource({
      role: this,
      name: resourceName
    });

    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            actionName = _Object$entries$_i[0],
            actionParams = _Object$entries$_i[1];

      resource.setAction(actionName, actionParams);
    }

    this.resources.set(resourceName, resource);
  }

  getResourceActionsParams(resourceName) {
    const resource = this.getResource(resourceName);
    return resource.getActions();
  }

  revokeResource(resourceName) {
    for (var _i2 = 0, _arr2 = [...this.resources.keys()]; _i2 < _arr2.length; _i2++) {
      const key = _arr2[_i2];

      if (key === resourceName || key.includes(`${resourceName}.`)) {
        this.resources.delete(key);
      }
    }
  }

  grantAction(path, options) {
    let _this$getResourceActi = this.getResourceActionFromPath(path),
        resource = _this$getResourceActi.resource,
        resourceName = _this$getResourceActi.resourceName,
        actionName = _this$getResourceActi.actionName;

    if (!resource) {
      resource = new _aclResource.ACLResource({
        role: this,
        name: resourceName
      });
      this.resources.set(resourceName, resource);
    }

    resource.setAction(actionName, options);
  }

  getActionParams(path) {
    const _this$getResourceActi2 = this.getResourceActionFromPath(path),
          action = _this$getResourceActi2.action;

    return action;
  }

  revokeAction(path) {
    const _this$getResourceActi3 = this.getResourceActionFromPath(path),
          resource = _this$getResourceActi3.resource,
          actionName = _this$getResourceActi3.actionName;

    resource.removeAction(actionName);
  }

  toJSON() {
    const actions = {};

    var _iterator = _createForOfIteratorHelper(this.resources.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const resourceName = _step.value;
        const resourceActions = this.getResourceActionsParams(resourceName);

        for (var _i3 = 0, _Object$keys = Object.keys(resourceActions); _i3 < _Object$keys.length; _i3++) {
          const actionName = _Object$keys[_i3];
          actions[`${resourceName}:${actionName}`] = resourceActions[actionName];
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return {
      role: this.name,
      strategy: this.strategy,
      actions
    };
  }

  getResourceActionFromPath(path) {
    const _path$split = path.split(':'),
          _path$split2 = _slicedToArray(_path$split, 2),
          resourceName = _path$split2[0],
          actionName = _path$split2[1];

    const resource = this.resources.get(resourceName);
    let action = null;

    if (resource) {
      action = resource.getAction(actionName);
    }

    return {
      resourceName,
      actionName,
      resource,
      action
    };
  }

}

exports.ACLRole = ACLRole;