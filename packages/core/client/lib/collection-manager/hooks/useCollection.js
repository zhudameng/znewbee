"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollection = void 0;

var _react = require("react");

var _apiClient = require("../../api-client");

var _context = require("../context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useCollection = function useCollection() {
  var collection = (0, _react.useContext)(_context.CollectionContext);
  var api = (0, _apiClient.useAPIClient)();
  var resource = api === null || api === void 0 ? void 0 : api.resource(collection === null || collection === void 0 ? void 0 : collection.name);
  return _objectSpread(_objectSpread({}, collection), {}, {
    resource: resource,
    getField: function getField(name) {
      var _collection$fields;

      return collection === null || collection === void 0 ? void 0 : (_collection$fields = collection.fields) === null || _collection$fields === void 0 ? void 0 : _collection$fields.find(function (field) {
        return field.name === name;
      });
    }
  });
};

exports.useCollection = useCollection;