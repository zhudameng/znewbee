var _excluded = ["component", "style", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { observer, useField, useFieldSchema } from '@formily/react';
import React, { createContext, useContext } from 'react';
export var DraggableContext = /*#__PURE__*/createContext(null);
export var SortableContext = /*#__PURE__*/createContext(null);
export var SortableProvider = function SortableProvider(props) {
  var id = props.id,
      data = props.data,
      children = props.children;
  var draggable = useDraggable({
    id: id,
    data: data
  });
  var droppable = useDroppable({
    id: id,
    data: data
  });
  return /*#__PURE__*/React.createElement(SortableContext.Provider, {
    value: {
      draggable: draggable,
      droppable: droppable
    }
  }, children);
};
export var Sortable = function Sortable(props) {
  var component = props.component,
      style = props.style,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var _useContext = useContext(SortableContext),
      droppable = _useContext.droppable;

  var isOver = droppable.isOver,
      setNodeRef = droppable.setNodeRef;

  var droppableStyle = _objectSpread({}, style);

  if (isOver) {
    droppableStyle['color'] = 'rgba(241, 139, 98, .1)';
  }

  return /*#__PURE__*/React.createElement(component || 'div', _objectSpread(_objectSpread({}, others), {}, {
    ref: setNodeRef,
    style: droppableStyle
  }), children);
};
export var SortableItem = observer(function (props) {
  var field = useField();
  var fieldSchema = useFieldSchema();
  return /*#__PURE__*/React.createElement(SortableProvider, {
    id: field.address.toString(),
    data: {
      insertAdjacent: 'afterEnd',
      schema: fieldSchema
    }
  }, /*#__PURE__*/React.createElement(Sortable, _objectSpread({}, props), props.children));
});
export var DragHandler = function DragHandler(props) {
  var _useContext2 = useContext(SortableContext),
      draggable = _useContext2.draggable;

  var isDragging = draggable.isDragging,
      attributes = draggable.attributes,
      listeners = draggable.listeners,
      setNodeRef = draggable.setNodeRef,
      transform = draggable.transform;
  var style = transform ? {
    transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0)")
  } : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      width: 12,
      height: 12,
      lineHeight: '12px',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread({
    ref: setNodeRef,
    style: {
      // ...style,
      position: 'relative',
      zIndex: 1,
      // backgroundColor: '#333',
      lineHeight: 0,
      height: 2,
      width: 2,
      fontSize: 0,
      display: 'inline-block'
    }
  }, listeners), attributes), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'move',
      fontSize: 14
    }
  }, props.children)));
};