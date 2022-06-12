var _excluded = ["popover", "confirm", "containerRefKey", "component", "useAction", "className", "disabled", "icon", "title"];

var _templateObject, _templateObject2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { css } from '@emotion/css';
import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { Button, Modal, Popover } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useActionContext } from '../..';
import { Icon } from '../../../icon';
import { SortableItem } from '../../common';
import { useCompile, useDesigner } from '../../hooks';
import { useProps } from '../../hooks/useProps';
import ActionContainer from './Action.Container';
import { ActionDesigner } from './Action.Designer';
import { ActionDrawer } from './Action.Drawer';
import { ActionLink } from './Action.Link';
import { ActionModal } from './Action.Modal';
import { ActionPage } from './Action.Page';
import { ActionContext } from './context';
import { useA } from './hooks';
export var actionDesignerCss = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  &:hover {\n    > .general-schema-designer {\n      display: block;\n    }\n  }\n  &.nb-action-link {\n    color: #44a85d;\n    > .general-schema-designer {\n      top: -10px;\n      bottom: -10px;\n      left: -10px;\n      right: -10px;\n    }\n  }\n  > .general-schema-designer {\n    position: absolute;\n    z-index: 999;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: none;\n    background: rgba(241, 139, 98, 0.06);\n    border: 0;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n    > .general-schema-designer-icons {\n      position: absolute;\n      right: 2px;\n      top: 2px;\n      line-height: 16px;\n      pointer-events: all;\n      .ant-space-item {\n        background-color: #f18b62;\n        color: #fff;\n        line-height: 16px;\n        width: 16px;\n        padding-left: 1px;\n      }\n    }\n  }\n"])));
export var Action = observer(function (props) {
  var _fieldSchema$xCompon;

  var popover = props.popover,
      confirm = props.confirm,
      containerRefKey = props.containerRefKey,
      component = props.component,
      _props$useAction = props.useAction,
      useAction = _props$useAction === void 0 ? useA : _props$useAction,
      className = props.className,
      disabled = props.disabled,
      icon = props.icon,
      title = props.title,
      others = _objectWithoutProperties(props, _excluded);

  var _useProps = useProps(props),
      _onClick = _useProps.onClick;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      formValueChanged = _useState4[0],
      setFormValueChanged = _useState4[1];

  var Designer = useDesigner();
  var field = useField();

  var _useAction = useAction(),
      run = _useAction.run;

  var fieldSchema = useFieldSchema();
  var compile = useCompile();
  var designerProps = fieldSchema['x-designer-props'];
  var openMode = fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon['openMode'];

  var renderButton = function renderButton() {
    var _field$data;

    return /*#__PURE__*/React.createElement(SortableItem, _objectSpread(_objectSpread({}, others), {}, {
      loading: field === null || field === void 0 ? void 0 : (_field$data = field.data) === null || _field$data === void 0 ? void 0 : _field$data.loading,
      icon: /*#__PURE__*/React.createElement(Icon, {
        type: icon
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var onOk = function onOk() {
          _onClick === null || _onClick === void 0 ? void 0 : _onClick(e);
          setVisible(true);
          run();
        };

        if (confirm) {
          Modal.confirm(_objectSpread(_objectSpread({}, confirm), {}, {
            onOk: onOk
          }));
        } else {
          onOk();
        }
      },
      component: component || Button,
      className: classnames(className, actionDesignerCss)
    }), title || compile(fieldSchema.title), /*#__PURE__*/React.createElement(Designer, _objectSpread({}, designerProps)));
  };

  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      button: renderButton(),
      visible: visible,
      setVisible: setVisible,
      formValueChanged: formValueChanged,
      setFormValueChanged: setFormValueChanged,
      openMode: openMode,
      containerRefKey: containerRefKey
    }
  }, popover && /*#__PURE__*/React.createElement(RecursionField, {
    basePath: field.address,
    onlyRenderProperties: true,
    schema: fieldSchema
  }), !popover && renderButton(), !popover && props.children);
});
Action.Popover = observer(function (props) {
  var _useActionContext = useActionContext(),
      button = _useActionContext.button,
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  return /*#__PURE__*/React.createElement(Popover, _objectSpread(_objectSpread({}, props), {}, {
    destroyTooltipOnHide: true,
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    },
    content: props.children
  }), button);
});
Action.Popover.Footer = observer(function (props) {
  return /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        display: flex;\n        justify-content: flex-end;\n        width: 100%;\n      "])))
  }, props.children);
});
Action.Link = ActionLink;
Action.Designer = ActionDesigner;
Action.Drawer = ActionDrawer;
Action.Modal = ActionModal;
Action.Container = ActionContainer;
Action.Page = ActionPage;
export default Action;