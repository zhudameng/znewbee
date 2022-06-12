"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMenuItems = exports.useAvailableActions = exports.RoleTable = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _apiClient = require("../../api-client");

var _routeSwitch = require("../../route-switch");

var _schemaComponent = require("../../schema-component");

var _roles = require("./schemas/roles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var toItems = function toItems() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var items = [];

  for (var key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      var element = properties[key];
      var item = {
        title: element.title,
        uid: element['x-uid']
      };

      if (element.properties) {
        item['children'] = toItems(element.properties);
      }

      items.push(item);
    }
  }

  return items;
};

var AvailableActionsContext = /*#__PURE__*/(0, _react.createContext)(null);
var MenuItemsContext = /*#__PURE__*/(0, _react.createContext)(null);

var AvailableActionsProver = function AvailableActionsProver(props) {
  var _useRequest = (0, _apiClient.useRequest)({
    resource: 'availableActions',
    action: 'list'
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement(AvailableActionsContext.Provider, {
    value: data === null || data === void 0 ? void 0 : data.data
  }, props.children);
};

var MenuItemsProver = function MenuItemsProver(props) {
  var _data$data;

  var route = (0, _routeSwitch.useRoute)();

  var _useRequest2 = (0, _apiClient.useRequest)({
    url: "uiSchemas:getProperties/".concat(route.uiSchemaUid)
  }),
      loading = _useRequest2.loading,
      data = _useRequest2.data;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  var items = toItems(data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.properties);
  return /*#__PURE__*/_react.default.createElement(MenuItemsContext.Provider, {
    value: items
  }, props.children);
};

var useAvailableActions = function useAvailableActions() {
  return (0, _react.useContext)(AvailableActionsContext);
};

exports.useAvailableActions = useAvailableActions;

var useMenuItems = function useMenuItems() {
  return (0, _react.useContext)(MenuItemsContext);
};

exports.useMenuItems = useMenuItems;

var RoleTable = function RoleTable() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(AvailableActionsProver, null, /*#__PURE__*/_react.default.createElement(MenuItemsProver, null, /*#__PURE__*/_react.default.createElement(_schemaComponent.SchemaComponent, {
    schema: _roles.roleSchema
  }))));
};

exports.RoleTable = RoleTable;