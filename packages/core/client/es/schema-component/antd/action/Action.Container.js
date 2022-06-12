function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useActionContext } from '.';
import { ActionDrawer } from './Action.Drawer';
import { ActionModal } from './Action.Modal';
import { ActionPage } from './Action.Page';
export var ActionContainer = observer(function (props) {
  var _useActionContext = useActionContext(),
      openMode = _useActionContext.openMode;

  if (openMode === 'drawer') {
    return /*#__PURE__*/React.createElement(ActionDrawer, _objectSpread({
      footerNodeName: 'Action.Container.Footer'
    }, props));
  }

  if (openMode === 'modal') {
    return /*#__PURE__*/React.createElement(ActionModal, _objectSpread({
      footerNodeName: 'Action.Container.Footer'
    }, props));
  }

  return /*#__PURE__*/React.createElement(ActionPage, _objectSpread({
    footerNodeName: 'Action.Container.Footer'
  }, props));
});
ActionContainer.Footer = observer(function () {
  var field = useField();
  var schema = useFieldSchema();
  return /*#__PURE__*/React.createElement(RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
export default ActionContainer;