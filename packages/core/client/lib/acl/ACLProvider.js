"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRoleRecheck = exports.useACLRoleContext = exports.useACLContext = exports.default = exports.ACLRolesCheckProvider = exports.ACLProvider = exports.ACLMenuItemProvider = exports.ACLContext = exports.ACLCollectionProvider = exports.ACLCollectionFieldProvider = exports.ACLAllowConfigure = exports.ACLActionProvider = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _apiClient = require("../api-client");

var _collectionManager = require("../collection-manager");

var _recordProvider = require("../record-provider");

var _schemaComponent = require("../schema-component");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACLContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.ACLContext = ACLContext;

var ACLProvider = function ACLProvider(props) {
  return /*#__PURE__*/_react2.default.createElement(_schemaComponent.SchemaComponentOptions, {
    components: {
      ACLCollectionFieldProvider: ACLCollectionFieldProvider,
      ACLActionProvider: ACLActionProvider,
      ACLMenuItemProvider: ACLMenuItemProvider,
      ACLCollectionProvider: ACLCollectionProvider
    }
  }, props.children);
};

exports.ACLProvider = ACLProvider;

var ACLRolesCheckProvider = function ACLRolesCheckProvider(props) {
  var _useDesignable = (0, _schemaComponent.useDesignable)(),
      setDesignable = _useDesignable.setDesignable;

  var api = (0, _apiClient.useAPIClient)();
  var result = (0, _apiClient.useRequest)({
    url: 'roles:check'
  }, {
    onSuccess: function onSuccess(data) {
      var _data$data, _data$data2, _data$data3;

      if (!(data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.allowConfigure) && !(data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.allowAll)) {
        setDesignable(false);
      }

      if ((data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.role) !== api.auth.role) {
        var _data$data4;

        api.auth.setRole(data === null || data === void 0 ? void 0 : (_data$data4 = data.data) === null || _data$data4 === void 0 ? void 0 : _data$data4.role);
      }
    }
  });

  if (result.loading) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Spin, null);
  }

  if (result.error) {
    return /*#__PURE__*/_react2.default.createElement(_reactRouterDom.Redirect, {
      to: '/signin'
    });
  }

  return /*#__PURE__*/_react2.default.createElement(ACLContext.Provider, {
    value: result
  }, props.children);
};

exports.ACLRolesCheckProvider = ACLRolesCheckProvider;

var useRoleRecheck = function useRoleRecheck() {
  var ctx = (0, _react2.useContext)(ACLContext);

  var _useACLRoleContext = useACLRoleContext(),
      allowAll = _useACLRoleContext.allowAll,
      allowConfigure = _useACLRoleContext.allowConfigure;

  return function () {
    if (allowAll || allowConfigure) {
      return;
    }

    ctx.refresh();
  };
};

exports.useRoleRecheck = useRoleRecheck;

var useACLContext = function useACLContext() {
  return (0, _react2.useContext)(ACLContext);
};

exports.useACLContext = useACLContext;

var useACLRoleContext = function useACLRoleContext() {
  var _ctx$data;

  var ctx = (0, _react2.useContext)(ACLContext);
  var data = (_ctx$data = ctx.data) === null || _ctx$data === void 0 ? void 0 : _ctx$data.data;
  return _objectSpread(_objectSpread({}, data), {}, {
    getActionParams: function getActionParams(path, _ref) {
      var _data$actionAlias, _data$resources, _data$actions, _data$strategy;

      var skipOwnCheck = _ref.skipOwnCheck,
          isOwn = _ref.isOwn;

      var _path$split = path.split(':'),
          _path$split2 = _slicedToArray(_path$split, 2),
          resourceName = _path$split2[0],
          act = _path$split2[1];

      var currentAction = (data === null || data === void 0 ? void 0 : (_data$actionAlias = data.actionAlias) === null || _data$actionAlias === void 0 ? void 0 : _data$actionAlias[act]) || act;
      var hasResource = data === null || data === void 0 ? void 0 : (_data$resources = data.resources) === null || _data$resources === void 0 ? void 0 : _data$resources.includes(resourceName);
      var params = data === null || data === void 0 ? void 0 : (_data$actions = data.actions) === null || _data$actions === void 0 ? void 0 : _data$actions["".concat(resourceName, ":").concat(currentAction)];

      if (hasResource) {
        if (!skipOwnCheck && (params === null || params === void 0 ? void 0 : params.own)) {
          return isOwn ? params : null;
        }

        return params;
      }

      var strategyActions = (data === null || data === void 0 ? void 0 : (_data$strategy = data.strategy) === null || _data$strategy === void 0 ? void 0 : _data$strategy.actions) || [];
      var strategyAction = strategyActions === null || strategyActions === void 0 ? void 0 : strategyActions.find(function (action) {
        var _action$split = action.split(':'),
            _action$split2 = _slicedToArray(_action$split, 1),
            value = _action$split2[0];

        return value === currentAction;
      });

      if (!strategyAction) {
        return;
      }

      if (skipOwnCheck) {
        return {};
      }

      var _strategyAction$split = strategyAction.split(':'),
          _strategyAction$split2 = _slicedToArray(_strategyAction$split, 2),
          actionScope = _strategyAction$split2[1];

      if (actionScope === 'own') {
        return isOwn;
      }

      return {};
    }
  });
};

