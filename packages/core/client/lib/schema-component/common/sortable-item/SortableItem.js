"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableProvider = exports.SortableItem = exports.SortableContext = exports.Sortable = exports.DraggableContext = exports.DragHandler = void 0;

var _core = require("@dnd-kit/core");

var _react = require("@formily/react");

var _react2 = _interopRequireWildcard(require("react"));

var _excluded = ["component", "style", "children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DraggableContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.DraggableContext = DraggableContext;
var SortableContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.SortableContext = SortableContext;

var SortableProvider = function SortableProvider(props) {
  var id = props.id,
      data = props.data,
      children = props.children;
  var draggable = (0, _core.useDraggable)({
    id: id,
    data: data
  });
  var droppable = (0, _core.useDroppable)({
    id: id,
    data: data
  });
  return /*#__PURE__*/_react2.default.createElement(SortableContext.Provider, {
    value: {
      draggable: draggable,
      droppable: droppable
    }
  }, children);
};

exports.SortableProvider = SortableProvider;

var Sortable = function Sortable(props) {
  var component = props.component,
      style = props.style,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var _useContext = (0, _react2.useContext)(SortableContext),
      droppable = _useContext.droppable;

  var isOver = droppable.isOver,
      setNodeRef = droppable.setNodeRef;

  var droppableStyle = _objectSpread({}, style);

  if (isOver) {
    droppableStyle['color'] = 'rgba(241, 139, 98, .1)';
  }

  return /*#__PURE__*/_react2.default.createElement(component || 'div', _objectSpread(_objectSpread({}, others), {}, {
    ref: setNodeRef,
    style: droppableStyle
  }), children);
};

exports.Sortable = Sortable;
var SortableItem = (0, _react.observer)(function (props) {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(SortableProvider, {
    id: field.address.toString(),
    data: {
      insertAdjacent: 'afterEnd',
      schema: fieldSchema
    }
  }, /*#__PURE__*/_react2.default.createElement(Sortable, _objectSpread({}, props), props.children));
});
exports.SortableItem = SortableItem;

var DragHandler = function DragHandler(props) {
  var _useContext2 = (0, _react2.useContext)(SortableContext),
      draggable = _useContext2.draggable;

  var isDragging = draggable.isDragging,
      attributes = draggable.attributes,
      listeners = draggable.listeners,
      setNodeRef = draggable.setNodeRef,
      transform = draggable.transform;
  var style = transform ? {
    transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0)")
  } : undefined;
  return /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      display: 'inline-block',
      width: 12,
      height: 12,
      lineHeight: '12px',
      textAlign: 'left'
    }
  }, /*#__PURE__*/_react2.default.createElement("div", _objectSpread(_objectSpread({
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
  }, listeners), attributes), /*#__PURE__*/_react2.default.createElement("span", {
    style: {
      cursor: 'move',
      fontSize: 14
    }
  }, props.children)));
};

exports.DragHandler = DragHandler;