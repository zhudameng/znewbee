"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RoleModel extends _database().Model {
  writeToAcl(options) {
    const acl = options.acl;
    const roleName = this.get('name');
    let role = acl.getRole(roleName);

    if (!role) {
      role = acl.define({
        role: roleName
      });
    }

    role.setStrategy(_objectSpread(_objectSpread({}, this.get('strategy') || {}), {}, {
      allowConfigure: this.get('allowConfigure')
    }));
  }

}

exports.RoleModel = RoleModel;
