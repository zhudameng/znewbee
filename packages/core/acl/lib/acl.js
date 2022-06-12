"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACL = void 0;

function _events() {
  const data = _interopRequireDefault(require("events"));

  _events = function _events() {
    return data;
  };

  return data;
}

function _koaCompose() {
  const data = _interopRequireDefault(require("koa-compose"));

  _koaCompose = function _koaCompose() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _aclAvailableAction = require("./acl-available-action");

var _aclAvailableStrategy = require("./acl-available-strategy");

var _aclRole = require("./acl-role");

var _allowManager = require("./allow-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parse = require('json-templates');

class ACL extends _events().default {
  constructor() {
    super();
    this.availableActions = new Map();
    this.availableStrategy = new Map();
    this.middlewares = [];
    this.allowManager = new _allowManager.AllowManager(this);
    this.roles = new Map();
    this.actionAlias = new Map();
    this.configResources = [];
    this.beforeGrantAction(ctx => {
      if (_lodash().default.isPlainObject(ctx.params) && ctx.params.own) {
        ctx.params = _lodash().default.merge(ctx.params, _aclAvailableStrategy.predicate.own);
      }
    });
    this.beforeGrantAction(ctx => {
      const actionName = this.resolveActionAlias(ctx.actionName);

      if (_lodash().default.isPlainObject(ctx.params)) {
        if ((actionName === 'create' || actionName === 'update') && ctx.params.fields) {
          ctx.params = _objectSpread(_objectSpread({}, _lodash().default.omit(ctx.params, 'fields')), {}, {
            whitelist: ctx.params.fields
          });
        }

        if (actionName === 'view' && ctx.params.fields) {
          const appendFields = ['id', 'createdAt', 'updatedAt'];
          ctx.params = _objectSpread(_objectSpread({}, _lodash().default.omit(ctx.params, 'fields')), {}, {
            fields: [...ctx.params.fields, ...appendFields]
          });
        }
      }
    });
    this.middlewares.push(this.allowManager.aclMiddleware());
  }

  define(options) {
    const roleName = options.role;
    const role = new _aclRole.ACLRole(this, roleName);

    if (options.strategy) {
      role.strategy = options.strategy;
    }

    const actions = options.actions || {};

    for (var _i = 0, _Object$entries = Object.entries(actions); _i < _Object$entries.length; _i++) {
      const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            actionName = _Object$entries$_i[0],
            actionParams = _Object$entries$_i[1];

      role.grantAction(actionName, actionParams);
    }

    this.roles.set(roleName, role);
    return role;
  }

  getRole(name) {
    return this.roles.get(name);
  }

  removeRole(name) {
    return this.roles.delete(name);
  }

  registerConfigResources(names) {
    names.forEach(name => this.registerConfigResource(name));
  }

  registerConfigResource(name) {
    this.configResources.push(name);
  }

  isConfigResource(name) {
    return this.configResources.includes(name);
  }

  setAvailableAction(name, options) {
    this.availableActions.set(name, new _aclAvailableAction.AclAvailableAction(name, options));

    if (options.aliases) {
      const aliases = _lodash().default.isArray(options.aliases) ? options.aliases : [options.aliases];

      var _iterator = _createForOfIteratorHelper(aliases),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const alias = _step.value;
          this.actionAlias.set(alias, name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  getAvailableAction(name) {
    const actionName = this.actionAlias.get(name) || name;
    return this.availableActions.get(actionName);
  }

  getAvailableActions() {
    return this.availableActions;
  }

  setAvailableStrategy(name, options) {
    this.availableStrategy.set(name, new _aclAvailableStrategy.ACLAvailableStrategy(this, options));
  }

  beforeGrantAction(listener) {
    this.addListener('beforeGrantAction', listener);
  }

  can({
    role,
    resource,
    action
  }) {
    const aclRole = this.roles.get(role);

    if (!aclRole) {
      return null;
    }

    const aclResource = aclRole.getResource(resource);

    if (aclResource) {
      const actionParams = aclResource.getAction(action);

      if (actionParams) {
        // handle single action config
        return {
          role,
          resource,
          action,
          params: actionParams
        };
      } else {
        return null;
      }
    }

    if (!aclRole.strategy) {
      return null;
    }

    const roleStrategy = _lodash().default.isString(aclRole.strategy) ? this.availableStrategy.get(aclRole.strategy) : new _aclAvailableStrategy.ACLAvailableStrategy(this, aclRole.strategy);

    if (!roleStrategy) {
      return null;
    }

    const roleStrategyParams = roleStrategy.allow(resource, this.resolveActionAlias(action));

    if (roleStrategyParams) {
      const result = {
        role,
        resource,
        action
      };

      if (_lodash().default.isPlainObject(roleStrategyParams)) {
        result['params'] = roleStrategyParams;
      }

      return result;
    }

    return null;
  }

  isAvailableAction(actionName) {
    return this.availableActions.has(this.resolveActionAlias(actionName));
  }

  resolveActionAlias(action) {
    return this.actionAlias.get(action) ? this.actionAlias.get(action) : action;
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  allow(resourceName, actionNames, condition) {
    if (!Array.isArray(actionNames)) {
      actionNames = [actionNames];
    }

    var _iterator2 = _createForOfIteratorHelper(actionNames),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        const actionName = _step2.value;
        this.allowManager.allow(resourceName, actionName, condition);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  parseJsonTemplate(json, ctx) {
    return parse(json)({
      ctx: {
        state: JSON.parse(JSON.stringify(ctx.state))
      }
    });
  }

  middleware() {
    const acl = this;

    const filterParams = (ctx, resourceName, params) => {
      var _params$filter;

      if (params === null || params === void 0 ? void 0 : (_params$filter = params.filter) === null || _params$filter === void 0 ? void 0 : _params$filter.createdById) {
        const collection = ctx.db.getCollection(resourceName);

        if (collection && !collection.getField('createdById')) {
          return _lodash().default.omit(params, 'filter.createdById');
        }
      }

      return params;
    };

    return /*#__PURE__*/function () {
      var _ACLMiddleware = _asyncToGenerator(function* (ctx, next) {
        const roleName = ctx.state.currentRole || 'anonymous';
        const _ctx$action = ctx.action,
              resourceName = _ctx$action.resourceName,
              actionName = _ctx$action.actionName;
        const resourcerAction = ctx.action;

        ctx.can = options => {
          return acl.can(_objectSpread({
            role: roleName
          }, options));
        };

        ctx.permission = {
          can: ctx.can({
            resource: resourceName,
            action: actionName
          })
        };
        return (0, _koaCompose().default)(acl.middlewares)(ctx, /*#__PURE__*/_asyncToGenerator(function* () {
          const permission = ctx.permission;

          if (permission.skip) {
            return next();
          }

          if (!permission.can || typeof permission.can !== 'object') {
            ctx.throw(403, 'No permissions');
            return;
          }

          const params = permission.can.params;

          if (params) {
            const filteredParams = filterParams(ctx, resourceName, params);
            const parsedParams = acl.parseJsonTemplate(filteredParams, ctx);
            resourcerAction.mergeParams(parsedParams);
          }

          yield next();
        }));
      });

      function ACLMiddleware(_x, _x2) {
        return _ACLMiddleware.apply(this, arguments);
      }

      return ACLMiddleware;
    }();
  }

}

exports.ACL = ACL;