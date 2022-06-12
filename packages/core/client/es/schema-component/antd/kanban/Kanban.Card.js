var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { css } from '@emotion/css';
import { FormLayout } from '@formily/antd';
import { observer, RecursionField, useFieldSchema } from '@formily/react';
import { Card } from 'antd';
import React, { useContext, useState } from 'react';
import { ActionContext, BlockItem } from '..';
import { DndContext } from '../..';
import { RecordProvider } from '../../../record-provider';
import { SchemaComponentOptions } from '../../core/SchemaComponentOptions';
import { KanbanCardContext } from './context';
var FormItem = observer(function (props) {
  return /*#__PURE__*/React.createElement(BlockItem, _objectSpread({}, props));
});
export var KanbanCard = observer(function (props) {
  var _useContext = useContext(KanbanCardContext),
      setDisableCardDrag = _useContext.setDisableCardDrag,
      cardViewerSchema = _useContext.cardViewerSchema,
      card = _useContext.card,
      cardField = _useContext.cardField,
      columnIndex = _useContext.columnIndex,
      cardIndex = _useContext.cardIndex;

  var fieldSchema = useFieldSchema();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    onClick: function onClick(e) {
      setVisible(true);
    },
    bordered: false,
    hoverable: true,
    style: {
      cursor: 'pointer',
      overflow: 'hidden'
    },
    // bodyStyle={{ paddingBottom: 0 }}
    className: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-card-body {\n            padding: 16px;\n          }\n          .nb-row-divider {\n            height: 16px;\n            margin-top: -16px;\n            &:last-child {\n              margin-top: 0;\n            }\n          }\n          .ant-description-input {\n            text-overflow: ellipsis;\n            width: 100%;\n            overflow: hidden;\n          }\n          .ant-description-textarea {\n            text-overflow: ellipsis;\n            width: 100%;\n            overflow: hidden;\n          }\n          .ant-formily-item {\n            margin-bottom: 12px;\n          }\n          .nb-grid-row:last-of-type {\n            .nb-grid-col {\n              .nb-form-item:last-of-type {\n                .ant-formily-item {\n                  margin-bottom: 0;\n                }\n              }\n            }\n          }\n        "])))
  }, /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: {}
  }, /*#__PURE__*/React.createElement(DndContext, {
    onDragStart: function onDragStart() {
      setDisableCardDrag(true);
    },
    onDragEnd: function onDragEnd() {
      setDisableCardDrag(false);
    }
  }, /*#__PURE__*/React.createElement(FormLayout, {
    layout: 'vertical'
  }, /*#__PURE__*/React.createElement(RecursionField, {
    basePath: cardField.address.concat("".concat(columnIndex, ".cards.").concat(cardIndex)),
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))), cardViewerSchema && /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      openMode: 'drawer',
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(RecordProvider, {
    record: card
  }, /*#__PURE__*/React.createElement(RecursionField, {
    basePath: cardField.address.concat("".concat(columnIndex, ".cardViewer.").concat(cardIndex)),
    schema: cardViewerSchema,
    onlyRenderProperties: true
  }))));
});