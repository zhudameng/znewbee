function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState } from 'react';
import { PartitionOutlined } from '@ant-design/icons';
import { uid } from '@formily/shared';
import { useTranslation } from 'react-i18next';
import { PluginManager } from '../plugin-manager';
import { ActionContext, SchemaComponent } from '../schema-component';
import { workflowSchema } from './schemas/workflows';
import { WorkflowLink } from './WorkflowLink';
import { ExecutionResourceProvider } from './ExecutionResourceProvider';
var schema = {
  type: 'object',
  properties: _defineProperty({}, uid(), {
    'x-component': 'Action.Drawer',
    type: 'void',
    title: '{{t("Workflow")}}',
    properties: {
      table: workflowSchema
    }
  })
};
export var WorkflowShortcut = function WorkflowShortcut() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(PluginManager.Toolbar.Item, {
    icon: /*#__PURE__*/React.createElement(PartitionOutlined, null),
    title: t('Workflow'),
    onClick: function onClick() {
      setVisible(true);
    }
  }), /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: schema,
    components: {
      WorkflowLink: WorkflowLink,
      ExecutionResourceProvider: ExecutionResourceProvider
    }
  }));
};