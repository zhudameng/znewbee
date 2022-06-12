"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollectionManager = void 0;

var _shared = require("@formily/shared");

var _react = require("react");

var _context = require("../context");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCollectionManager = function useCollectionManager() {
  var _useContext = (0, _react.useContext)(_context.CollectionManagerContext),
      _refreshCM = _useContext.refreshCM,
      service = _useContext.service,
      interfaces = _useContext.interfaces,
      collections = _useContext.collections;

  return {
    service: service,
    interfaces: interfaces,
    collections: collections,
    refreshCM: function refreshCM() {
      return _refreshCM === null || _refreshCM === void 0 ? void 0 : _refreshCM();
    },
    get: function get(name) {
      return collections === null || collections === void 0 ? void 0 : collections.find(function (collection) {
        return collection.name === name;
      });
    },
    getCollection: function getCollection(name) {
      if (typeof name !== 'string') {
        return name;
      }

      return collections === null || collections === void 0 ? void 0 : collections.find(function (collection) {
        return collection.name === name;
      });
    },
    getCollectionFields: function getCollectionFields(name) {
      var collection = collections === null || collections === void 0 ? void 0 : collections.find(function (collection) {
        return collection.name === name;
      });
      return (collection === null || collection === void 0 ? void 0 : collection.fields) || [];
    },
    getCollectionField: function getCollectionField(name) {
      var _collection$fields;

      var _name$split = name.split('.'),
          _name$split2 = _slicedToArray(_name$split, 2),
          collectionName = _name$split2[0],
          fieldName = _name$split2[1];

      if (!fieldName) {
        return;
      }

      var collection = collections === null || collections === void 0 ? void 0 : collections.find(function (collection) {
        return collection.name === collectionName;
      });

      if (!collection) {
        return;
      }

      return collection === null || collection === void 0 ? void 0 : (_collection$fields = collection.fields) === null || _collection$fields === void 0 ? void 0 : _collection$fields.find(function (field) {
        return field.name === fieldName;
      });
    },
    getInterface: function getInterface(name) {
      return interfaces[name] ? (0, _shared.clone)(interfaces[name]) : null;
    }
  };
};

exports.useCollectionManager = useCollectionManager;