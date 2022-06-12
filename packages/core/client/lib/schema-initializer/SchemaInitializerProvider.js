"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSchemaInitializer = exports.SchemaInitializerProvider = exports.SchemaInitializerContext = void 0;

var _shared = require("@formily/shared");

var _react = _interopRequireWildcard(require("react"));

var _schemaComponent = require("../schema-component");

var globals = _interopRequireWildcard(require("./buttons"));

var initializerComponents = _interopRequireWildcard(require("./components"));

var items = _interopRequireWildcard(require("./items"));

var _SchemaInitializer = require("./SchemaInitializer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SchemaInitializerContext = /*#__PURE__*/(0, _react.createContext)({});
exports.SchemaInitializerContext = SchemaInitializerContext;

var useSchemaInitializer = function useSchemaInitializer(name) {
  var initializers = (0, _react.useContext)(SchemaInitializerContext);

  var _render = function render(component, props) {
    return component && /*#__PURE__*/_react.default.createElement(component, props);
  };

  if (!name) {
    return {
      exists: false,
      render: function render(props) {
        return _render(null);
      }
    };
  }

  var initializer = initializers === null || initializers === void 0 ? void 0 : initializers[name];

  if (!initializer) {
    return {
      exists: false,
      render: function render(props) {
        return _render(null);
      }
    };
  }

  if ((0, _shared.isPlainObj)(initializer)) {
    return {
      exists: true,
      render: function render(props) {
        var component = initializer.component || _SchemaInitializer.SchemaInitializer.Button;
        return _render(component, _objectSpread(_objectSpread({}, initializer), props));
      }
    };
  }

  return {
    exists: true,
    render: function render(props) {
      return _render(initializer, props);
    }
  };
};

exports.useSchemaInitializer = useSchemaInitializer;

var SchemaInitializerProvider = function SchemaInitializerProvider(props) {
  var initializers = props.initializers,
      components = props.components,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(SchemaInitializerContext.Provider, {
    value: _objectSpread(_objectSpread({}, globals), initializers)
  }, /*#__PURE__*/_react.default.createElement(_schemaComponent.SchemaComponentOptions, {
    components: _objectSpread(_objectSpread(_objectSpread({}, items), components), initializerComponents)
  }, children));
};

exports.SchemaInitializerProvider = SchemaInitializerProvider;