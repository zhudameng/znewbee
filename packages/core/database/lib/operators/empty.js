"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _fields = require("../fields");

var _array = _interopRequireDefault(require("./array"));

function _lodash() {
  const data = _interopRequireWildcard(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

const findFilterFieldType = ctx => {
  const db = ctx.db;
  let path = ctx.path.split('.'); // remove operators

  path.pop();
  const fieldName = path.pop();
  let model = ctx.model;
  const associationPath = path;

  var _iterator = _createForOfIteratorHelper(associationPath),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const association = _step.value;

      if (_lodash().default.isNumber((0, _lodash().parseInt)(association)) || association.startsWith('$')) {
        continue;
      }

      model = model.associations[association].target;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  const collection = db.modelCollection.get(model);
  return collection.getField(fieldName);
};

var _default = {
  $empty(_, ctx) {
    const field = findFilterFieldType(ctx);

    if (field instanceof _fields.StringField) {
      return {
        [_sequelize().Op.or]: {
          [_sequelize().Op.is]: null,
          [_sequelize().Op.eq]: ''
        }
      };
    }

    if (field instanceof _fields.ArrayField) {
      return _array.default.$arrayEmpty(_, ctx);
    }

    return {
      [_sequelize().Op.is]: null
    };
  },

  $notEmpty(_, ctx) {
    const field = findFilterFieldType(ctx);

    if (field instanceof _fields.StringField) {
      return {
        [_sequelize().Op.and]: {
          [_sequelize().Op.not]: null,
          [_sequelize().Op.ne]: ''
        }
      };
    }

    if (field instanceof _fields.ArrayField) {
      return _array.default.$arrayNotEmpty(_, ctx);
    }

    return {
      [_sequelize().Op.not]: null
    };
  }

};
exports.default = _default;