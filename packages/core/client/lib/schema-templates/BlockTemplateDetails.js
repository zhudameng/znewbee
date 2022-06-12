"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockTemplateDetails = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("..");

var _schemaComponent = require("../schema-component");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EditableTitle = function EditableTitle(props) {
  var _useState = (0, _react.useState)(props.title),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var _useSchemaTemplateMan = (0, _.useSchemaTemplateManager)(),
      refresh = _useSchemaTemplateMan.refresh;

  var api = (0, _.useAPIClient)();

  var _useRequest = (0, _.useRequest)({
    resource: 'uiSchemaTemplates',
    action: 'update',
    params: {
      filterByTk: props.filterByTk
    }
  }, {
    manual: true,
    debounceWait: 500,
    onSuccess: function onSuccess() {
      refresh();
    }
  }),
      run = _useRequest.run;

  return /*#__PURE__*/_react.default.createElement("div", null, visible ? /*#__PURE__*/_react.default.createElement(_antd.Input, {
    defaultValue: title,
    size: 'large',
    onBlur: function onBlur() {
      setVisible(false);
    },
    onChange: function onChange(e) {
      setTitle(e.target.value);
      run({
        filterByTk: props.filterByTk,
        values: {
          name: e.target.value
        }
      });
    }
  }) : /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      setVisible(true);
    }
  }, title || /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#bbb'
    }
  }, "\u672A\u547D\u540D")));
};

var BlockTemplateDetails = function BlockTemplateDetails() {
  var _match$params, _data$data, _data$data2;

  var history = (0, _reactRouterDom.useHistory)();
  var match = (0, _reactRouterDom.useRouteMatch)();
  var key = match === null || match === void 0 ? void 0 : (_match$params = match.params) === null || _match$params === void 0 ? void 0 : _match$params.key;
  var value = (0, _react.useContext)(_schemaComponent.SchemaComponentContext);

  var _useRequest2 = (0, _.useRequest)({
    resource: 'uiSchemaTemplates',
    action: 'get',
    params: {
      filterByTk: key
    }
  }),
      data = _useRequest2.data,
      loading = _useRequest2.loading;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.PageHeader, {
    onBack: function onBack() {
      history.push('/admin/plugins/block-templates');
    },
    ghost: false,
    title: /*#__PURE__*/_react.default.createElement(EditableTitle, {
      filterByTk: key,
      title: data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.name
    })
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 24
    }
  }, /*#__PURE__*/_react.default.createElement(_schemaComponent.SchemaComponentContext.Provider, {
    value: _objectSpread(_objectSpread({}, value), {}, {
      designable: true
    })
  }, /*#__PURE__*/_react.default.createElement(_schemaComponent.RemoteSchemaComponent, {
    uid: data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.uid
  }))));
};

exports.BlockTemplateDetails = BlockTemplateDetails;