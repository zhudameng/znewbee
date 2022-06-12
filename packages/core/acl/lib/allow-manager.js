"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllowManager = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AllowManager {
  constructor(acl) {
    this.acl = void 0;
    this.skipActions = new Map();
    this.registeredCondition = new Map();
    this.acl = acl;
    this.registerAllowCondition('loggedIn', ctx => {
      return ctx.state.currentUser;
    });
    this.registerAllowCondition('allowConfigure', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (ctx) {
        const roleName = ctx.state.currentRole;

        if (!roleName) {
          return false;
        }

        const roleInstance = yield ctx.db.getRepository('roles').findOne({
          name: roleName
        });
        return roleInstance === null || roleInstance === void 0 ? void 0 : roleInstance.get('allowConfigure');
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  allow(resourceName, actionName, condition) {
    const actionMap = this.skipActions.get(resourceName) || new Map();
    actionMap.set(actionName, condition || true);
    this.skipActions.set(resourceName, actionMap);
  }

  getAllowedConditions(resourceName, actionName) {
    const fetchActionSteps = ['*', resourceName];
    const results = [];

    for (var _i = 0, _fetchActionSteps = fetchActionSteps; _i < _fetchActionSteps.length; _i++) {
      const fetchActionStep = _fetchActionSteps[_i];
      const resource = this.skipActions.get(fetchActionStep);

      if (resource) {
        const condition = resource.get('*') || resource.get(actionName);

        if (condition) {
          results.push(typeof condition === 'string' ? this.registeredCondition.get(condition) : condition);
        }
      }
    }

    return results;
  }

  registerAllowCondition(name, condition) {
    this.registeredCondition.set(name, condition);
  }

  aclMiddleware() {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (ctx, next) {
        const _ctx$action = ctx.action,
              resourceName = _ctx$action.resourceName,
              actionName = _ctx$action.actionName;
        const skippedConditions = ctx.app.acl.allowManager.getAllowedConditions(resourceName, actionName);
        let skip = false;

        var _iterator = _createForOfIteratorHelper(skippedConditions),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            const skippedCondition = _step.value;

            if (skippedCondition) {
              let skipResult = false;

              if (typeof skippedCondition === 'function') {
                skipResult = yield skippedCondition(ctx);
              } else if (skippedCondition) {
                skipResult = true;
              }

              if (skipResult) {
                skip = true;
                break;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (skip) {
          ctx.permission = {
            skip: true
          };
        }

        yield next();
      });

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();
  }

}

exports.AllowManager = AllowManager;