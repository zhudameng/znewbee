"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRolesResourcesScopesSelectedRowKeys = exports.ScopeSelect = void 0;

var _core = require("@formily/core");

var _react = _interopRequireWildcard(require("react"));

var _schemaComponent = require("../../schema-component");

var _scopes = require("./schemas/scopes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RolesResourcesScopesSelectedRowKeysContext = /*#__PURE__*/(0, _react.createContext)(null);

var RolesResourcesScopesSelectedRowKeysProvider = function RolesResourcesScopesSelectedRowKeysProvider(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      keys = _useState2[0],
      setKeys = _useState2[1];

  return /*#__PURE__*/_react.default.createElement(RolesResourcesScopesSelectedRowKeysContext.Provider, {
    value: [keys, setKeys]
  }, props.children);
};

var useRolesResourcesScopesSelectedRowKeys = function useRolesResourcesScopesSelectedRowKeys() {
  return (0, _react.useContext)(RolesResourcesScopesSelectedRowKeysContext);
};

exports.useRolesResourcesScopesSelectedRowKeys = useRolesResourcesScopesSelectedRowKeys;

var ScopeSelect = function ScopeSelect(props) {
  var form = (0, _react.useMemo)(function () {
    return (0, _core.createForm)({
      values: {
        scope: props.value
      }
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_schemaComponent.FormProvider, {
    form: form
  }, /*#__PURE__*/_react.default.createElement(_schemaComponent.SchemaComponent, {
    components: {
      RolesResourcesScopesSelectedRowKeysProvider: RolesResourcesScopesSelectedRowKeysProvider
    },
    scope: {
      onChange: function onChange(value) {
        var _props$onChange;

        props === null || props === void 0 ? void 0 : (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, value);
      }
    },
    schema: _scopes.scopesSchema
  }));
};

exports.ScopeSelect = ScopeSelect;