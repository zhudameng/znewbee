"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.table2resource = table2resource;

function _resourcer() {
  const data = require("@znewbee/resourcer");

  _resourcer = function _resourcer() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function table2resource() {
  return /*#__PURE__*/function () {
    var _table2resource = _asyncToGenerator(function* (ctx, next) {
      const resourcer = ctx.resourcer;
      const database = ctx.db;
      let params = (0, _resourcer().parseRequest)({
        path: ctx.request.path,
        method: ctx.request.method
      }, {
        prefix: resourcer.options.prefix,
        accessors: resourcer.options.accessors
      });

      if (!params) {
        return next();
      }

      const resourceName = (0, _resourcer().getNameByParams)(params); // 如果资源名称未被定义

      if (resourcer.isDefined(resourceName)) {
        return next();
      }

      const _resourceName$split = resourceName.split('.'),
            _resourceName$split2 = _slicedToArray(_resourceName$split, 2),
            collectionName = _resourceName$split2[0],
            fieldName = _resourceName$split2[1]; // 如果经过加载后是已经定义的表


      if (!database.hasCollection(collectionName)) {
        return next();
      }

      const collection = database.getCollection(collectionName);
      let resourceType = 'single';

      if (fieldName && collection.hasField(fieldName)) {
        const field = collection.getField(fieldName);
        resourceType = field.type;
      }

      resourcer.define({
        type: resourceType,
        name: resourceName
      });
      return next();
    });

    function table2resource(_x, _x2) {
      return _table2resource.apply(this, arguments);
    }

    return table2resource;
  }();
}

var _default = table2resource;
exports.default = _default;
