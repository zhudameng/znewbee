import { Spin } from 'antd';
import React, { createContext, useContext } from 'react';
import { useRequest } from '../../api-client';
import { useRoute } from '../../route-switch';
import { SchemaComponent } from '../../schema-component';
import { roleSchema } from './schemas/roles';

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

var AvailableActionsContext = /*#__PURE__*/createContext(null);
var MenuItemsContext = /*#__PURE__*/createContext(null);

var AvailableActionsProver = function AvailableActionsProver(props) {
  var _useRequest = useRequest({
    resource: 'availableActions',
    action: 'list'
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(AvailableActionsContext.Provider, {
    value: data === null || data === void 0 ? void 0 : data.data
  }, props.children);
};

var MenuItemsProver = function MenuItemsProver(props) {
  var _data$data;

  var route = useRoute();

  var _useRequest2 = useRequest({
    url: "uiSchemas:getProperties/".concat(route.uiSchemaUid)
  }),
      loading = _useRequest2.loading,
      data = _useRequest2.data;

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  var items = toItems(data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.properties);
  return /*#__PURE__*/React.createElement(MenuItemsContext.Provider, {
    value: items
  }, props.children);
};

export var useAvailableActions = function useAvailableActions() {
  return useContext(AvailableActionsContext);
};
export var useMenuItems = function useMenuItems() {
  return useContext(MenuItemsContext);
};
export var RoleTable = function RoleTable() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AvailableActionsProver, null, /*#__PURE__*/React.createElement(MenuItemsProver, null, /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: roleSchema
  }))));
};