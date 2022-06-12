var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { css } from '@emotion/css';
import { observer, RecursionField, Schema, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import cls from 'classnames';
import React, { createContext, useContext, useState } from 'react';
import { useSchemaInitializer } from '../../../';
import { DndContext } from '../../common/dnd-context';
var GridRowContext = /*#__PURE__*/createContext(null);
var GridColContext = /*#__PURE__*/createContext(null);
var GridContext = /*#__PURE__*/createContext({});

var ColDivider = function ColDivider(props) {
  var _useDroppable = useDroppable({
    id: props.id,
    data: props.data
  }),
      isOver = _useDroppable.isOver,
      setNodeRef = _useDroppable.setNodeRef;

  var droppableStyle = {
    backgroundColor: isOver ? 'rgba(241, 139, 98, .1)' : undefined
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: setNodeRef,
    className: cls('nb-col-divider', css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          width: 24px;\n        "])))),
    style: _objectSpread({}, droppableStyle)
  });
};

var RowDivider = function RowDivider(props) {
  var _useDroppable2 = useDroppable({
    id: props.id,
    data: props.data
  }),
      isOver = _useDroppable2.isOver,
      setNodeRef = _useDroppable2.setNodeRef;

  var droppableStyle = {};

  if (isOver) {
    droppableStyle['backgroundColor'] = 'rgba(241, 139, 98, .1)';
  }

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  useDndMonitor({
    onDragStart: function onDragStart(event) {
      setActive(true);
    },
    onDragMove: function onDragMove(event) {},
    onDragOver: function onDragOver(event) {},
    onDragEnd: function onDragEnd(event) {
      setActive(false);
    },
    onDragCancel: function onDragCancel(event) {
      setActive(false);
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: setNodeRef,
    className: cls('nb-row-divider', css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          height: 24px;\n          width: 100%;\n          position: absolute;\n          margin-top: -24px;\n        "])))),
    style: _objectSpread({
      zIndex: active ? 1000 : 0
    }, droppableStyle)
  });
};

var wrapRowSchema = function wrapRowSchema(schema) {
  var row = new Schema({
    type: 'void',
    name: "row_".concat(uid()),
    'x-uid': uid(),
    'x-component': 'Grid.Row'
  });
  var col = row.addProperty(uid(), {
    type: 'void',
    'x-uid': uid(),
    'x-component': 'Grid.Col'
  });

  if (Schema.isSchemaInstance(schema)) {
    schema.parent = col;
  }

  col.addProperty(schema.name, schema);
  return row;
};

var wrapColSchema = function wrapColSchema(schema) {
  var s = new Schema({
    type: 'void',
    name: "col_".concat(uid()),
    'x-uid': uid(),
    'x-component': 'Grid.Col'
  }); // parent 更新了，需要重新指定

  if (Schema.isSchemaInstance(schema)) {
    schema.parent = s;
  }

  s.addProperty(schema.name, schema);
  return s;
};

var useRowProperties = function useRowProperties() {
  var fieldSchema = useFieldSchema();
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'Grid.Row' && !s['x-hidden']) {
      buf.push(s);
    }

    return buf;
  }, []);
};

var useColProperties = function useColProperties() {
  var fieldSchema = useFieldSchema();
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'Grid.Col' && !s['x-hidden']) {
      buf.push(s);
    }

    return buf;
  }, []);
};

var DndWrapper = function DndWrapper(props) {
  if (props.dndContext === false) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, props.children);
  }

  return /*#__PURE__*/React.createElement(DndContext, _objectSpread({}, props.dndContext), props.children);
};

export var useGridContext = function useGridContext() {
  return useContext(GridContext);
};
export var useGridRowContext = function useGridRowContext() {
  return useContext(GridRowContext);
};
export var Grid = observer(function (props) {
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useSchemaInitializer = useSchemaInitializer(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  var addr = field.address.toString();
  var rows = useRowProperties();
  return /*#__PURE__*/React.createElement(GridContext.Provider, {
    value: {
      fieldSchema: fieldSchema,
      renderSchemaInitializer: render
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'nb-grid',
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(DndWrapper, {
    dndContext: props.dndContext
  }, /*#__PURE__*/React.createElement(RowDivider, {
    id: "".concat(addr, "_0"),
    data: {
      wrapSchema: wrapRowSchema,
      insertAdjacent: 'afterBegin',
      schema: fieldSchema
    }
  }), rows.map(function (schema, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: schema.name
    }, /*#__PURE__*/React.createElement(RecursionField, {
      name: schema.name,
      schema: schema
    }), /*#__PURE__*/React.createElement(RowDivider, {
      id: "".concat(addr, "_").concat(index + 1),
      data: {
        wrapSchema: wrapRowSchema,
        insertAdjacent: 'afterEnd',
        schema: schema
      }
    }));
  })), render()));
});
Grid.Row = observer(function (props) {
  var field = useField();
  var fieldSchema = useFieldSchema();
  var addr = field.address.toString();
  var cols = useColProperties();
  return /*#__PURE__*/React.createElement(GridRowContext.Provider, {
    value: {
      cols: cols
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: cls('nb-grid-row', css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            margin: 0 -24px;\n            display: flex;\n            position: relative;\n            z-index: 0;\n          "]))))
  }, /*#__PURE__*/React.createElement(ColDivider, {
    id: "".concat(addr, "_0"),
    data: {
      wrapSchema: wrapColSchema,
      insertAdjacent: 'afterBegin',
      schema: fieldSchema
    }
  }), cols.map(function (schema, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: schema.name
    }, /*#__PURE__*/React.createElement(RecursionField, {
      name: schema.name,
      schema: schema
    }), /*#__PURE__*/React.createElement(ColDivider, {
      id: "".concat(addr, "_").concat(index + 1),
      data: {
        wrapSchema: wrapColSchema,
        insertAdjacent: 'afterEnd',
        schema: schema
      }
    }));
  })));
});
Grid.Col = observer(function (props) {
  var _useContext = useContext(GridRowContext),
      cols = _useContext.cols;

  var w = props.width || 100 / cols.length;
  var width = "calc(".concat(w, "% - 24px - 24px / ").concat(cols.length, ")");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: width
    },
    className: cls('nb-grid-col', css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n          position: relative;\n          z-index: 0;\n        "]))))
  }, props.children);
});