exports.useACLRoleContext = useACLRoleContext;

var ACLAllowConfigure = function ACLAllowConfigure(props) {
  var _useACLRoleContext2 = useACLRoleContext(),
      allowAll = _useACLRoleContext2.allowAll,
      allowConfigure = _useACLRoleContext2.allowConfigure;

  if (allowAll || allowConfigure) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  return null;
};

exports.ACLAllowConfigure = ACLAllowConfigure;
var ACLActionParamsContext = /*#__PURE__*/(0, _react2.createContext)({});

var ACLCollectionProvider = function ACLCollectionProvider(props) {
  var _fieldSchema$xAclAc;

  var _useACLRoleContext3 = useACLRoleContext(),
      allowAll = _useACLRoleContext3.allowAll,
      allowConfigure = _useACLRoleContext3.allowConfigure,
      getActionParams = _useACLRoleContext3.getActionParams;

  var fieldSchema = (0, _react.useFieldSchema)();
  var isOwn = (0, _recordProvider.useRecordIsOwn)();

  if (allowAll || allowConfigure) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  var path = fieldSchema['x-acl-action'];
  var skipScopeCheck = (_fieldSchema$xAclAc = fieldSchema['x-acl-action-props']) === null || _fieldSchema$xAclAc === void 0 ? void 0 : _fieldSchema$xAclAc.skipScopeCheck;

  if (!path) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  var params = getActionParams(path, {
    isOwn: isOwn,
    skipOwnCheck: skipScopeCheck === false ? false : true
  });

  if (!params) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(ACLActionParamsContext.Provider, {
    value: params
  }, props.children);
};

exports.ACLCollectionProvider = ACLCollectionProvider;

var ACLActionProvider = function ACLActionProvider(props) {
  var _fieldSchema$xAclAc2;

  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name;

  var fieldSchema = (0, _react.useFieldSchema)();
  var isOwn = (0, _recordProvider.useRecordIsOwn)();

  var _useACLRoleContext4 = useACLRoleContext(),
      allowAll = _useACLRoleContext4.allowAll,
      allowConfigure = _useACLRoleContext4.allowConfigure,
      getActionParams = _useACLRoleContext4.getActionParams;

  if (!name || allowAll || allowConfigure) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  var actionName = fieldSchema['x-action'];
  var path = fieldSchema['x-acl-action'] || "".concat(name, ":").concat(actionName);
  var skipScopeCheck = (_fieldSchema$xAclAc2 = fieldSchema['x-acl-action-props']) === null || _fieldSchema$xAclAc2 === void 0 ? void 0 : _fieldSchema$xAclAc2.skipScopeCheck;
  var params = getActionParams(path, {
    skipOwnCheck: skipScopeCheck,
    isOwn: isOwn
  });

  if (!params) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(ACLActionParamsContext.Provider, {
    value: params
  }, props.children);
};

exports.ACLActionProvider = ACLActionProvider;

var ACLCollectionFieldProvider = function ACLCollectionFieldProvider(props) {
  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
};

exports.ACLCollectionFieldProvider = ACLCollectionFieldProvider;

var ACLMenuItemProvider = function ACLMenuItemProvider(props) {
  var _useACLRoleContext5 = useACLRoleContext(),
      allowAll = _useACLRoleContext5.allowAll,
      allowConfigure = _useACLRoleContext5.allowConfigure,
      _useACLRoleContext5$a = _useACLRoleContext5.allowMenuItemIds,
      allowMenuItemIds = _useACLRoleContext5$a === void 0 ? [] : _useACLRoleContext5$a;

  var fieldSchema = (0, _react.useFieldSchema)();

  if (allowAll || allowConfigure) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  if (!fieldSchema['x-uid']) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  if (allowMenuItemIds.includes(fieldSchema['x-uid'])) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  return null;
};

exports.ACLMenuItemProvider = ACLMenuItemProvider;
var _default = ACLProvider;
exports.default = _default;