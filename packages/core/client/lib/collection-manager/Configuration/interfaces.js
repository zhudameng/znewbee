"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.interfaces = void 0;
exports.registerField = registerField;
exports.registerGroupLabel = registerGroupLabel;

var _set = _interopRequireDefault(require("lodash/set"));

var types = _interopRequireWildcard(require("../interfaces"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var interfaces = new Map();
exports.interfaces = interfaces;
var fields = {};
var groupLabels = {};

function registerField(group, type, schema) {
  fields[group] = fields[group] || {};
  (0, _set.default)(fields, [group, type], schema);
  interfaces.set(type, schema);
}

function registerGroupLabel(key, label) {
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
var options = Object.keys(groupLabels).map(function (groupName) {
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
exports.options = options;