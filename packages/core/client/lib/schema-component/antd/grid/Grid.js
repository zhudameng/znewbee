"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowContext = exports.useGridContext = exports.Grid = void 0;

var _core = require("@dnd-kit/core");

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../../../");

var _dndContext = require("../../common/dnd-context");

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var GridRowContext = /*#__PURE__*/(0, _react2.createContext)(null);
var GridColContext = /*#__PURE__*/(0, _react2.createContext)(null);
var GridContext = /*#__PURE__*/(0, _react2.createContext)({});

var ColDivider = function ColDivider(props) {
  var _useDroppable = (0, _core.useDroppable)({
    id: props.id,
    data: props.data
  }),
      isOver = _useDroppable.isOver,
      setNodeRef = _useDroppable.setNodeRef;

  var droppableStyle = {
    backgroundColor: isOver ? 'rgba(241, 139, 98, .1)' : undefined
  };
  return /*#__PURE__*/_react2.default.createElement("div", {
    ref: setNodeRef,
    className: (0, _classnames.default)('nb-col-divider', (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          width: 24px;\n        "])))),
    style: _objectSpread({}, droppableStyle)
  });
};

var RowDivider = function RowDivider(props) {
  var _useDroppable2 = (0, _core.useDroppable)({
    id: props.id,
    data: props.data
  }),
      isOver = _useDroppable2.isOver,
      setNodeRef = _useDroppable2.setNodeRef;

  var droppableStyle = {};

  if (isOver) {
    droppableStyle['backgroundColor'] = 'rgba(241, 139, 98, .1)';
  }

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  (0, _core.useDndMonitor)({
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
  return /*#__PURE__*/_react2.default.createElement("span", {
    ref: setNodeRef,
    className: (0, _classnames.default)('nb-row-divider', (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          height: 24px;\n          width: 100%;\n          position: absolute;\n          margin-top: -24px;\n        "])))),
    style: _objectSpread({
      zIndex: active ? 1000 : 0
    }, droppableStyle)
  });
};

var wrapRowSchema = function wrapRowSchema(schema) {
  var row = new _react.Schema({
    type: 'void',
    name: "row_".concat((0, _shared.uid)()),
    'x-uid': (0, _shared.uid)(),
    'x-component': 'Grid.Row'
  });
  var col = row.addProperty((0, _shared.uid)(), {
    type: 'void',
    'x-uid': (0, _shared.uid)(),
    'x-component': 'Grid.Col'
  });

  if (_react.Schema.isSchemaInstance(schema)) {
    schema.parent = col;
  }

  col.addProperty(schema.name, schema);
  return row;
};

var wrapColSchema = function wrapColSchema(schema) {
  var s = new _react.Schema({
    type: 'void',
    name: "col_".concat((0, _shared.uid)()),
    'x-uid': (0, _shared.uid)(),
    'x-component': 'Grid.Col'
  }); // parent 更新了，需要重新指定

  if (_react.Schema.isSchemaInstance(schema)) {
    schema.parent = s;
  }

  s.addProperty(schema.name, schema);
  return s;
};

var useRowProperties = function useRowProperties() {
  var fieldSchema = (0, _react.useFieldSchema)();
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'Grid.Row' && !s['x-hidden']) {
      buf.push(s);
    }

    return buf;
  }, []);
};

var useColProperties = function useColProperties() {
  var fieldSchema = (0, _react.useFieldSchema)();
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'Grid.Col' && !s['x-hidden']) {
      buf.push(s);
    }

    return buf;
  }, []);
};

var DndWrapper = function DndWrapper(props) {
  if (props.dndContext === false) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  return /*#__PURE__*/_react2.default.createElement(_dndContext.DndContext, _objectSpread({}, props.dndContext), props.children);
};

var useGridContext = function useGridContext() {
  return (0, _react2.useContext)(GridContext);
};

exports.useGridContext = useGridContext;

var useGridRowContext = function useGridRowContext() {
  return (0, _react2.useContext)(GridRowContext);
};

exports.useGridRowContext = useGridRowContext;
var Grid = (0, _react.observer)(function (props) {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useSchemaInitializer = (0, _.useSchemaInitializer)(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  var addr = field.address.toString();
  var rows = useRowProperties();
  return /*#__PURE__*/_react2.default.createElement(GridContext.Provider, {
    value: {
      fieldSchema: fieldSchema,
      renderSchemaInitializer: render
    }
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: 'nb-grid',
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/_react2.default.createElement(DndWrapper, {
    dndContext: props.dndContext
  }, /*#__PURE__*/_react2.default.createElement(RowDivider, {
    id: "".concat(addr, "_0"),
    data: {
      wrapSchema: wrapRowSchema,
      insertAdjacent: 'afterBegin',
      schema: fieldSchema
    }
  }), rows.map(function (schema, index) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, {
      key: schema.name
    }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
      name: schema.name,
      schema: schema
    }), /*#__PURE__*/_react2.default.createElement(RowDivider, {
      id: "".concat(addr, "_").concat(index + 1),
      data: {
        wrapSchema: wrapRowSchema,
        insertAdjacent: 'afterEnd',
        schema: schema
      }
    }));
  })), render()));
});
exports.Grid = Grid;
Grid.Row = (0, _react.observer)(function (props) {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var addr = field.address.toString();
  var cols = useColProperties();
  return /*#__PURE__*/_react2.default.createElement(GridRowContext.Provider, {
    value: {
      cols: cols
    }
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _classnames.default)('nb-grid-row', (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            margin: 0 -24px;\n            display: flex;\n            position: relative;\n            z-index: 0;\n          "]))))
  }, /*#__PURE__*/_react2.default.createElement(ColDivider, {
    id: "".concat(addr, "_0"),
    data: {
      wrapSchema: wrapColSchema,
      insertAdjacent: 'afterBegin',
      schema: fieldSchema
    }
  }), cols.map(function (schema, index) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, {
      key: schema.name
    }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
      name: schema.name,
      schema: schema
    }), /*#__PURE__*/_react2.default.createElement(ColDivider, {
      id: "".concat(addr, "_").concat(index + 1),
      data: {
        wrapSchema: wrapColSchema,
        insertAdjacent: 'afterEnd',
        schema: schema
      }
    }));
  })));
});
Grid.Col = (0, _react.observer)(function (props) {
  var _useContext = (0, _react2.useContext)(GridRowContext),
      cols = _useContext.cols;

  var w = props.width || 100 / cols.length;
  var width = "calc(".concat(w, "% - 24px - 24px / ").concat(cols.length, ")");
  return /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      width: width
    },
    className: (0, _classnames.default)('nb-grid-col', (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n          position: relative;\n          z-index: 0;\n        "]))))
  }, props.children);
});