import { useField, useFieldSchema } from '@formily/react';
import React, { useLayoutEffect } from 'react';
import { SortableItem, useCollection, useCompile, useDesignable, useDesigner } from '../../../';
import { designerCss } from './Table.Column.ActionBar';
export var useColumnSchema = function useColumnSchema() {
  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var compile = useCompile();
  var columnSchema = useFieldSchema();
  var fieldSchema = columnSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'CollectionField') {
      return s;
    }

    return buf;
  }, null);

  if (!fieldSchema) {
    return {};
  }

  var collectionField = getField(fieldSchema.name);
  return {
    columnSchema: columnSchema,
    fieldSchema: fieldSchema,
    collectionField: collectionField,
    uiSchema: compile(collectionField === null || collectionField === void 0 ? void 0 : collectionField.uiSchema)
  };
};
export var TableColumnDecorator = function TableColumnDecorator(props) {
  var Designer = useDesigner();
  var field = useField();

  var _useColumnSchema = useColumnSchema(),
      fieldSchema = _useColumnSchema.fieldSchema,
      uiSchema = _useColumnSchema.uiSchema,
      collectionField = _useColumnSchema.collectionField;

  var _useDesignable = useDesignable(),
      refresh = _useDesignable.refresh;

  var compile = useCompile();
  useLayoutEffect(function () {
    if (field.title) {
      return;
    }

    if (!fieldSchema) {
      return;
    }

    if (uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title) {
      field.title = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title;
    }
  }, [uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title]);
  return /*#__PURE__*/React.createElement(SortableItem, {
    className: designerCss
  }, /*#__PURE__*/React.createElement(Designer, {
    fieldSchema: fieldSchema,
    uiSchema: uiSchema,
    collectionField: collectionField
  }), field.title || compile(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.title));
};