"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.predicate = exports.ACLAvailableStrategy = void 0;
exports.strategyValueMatched = strategyValueMatched;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
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

function strategyValueMatched(strategy, value) {
  if (strategy === '*') {
    return true;
  }

  if (_lodash().default.isString(strategy) && strategy === value) {
    return true;
  }

  if (_lodash().default.isArray(strategy) && strategy.includes(value)) {
    return true;
  }

  return false;
}

const predicate = {
  own: {
    filter: {
      createdById: '{{ ctx.state.currentUser.id }}'
    }
  },
  all: {}
};
exports.predicate = predicate;

class ACLAvailableStrategy {
  constructor(acl, options) {
    this.acl = void 0;
    this.options = void 0;
    this.actionsAsObject = void 0;
    this.allowConfigure = void 0;
    this.acl = acl;
    this.options = options;
    this.allowConfigure = options.allowConfigure;
    let actions = this.options.actions;

    if (_lodash().default.isString(actions) && actions != '*') {
      actions = [actions];
    }

    if (_lodash().default.isArray(actions)) {
      this.actionsAsObject = actions.reduce((carry, action) => {
        const _action$split = action.split(':'),
              _action$split2 = _slicedToArray(_action$split, 2),
              actionName = _action$split2[0],
              predicate = _action$split2[1];

        carry[actionName] = predicate;
        return carry;
      }, {});
    }
  }

  matchAction(actionName) {
    var _this$actionsAsObject;

    if (this.options.actions == '*') {
      return true;
    }

    if ((_this$actionsAsObject = this.actionsAsObject) === null || _this$actionsAsObject === void 0 ? void 0 : _this$actionsAsObject.hasOwnProperty(actionName)) {
      const predicateName = this.actionsAsObject[actionName];

      if (predicateName) {
        return predicate[predicateName];
      }

      return true;
    }

    return false;
  }

  allow(resourceName, actionName) {
    if (this.acl.isConfigResource(resourceName) && this.allowConfigure) {
      return true;
    }

    return this.matchAction(this.acl.resolveActionAlias(actionName));
  }

}

exports.ACLAvailableStrategy = ACLAvailableStrategy;