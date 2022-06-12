function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DndContext as DndKitContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { observer } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient } from '../../../';
import { createDesignable, useDesignable } from '../../hooks';

var useDragEnd = function useDragEnd(props) {
  var _useDesignable = useDesignable(),
      refresh = _useDesignable.refresh;

  var api = useAPIClient();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return function (event) {
    var _active$data, _active$data$current, _over$data, _over$data$current, _over$data2, _over$data2$current, _over$data3, _over$data3$current, _over$data4, _over$data4$current;

    var active = event.active,
        over = event.over;
    var activeSchema = active === null || active === void 0 ? void 0 : (_active$data = active.data) === null || _active$data === void 0 ? void 0 : (_active$data$current = _active$data.current) === null || _active$data$current === void 0 ? void 0 : _active$data$current.schema;
    var overSchema = over === null || over === void 0 ? void 0 : (_over$data = over.data) === null || _over$data === void 0 ? void 0 : (_over$data$current = _over$data.current) === null || _over$data$current === void 0 ? void 0 : _over$data$current.schema;
    var insertAdjacent = over === null || over === void 0 ? void 0 : (_over$data2 = over.data) === null || _over$data2 === void 0 ? void 0 : (_over$data2$current = _over$data2.current) === null || _over$data2$current === void 0 ? void 0 : _over$data2$current.insertAdjacent;
    var breakRemoveOn = over === null || over === void 0 ? void 0 : (_over$data3 = over.data) === null || _over$data3 === void 0 ? void 0 : (_over$data3$current = _over$data3.current) === null || _over$data3$current === void 0 ? void 0 : _over$data3$current.breakRemoveOn;
    var wrapSchema = over === null || over === void 0 ? void 0 : (_over$data4 = over.data) === null || _over$data4 === void 0 ? void 0 : (_over$data4$current = _over$data4.current) === null || _over$data4$current === void 0 ? void 0 : _over$data4$current.wrapSchema;

    if (!activeSchema || !overSchema) {
      var _props$onDragEnd;

      props === null || props === void 0 ? void 0 : (_props$onDragEnd = props.onDragEnd) === null || _props$onDragEnd === void 0 ? void 0 : _props$onDragEnd.call(props, event);
      return;
    }

    if (activeSchema === overSchema) {
      var _props$onDragEnd2;

      props === null || props === void 0 ? void 0 : (_props$onDragEnd2 = props.onDragEnd) === null || _props$onDragEnd2 === void 0 ? void 0 : _props$onDragEnd2.call(props, event);
      return;
    }

    var dn = createDesignable({
      t: t,
      api: api,
      refresh: refresh,
      current: overSchema
    });
    dn.loadAPIClientEvents();

    if (activeSchema.parent === overSchema.parent) {
      var _props$onDragEnd3;

      dn.insertBeforeBeginOrAfterEnd(activeSchema);
      props === null || props === void 0 ? void 0 : (_props$onDragEnd3 = props.onDragEnd) === null || _props$onDragEnd3 === void 0 ? void 0 : _props$onDragEnd3.call(props, event);
      return;
    }

    if (insertAdjacent) {
      var _props$onDragEnd4;

      dn.insertAdjacent(insertAdjacent, activeSchema, {
        wrap: wrapSchema,
        breakRemoveOn: breakRemoveOn,
        removeParentsIfNoChildren: true
      });
      props === null || props === void 0 ? void 0 : (_props$onDragEnd4 = props.onDragEnd) === null || _props$onDragEnd4 === void 0 ? void 0 : _props$onDragEnd4.call(props, event);
      return;
    }
  };
};

export var DndContext = observer(function (props) {
  var _useTranslation2 = useTranslation(),
      t = _useTranslation2.t;

  return /*#__PURE__*/React.createElement(DndKitContext, _objectSpread(_objectSpread({
    collisionDetection: rectIntersection
  }, props), {}, {
    onDragEnd: useDragEnd(props)
  }), /*#__PURE__*/React.createElement(DragOverlay, {
    dropAnimation: {
      duration: 10,
      easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, t('Dragging'))), props.children);
});