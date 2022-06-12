"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PER_PAGE = exports.DEFAULT_PAGE = void 0;
exports.list = list;

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const DEFAULT_PAGE = 1;
exports.DEFAULT_PAGE = DEFAULT_PAGE;
const DEFAULT_PER_PAGE = 20;
exports.DEFAULT_PER_PAGE = DEFAULT_PER_PAGE;

function pageArgsToLimitArgs(page, pageSize) {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize
  };
}

function totalPage(total, pageSize) {
  return Math.ceil(total / pageSize);
}

function findArgs(params) {
  const fields = params.fields,
        filter = params.filter,
        appends = params.appends,
        except = params.except,
        sort = params.sort;
  return {
    filter,
    fields,
    appends,
    except,
    sort
  };
}

function listWithPagination(_x) {
  return _listWithPagination.apply(this, arguments);
}

function _listWithPagination() {
  _listWithPagination = _asyncToGenerator(function* (ctx) {
    const _ctx$action$params = ctx.action.params,
          _ctx$action$params$pa = _ctx$action$params.page,
          page = _ctx$action$params$pa === void 0 ? DEFAULT_PAGE : _ctx$action$params$pa,
          _ctx$action$params$pa2 = _ctx$action$params.pageSize,
          pageSize = _ctx$action$params$pa2 === void 0 ? DEFAULT_PER_PAGE : _ctx$action$params$pa2;
    const repository = (0, _utils.getRepositoryFromParams)(ctx);

    const _yield$repository$fin = yield repository.findAndCount(_objectSpread(_objectSpread({
      context: ctx
    }, findArgs(ctx.action.params)), pageArgsToLimitArgs(parseInt(String(page)), parseInt(String(pageSize))))),
          _yield$repository$fin2 = _slicedToArray(_yield$repository$fin, 2),
          rows = _yield$repository$fin2[0],
          count = _yield$repository$fin2[1];

    ctx.body = {
      count,
      rows,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPage: totalPage(count, pageSize)
    };
  });
  return _listWithPagination.apply(this, arguments);
}

function listWithNonPaged(_x2) {
  return _listWithNonPaged.apply(this, arguments);
}

function _listWithNonPaged() {
  _listWithNonPaged = _asyncToGenerator(function* (ctx) {
    const repository = (0, _utils.getRepositoryFromParams)(ctx);
    const rows = yield repository.find(findArgs(ctx.action.params));
    ctx.body = rows;
  });
  return _listWithNonPaged.apply(this, arguments);
}

function list(_x3, _x4) {
  return _list.apply(this, arguments);
}

function _list() {
  _list = _asyncToGenerator(function* (ctx, next) {
    const paginate = ctx.action.params.paginate;

    if (paginate === false || paginate === 'false') {
      yield listWithNonPaged(ctx);
    } else {
      yield listWithPagination(ctx);
    }

    yield next();
  });
  return _list.apply(this, arguments);
}