function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { toArr } from '@formily/shared';
import { Space } from 'antd';
import React, { useState } from 'react';
import { BlockAssociationContext } from '../../../block-provider';
import { CollectionProvider, useCollection } from '../../../collection-manager';
import { RecordProvider } from '../../../record-provider';
import { FormProvider } from '../../core';
import { useCompile } from '../../hooks';
import { ActionContext } from '../action';
import { useFieldNames } from './useFieldNames';
export var ReadPrettyRecordPicker = observer(function (props) {
  var fieldSchema = useFieldSchema();
  var field = useField();
  var fieldNames = useFieldNames(props);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var collectionField = getField(fieldSchema.name);

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      record = _useState4[0],
      setRecord = _useState4[1];

  var compile = useCompile();
  return collectionField ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BlockAssociationContext.Provider, {
    value: "".concat(collectionField.collectionName, ".").concat(collectionField.name)
  }, /*#__PURE__*/React.createElement(CollectionProvider, {
    name: collectionField.target
  }, /*#__PURE__*/React.createElement(Space, {
    size: 0,
    split: /*#__PURE__*/React.createElement("span", {
      style: {
        marginRight: 4,
        color: '#aaa'
      }
    }, ", ")
  }, toArr(field.value).map(function (record, index) {
    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("a", {
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setVisible(true);
        setRecord(record);
      }
    }, compile(record === null || record === void 0 ? void 0 : record[(fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.label) || 'label'])));
  })), /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible,
      openMode: 'drawer'
    }
  }, /*#__PURE__*/React.createElement(RecordProvider, {
    record: record
  }, /*#__PURE__*/React.createElement(FormProvider, null, /*#__PURE__*/React.createElement(RecursionField, {
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))))) : null;
});