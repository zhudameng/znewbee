function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { SchemaComponentOptions } from '../schema-component/core/SchemaComponentOptions';
import { RecordLink, useParamsFromRecord, useSourceIdFromParentRecord, useSourceIdFromRecord } from './BlockProvider';
import { CalendarBlockProvider, useCalendarBlockProps } from './CalendarBlockProvider';
import { DetailsBlockProvider, useDetailsBlockProps } from './DetailsBlockProvider';
import { FormBlockProvider, useFormBlockProps } from './FormBlockProvider';
import * as bp from './hooks';
import { KanbanBlockProvider, useKanbanBlockProps } from './KanbanBlockProvider';
import { TableBlockProvider, useTableBlockProps } from './TableBlockProvider';
import { TableFieldProvider, useTableFieldProps } from './TableFieldProvider';
import { TableSelectorProvider, useTableSelectorProps } from './TableSelectorProvider';
export var BlockSchemaComponentProvider = function BlockSchemaComponentProvider(props) {
  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: {
      CalendarBlockProvider: CalendarBlockProvider,
      TableFieldProvider: TableFieldProvider,
      TableBlockProvider: TableBlockProvider,
      TableSelectorProvider: TableSelectorProvider,
      FormBlockProvider: FormBlockProvider,
      DetailsBlockProvider: DetailsBlockProvider,
      KanbanBlockProvider: KanbanBlockProvider,
      RecordLink: RecordLink
    },
    scope: _objectSpread(_objectSpread({}, bp), {}, {
      useSourceIdFromRecord: useSourceIdFromRecord,
      useSourceIdFromParentRecord: useSourceIdFromParentRecord,
      useParamsFromRecord: useParamsFromRecord,
      useCalendarBlockProps: useCalendarBlockProps,
      useFormBlockProps: useFormBlockProps,
      useDetailsBlockProps: useDetailsBlockProps,
      useTableFieldProps: useTableFieldProps,
      useTableBlockProps: useTableBlockProps,
      useTableSelectorProps: useTableSelectorProps,
      useKanbanBlockProps: useKanbanBlockProps
    })
  }, props.children);
};