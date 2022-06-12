"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNameByParams = getNameByParams;
exports.mergeFields = mergeFields;
exports.parseFields = parseFields;
exports.parseQuery = parseQuery;
exports.parseRequest = parseRequest;
exports.requireModule = requireModule;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _pathToRegexp() {
  const data = require("path-to-regexp");

  _pathToRegexp = function _pathToRegexp() {
    return data;
  };

  return data;
}

function _qs() {
  const data = _interopRequireDefault(require("qs"));

  _qs = function _qs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getNameByParams(params) {
  const resourceName = params.resourceName,
        associatedName = params.associatedName;
  return associatedName ? `${associatedName}.${resourceName}` : resourceName;
}

function parseRequest(request, options = {}) {
  const accessors = _objectSpread({
    // 常规 actions
    list: 'list',
    create: 'create',
    get: 'get',
    update: 'update',
    delete: 'destroy',
    // associate 操作
    add: 'add',
    set: 'set',
    remove: 'remove'
  }, options.accessors || {});

  const keys = [];
  const regexp = (0, _pathToRegexp().pathToRegexp)('/resourcer/{:associatedName.}?:resourceName{\\::actionName}', keys);
  const matches = regexp.exec(request.path);

  if (matches) {
    const params = {};
    keys.forEach((obj, index) => {
      if (matches[index + 1] === undefined) {
        return;
      }

      params[obj.name] = matches[index + 1];
    });
    return params;
  }

  const defaults = {
    single: {
      '/:resourceName': {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      '/:resourceName/:resourceIndex': {
        get: accessors.get,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      },
      '/:associatedName/:associatedIndex/:resourceName': {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      '/:associatedName/:associatedIndex/:resourceName/:resourceIndex': {
        get: accessors.get,
        post: accessors.create,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    hasOne: {
      '/:associatedName/:associatedIndex/:resourceName': {
        get: accessors.get,
        post: accessors.update,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    hasMany: {
      '/:associatedName/:associatedIndex/:resourceName': {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      '/:associatedName/:associatedIndex/:resourceName/:resourceIndex': {
        get: accessors.get,
        post: accessors.create,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    belongsTo: {
      '/:associatedName/:associatedIndex/:resourceName': {
        get: accessors.get,
        delete: accessors.remove
      },
      '/:associatedName/:associatedIndex/:resourceName/:resourceIndex': {
        post: accessors.set
      }
    },
    belongsToMany: {
      '/:associatedName/:associatedIndex/:resourceName': {
        get: accessors.list,
        post: accessors.set
      },
      '/:associatedName/:associatedIndex/:resourceName/:resourceIndex': {
        get: accessors.get,
        post: accessors.add,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.remove
      }
    }
  };
  const params = {};
  let prefix = (options.prefix || '').trim().replace(/\/$/, '');

  if (prefix && !prefix.startsWith('/')) {
    prefix = `/${prefix}`;
  }

  const _request$type = request.type,
        type = _request$type === void 0 ? 'single' : _request$type;

  for (const path in defaults[type]) {
    const keys = [];
    const regexp = (0, _pathToRegexp().pathToRegexp)(`${prefix}${path}`, keys, {});
    const matches = regexp.exec(request.path);

    if (!matches) {
      continue;
    }

    keys.forEach((obj, index) => {
      if (matches[index + 1] === undefined) {
        return;
      }

      params[obj.name] = matches[index + 1];
    });
    params.actionName = _lodash().default.get(defaults, [type, path, request.method.toLowerCase()]);
  }

  if (Object.keys(params).length === 0) {
    return false;
  }

  if (params.resourceName) {
    const _params$resourceName$ = params.resourceName.split(':'),
          _params$resourceName$2 = _slicedToArray(_params$resourceName$, 2),
          resourceName = _params$resourceName$2[0],
          actionName = _params$resourceName$2[1];

    if (actionName) {
      params.resourceName = resourceName;
      params.actionName = actionName;
    }
  }

  return params;
}

function requireModule(module) {
  if (typeof module === 'string') {
    module = require(module);
  }

  if (typeof module !== 'object') {
    return module;
  }

  return module.__esModule ? module.default : module;
}

function parseQuery(input) {
  // 自带 query 处理的不太给力，需要用 qs 转一下
  const query = _qs().default.parse(input, {
    // 原始 query string 中如果一个键连等号“=”都没有可以被认为是 null 类型
    strictNullHandling: true // 逗号分隔转换为数组
    // comma: true,

  }); // filter 支持 json string


  if (typeof query.filter === 'string') {
    query.filter = JSON.parse(query.filter);
  }

  return query;
}

function parseFields(fields) {
  if (!fields) {
    return {};
  }

  if (typeof fields === 'string') {
    fields = fields.split(',').map(field => field.trim());
  }

  if (Array.isArray(fields)) {
    const onlyFields = [];
    const output = {};
    fields.forEach(item => {
      if (typeof item === 'string') {
        onlyFields.push(item);
      } else if (typeof item === 'object') {
        if (item.only) {
          onlyFields.push(...item.only.toString().split(','));
        }

        Object.assign(output, parseFields(item));
      }
    });

    if (onlyFields.length) {
      output.only = onlyFields;
    }

    return output;
  }

  if (fields.only && typeof fields.only === 'string') {
    fields.only = fields.only.split(',').map(field => field.trim());
  }

  if (fields.except && typeof fields.except === 'string') {
    fields.except = fields.except.split(',').map(field => field.trim());
  }

  if (fields.appends && typeof fields.appends === 'string') {
    fields.appends = fields.appends.split(',').map(field => field.trim());
  }

  return fields;
}

function mergeFields(defaults, inputs) {
  let fields = {};
  defaults = parseFields(defaults);
  inputs = parseFields(inputs);

  if (inputs.only) {
    // 前端提供 only，后端提供 only
    if (defaults.only) {
      fields.only = defaults.only.filter(field => inputs.only.includes(field));
    } // 前端提供 only，后端提供 except，输出 only 排除 except
    else if (defaults.except) {
      fields.only = inputs.only.filter(field => !defaults.except.includes(field));
    } // 前端提供 only，后端没有提供 only 或 except
    else {
      fields.only = inputs.only;
    }
  } else if (inputs.except) {
    // 前端提供 except，后端提供 only，只输出 only 里排除 except 的字段
    if (defaults.only) {
      fields.only = defaults.only.filter(field => !inputs.except.includes(field));
    } // 前端提供 except，后端提供 except 或不提供，合并 except
    else {
      fields.except = _lodash().default.uniq([...inputs.except, ...(defaults.except || [])]);
    }
  } // 前端没提供 only 或 except
  else {
    fields = defaults;
  } // 如果前端提供了 appends


  if (!_lodash().default.isEmpty(inputs.appends)) {
    fields.appends = _lodash().default.uniq([...inputs.appends, ...(defaults.appends || [])]);
  }

  if (!fields.appends) {
    fields.appends = [];
  }

  return fields;
}