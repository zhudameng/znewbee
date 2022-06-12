function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import set from 'lodash/set';
import * as types from '../interfaces';
export var interfaces = new Map();
var fields = {};
var groupLabels = {};
export function registerField(group, type, schema) {
  fields[group] = fields[group] || {};
  set(fields, [group, type], schema);
  interfaces.set(type, schema);
}
export function registerGroupLabel(key, label) {
  groupLabels[key] = label;
}
Object.keys(types).forEach(function (type) {
  var schema = types[type];
  registerField(schema.group || 'others', type, _objectSpread({
    order: 0
  }, schema));
});
registerGroupLabel('basic', '{{t("Basic")}}');
registerGroupLabel('choices', '{{t("Choices")}}');
registerGroupLabel('media', '{{t("Media")}}');
registerGroupLabel('datetime', '{{t("Date & Time")}}');
registerGroupLabel('relation', '{{t("Relation")}}');
registerGroupLabel('systemInfo', '{{t("System info")}}');
registerGroupLabel('others', '{{t("Others")}}');
export var options = Object.keys(groupLabels).map(function (groupName) {
  return {
    label: groupLabels[groupName],
    children: Object.keys(fields[groupName] || {}).map(function (type) {
      var field = fields[groupName][type];
      return _objectSpread({
        value: type,
        label: field.title,
        name: type
      }, fields[groupName][type]);
    }).sort(function (a, b) {
      return a.order - b.order;
    })
  };
});