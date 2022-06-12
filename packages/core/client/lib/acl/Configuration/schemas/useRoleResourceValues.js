"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRoleResourceValues = void 0;

var _react = require("react");

var _ = require("../../../");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useRoleResourceValues = function useRoleResourceValues(options) {
  var record = (0, _.useRecord)();

  var _useActionContext = (0, _.useActionContext)(),
      visible = _useActionContext.visible;

  var result = (0, _.useRequest)({
    resource: 'roles.resources',
    resourceOf: record.roleName,
    action: 'get',
    params: {
      appends: ['actions', 'actions.scope'],
      filterByTk: record.name
    }
  }, _objectSpread(_objectSpread({}, options), {}, {
    manual: true
  }));
  (0, _react.useEffect)(function () {
    if (!record.exists) {
      options.onSuccess({
        data: {}
      });
      return;
    }

    if (visible) {
      result.run();
    }
  }, [visible, record.exists]);
  return result;
};

exports.useRoleResourceValues = useRoleResourceValues;