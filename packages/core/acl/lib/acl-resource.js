"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACLResource = void 0;

class ACLResource {
  constructor(options) {
    this.actions = new Map();
    this.acl = void 0;
    this.role = void 0;
    this.name = void 0;
    this.acl = options.role.acl;
    this.role = options.role;
    this.name = options.name;
    const actionsOption = options.actions || {};

    for (var _i = 0, _Object$keys = Object.keys(actionsOption); _i < _Object$keys.length; _i++) {
      const actionName = _Object$keys[_i];
      this.actions.set(actionName, actionsOption[actionName]);
    }
  }

  getActions() {
    return Array.from(this.actions.keys()).reduce((carry, key) => {
      carry[key] = this.actions.get(key);
      return carry;
    }, {});
  }

  getAction(name) {
    return this.actions.get(name) || this.actions.get(this.acl.resolveActionAlias(name));
  }

  setAction(name, params) {
    const context = {
      role: this.role,
      acl: this.role.acl,
      params: params || {},
      path: `${this.name}:${name}`,
      resourceName: this.name,
      actionName: name
    };
    this.acl.emit('beforeGrantAction', context);
    this.actions.set(name, context.params);
  }

  setActions(actions) {
    for (var _i2 = 0, _Object$keys2 = Object.keys(actions); _i2 < _Object$keys2.length; _i2++) {
      const actionName = _Object$keys2[_i2];
      this.setAction(actionName, actions[actionName]);
    }
  }

  removeAction(name) {
    this.actions.delete(name);
  }

}

exports.ACLResource = ACLResource;