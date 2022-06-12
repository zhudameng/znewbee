var _templateObject, _templateObject2, _templateObject3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import { Layout, Spin } from 'antd';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ACLAllowConfigure, ACLRolesCheckProvider, CurrentUser, CurrentUserProvider, findByUid, findMenuItem, RemoteCollectionManagerProvider, RemotePluginManagerToolbar, RemoteSchemaTemplateManagerProvider, SchemaComponent, useACLRoleContext, useDocumentTitle, useRequest, useRoute, useSystemSettings } from '../../../';
import { useCollectionManager } from '../../../collection-manager';
import { PoweredBy } from '../../../powered-by';

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

var SchemaIdContext = /*#__PURE__*/createContext(null);

var useMenuProps = function useMenuProps() {
  var defaultSelectedUid = useContext(SchemaIdContext);
  return {
    selectedUid: defaultSelectedUid,
    defaultSelectedUid: defaultSelectedUid
  };
};

var MenuEditor = function MenuEditor(props) {
  var _useDocumentTitle = useDocumentTitle(),
      setTitle = _useDocumentTitle.setTitle;

  var history = useHistory();
  var match = useRouteMatch();
  var defaultSelectedUid = match.params.name;
  var sideMenuRef = props.sideMenuRef;
  var ctx = useACLRoleContext();
  var route = useRoute();

  var onSelect = function onSelect(_ref) {
    var item = _ref.item;
    var schema = item.props.schema;
    setTitle(schema.title);
    history.push("/admin/".concat(schema['x-uid']));
  };

  var _useRequest = useRequest({
    url: "/uiSchemas:getJsonSchema/".concat(route.uiSchemaUid)
  }, {
    refreshDeps: [route.uiSchemaUid],
    onSuccess: function onSuccess(data) {
      var schema = filterByACL(data === null || data === void 0 ? void 0 : data.data, ctx);

      if (defaultSelectedUid) {
        var s = findByUid(schema, defaultSelectedUid);

        if (s) {
          setTitle(s.title);
        }
      } else {
        var _s = findMenuItem(schema);

        if (_s) {
          history.push("/admin/".concat(_s['x-uid']));
          setTitle(_s.title);
        }
      }
    }
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  var schema = useMemo(function () {
    var s = filterByACL(data === null || data === void 0 ? void 0 : data.data, ctx);

    if (s === null || s === void 0 ? void 0 : s['x-component-props']) {
      s['x-component-props']['useProps'] = useMenuProps;
    }

    return s;
  }, [data === null || data === void 0 ? void 0 : data.data]);

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(SchemaIdContext.Provider, {
    value: defaultSelectedUid
  }, /*#__PURE__*/React.createElement(SchemaComponent, {
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

  var route = useRoute();
  var history = useHistory();
  var match = useRouteMatch();

  var _useDocumentTitle2 = useDocumentTitle(),
      setTitle = _useDocumentTitle2.setTitle;

  var sideMenuRef = useRef();
  var result = useSystemSettings();

  var _useCollectionManager = useCollectionManager(),
      service = _useCollectionManager.service;

  return /*#__PURE__*/React.createElement(Layout, {
    style: {
      display: 'flex',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Layout.Header, {
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-menu.ant-menu-dark .ant-menu-item-selected,\n          .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {\n            background-color: rgba(255, 255, 255, 0.2);\n          }\n          .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {\n            background-color: rgba(255, 255, 255, 0.2);\n          }\n        "]))),
    style: {
      height: 46,
      lineHeight: '46px',
      position: 'relative',
      paddingLeft: 0,
      background: '#44a85d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: '#44a85d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      display: 'inline-flex',
      color: '#411777',
      padding: '0',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n                padding: 0 16px;\n                object-fit: contain;\n                width: 100%;\n                height: 100%;\n              "]))),
    src: result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$data = _result$data.data) === null || _result$data$data === void 0 ? void 0 : (_result$data$data$log = _result$data$data.logo) === null || _result$data$data$log === void 0 ? void 0 : _result$data$data$log.url
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'calc(100% - 590px)',
      background: '#44a85d'
    }
  }, /*#__PURE__*/React.createElement(MenuEditor, {
    sideMenuRef: sideMenuRef
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: '#44a85d'
    }
  }, /*#__PURE__*/React.createElement(ACLAllowConfigure, null, /*#__PURE__*/React.createElement(RemotePluginManagerToolbar, null)), /*#__PURE__*/React.createElement(CurrentUser, null))), /*#__PURE__*/React.createElement(Layout, null, /*#__PURE__*/React.createElement(Layout.Sider, {
    style: {
      display: 'none',
      background: '#112a17'
    },
    theme: 'dark',
    ref: sideMenuRef
  }), /*#__PURE__*/React.createElement(Layout.Content, {
    className: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            min-height: calc(100vh - 46px);\n            position: relative;\n            padding-bottom: 70px;\n            .ant-layout-footer {\n              position: absolute;\n              bottom: 0;\n              text-align: center;\n              width: 100%;\n            }\n          "])))
  }, service.contentLoading ? /*#__PURE__*/React.createElement(Spin, null) : props.children, /*#__PURE__*/React.createElement(Layout.Footer, null, /*#__PURE__*/React.createElement(PoweredBy, null)))));
};

export var AdminLayout = function AdminLayout(props) {
  return /*#__PURE__*/React.createElement(CurrentUserProvider, null, /*#__PURE__*/React.createElement(RemoteSchemaTemplateManagerProvider, null, /*#__PURE__*/React.createElement(RemoteCollectionManagerProvider, null, /*#__PURE__*/React.createElement(ACLRolesCheckProvider, null, /*#__PURE__*/React.createElement(InternalAdminLayout, _objectSpread({}, props))))));
};
export default AdminLayout;