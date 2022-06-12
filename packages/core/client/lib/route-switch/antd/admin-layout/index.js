"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AdminLayout = void 0;

var _css = require("@emotion/css");

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("../../../");

var _collectionManager = require("../../../collection-manager");

var _poweredBy = require("../../../powered-by");

var _templateObject, _templateObject2, _templateObject3;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var filterByACL = function filterByACL(schema, options) {
  var allowAll = options.allowAll,
      allowConfigure = options.allowConfigure,
      _options$allowMenuIte = options.allowMenuItemIds,
      allowMenuItemIds = _options$allowMenuIte === void 0 ? [] : _options$allowMenuIte;

  if (allowAll || allowConfigure) {
    return schema;
  }

  var filterSchema = function filterSchema(s) {
    if (!s) {
      return;
    }

    for (var key in s.properties) {
      if (Object.prototype.hasOwnProperty.call(s.properties, key)) {
        var element = s.properties[key];

        if (element['x-uid'] && !allowMenuItemIds.includes(element['x-uid'])) {
          delete s.properties[key];
        }
      }
    }
  };

  filterSchema(schema);
  return schema;
};

var SchemaIdContext = /*#__PURE__*/(0, _react.createContext)(null);

var useMenuProps = function useMenuProps() {
  var defaultSelectedUid = (0, _react.useContext)(SchemaIdContext);
  return {
    selectedUid: defaultSelectedUid,
    defaultSelectedUid: defaultSelectedUid
  };
};

var MenuEditor = function MenuEditor(props) {
  var _useDocumentTitle = (0, _.useDocumentTitle)(),
      setTitle = _useDocumentTitle.setTitle;

  var history = (0, _reactRouterDom.useHistory)();
  var match = (0, _reactRouterDom.useRouteMatch)();
  var defaultSelectedUid = match.params.name;
  var sideMenuRef = props.sideMenuRef;
  var ctx = (0, _.useACLRoleContext)();
  var route = (0, _.useRoute)();

  var onSelect = function onSelect(_ref) {
    var item = _ref.item;
    var schema = item.props.schema;
    setTitle(schema.title);
    history.push("/admin/".concat(schema['x-uid']));
  };

  var _useRequest = (0, _.useRequest)({
    url: "/uiSchemas:getJsonSchema/".concat(route.uiSchemaUid)
  }, {
    refreshDeps: [route.uiSchemaUid],
    onSuccess: function onSuccess(data) {
      var schema = filterByACL(data === null || data === void 0 ? void 0 : data.data, ctx);

      if (defaultSelectedUid) {
        var s = (0, _.findByUid)(schema, defaultSelectedUid);

        if (s) {
          setTitle(s.title);
        }
      } else {
        var _s = (0, _.findMenuItem)(schema);

        if (_s) {
          history.push("/admin/".concat(_s['x-uid']));
          setTitle(_s.title);
        }
      }
    }
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  var schema = (0, _react.useMemo)(function () {
    var s = filterByACL(data === null || data === void 0 ? void 0 : data.data, ctx);

    if (s === null || s === void 0 ? void 0 : s['x-component-props']) {
      s['x-component-props']['useProps'] = useMenuProps;
    }

    return s;
  }, [data === null || data === void 0 ? void 0 : data.data]);

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement(SchemaIdContext.Provider, {
    value: defaultSelectedUid
  }, /*#__PURE__*/_react.default.createElement(_.SchemaComponent, {
    memoized: true,
    scope: {
      useMenuProps: useMenuProps,
      onSelect: onSelect,
      sideMenuRef: sideMenuRef,
      defaultSelectedUid: defaultSelectedUid
    },
    schema: schema
  }));
};

var InternalAdminLayout = function InternalAdminLayout(props) {
  var _result$data, _result$data$data, _result$data$data$log;

  var route = (0, _.useRoute)();
  var history = (0, _reactRouterDom.useHistory)();
  var match = (0, _reactRouterDom.useRouteMatch)();

  var _useDocumentTitle2 = (0, _.useDocumentTitle)(),
      setTitle = _useDocumentTitle2.setTitle;

  var sideMenuRef = (0, _react.useRef)();
  var result = (0, _.useSystemSettings)();

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      service = _useCollectionManager.service;

  return /*#__PURE__*/_react.default.createElement(_antd.Layout, {
    style: {
      display: 'flex',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Layout.Header, {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-menu.ant-menu-dark .ant-menu-item-selected,\n          .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {\n            background-color: rgba(255, 255, 255, 0.2);\n          }\n          .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {\n            background-color: rgba(255, 255, 255, 0.2);\n          }\n        "]))),
    style: {
      height: 46,
      lineHeight: '46px',
      position: 'relative',
      paddingLeft: 0,
      background: '#44a85d'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: '#44a85d'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 200,
      display: 'inline-flex',
      color: '#411777',
      padding: '0',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n                padding: 0 16px;\n                object-fit: contain;\n                width: 100%;\n                height: 100%;\n              "]))),
    src: result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$data = _result$data.data) === null || _result$data$data === void 0 ? void 0 : (_result$data$data$log = _result$data$data.logo) === null || _result$data$data$log === void 0 ? void 0 : _result$data$data$log.url
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 'calc(100% - 590px)',
      background: '#44a85d'
    }
  }, /*#__PURE__*/_react.default.createElement(MenuEditor, {
    sideMenuRef: sideMenuRef
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: '#44a85d'
    }
  }, /*#__PURE__*/_react.default.createElement(_.ACLAllowConfigure, null, /*#__PURE__*/_react.default.createElement(_.RemotePluginManagerToolbar, null)), /*#__PURE__*/_react.default.createElement(_.CurrentUser, null))), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(_antd.Layout.Sider, {
    style: {
      display: 'none',
      background: '#112a17'
    },
    theme: 'dark',
    ref: sideMenuRef
  }), /*#__PURE__*/_react.default.createElement(_antd.Layout.Content, {
    className: (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            min-height: calc(100vh - 46px);\n            position: relative;\n            padding-bottom: 70px;\n            .ant-layout-footer {\n              position: absolute;\n              bottom: 0;\n              text-align: center;\n              width: 100%;\n            }\n          "])))
  }, service.contentLoading ? /*#__PURE__*/_react.default.createElement(_antd.Spin, null) : props.children, /*#__PURE__*/_react.default.createElement(_antd.Layout.Footer, null, /*#__PURE__*/_react.default.createElement(_poweredBy.PoweredBy, null)))));
};

var AdminLayout = function AdminLayout(props) {
  return /*#__PURE__*/_react.default.createElement(_.CurrentUserProvider, null, /*#__PURE__*/_react.default.createElement(_.RemoteSchemaTemplateManagerProvider, null, /*#__PURE__*/_react.default.createElement(_.RemoteCollectionManagerProvider, null, /*#__PURE__*/_react.default.createElement(_.ACLRolesCheckProvider, null, /*#__PURE__*/_react.default.createElement(InternalAdminLayout, _objectSpread({}, props))))));
};

exports.AdminLayout = AdminLayout;
var _default = AdminLayout;
exports.default = _default;