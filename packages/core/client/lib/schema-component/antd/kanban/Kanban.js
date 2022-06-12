"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toColumns = exports.Kanban = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../..");

var _2 = require("../../../");

var _hooks = require("../../../block-provider/hooks");

var _board = require("../../../board");

require("../../../board/style.less");

var _useProps2 = require("../../hooks/useProps");

var _context2 = require("./context");

require("./index.less");

var _excluded = ["groupField", "onCardDragEnd"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useCreateActionProps = function useCreateActionProps() {
  var form = (0, _react.useForm)();

  var _useContext = (0, _react2.useContext)(_context2.KanbanColumnContext),
      column = _useContext.column,
      groupField = _useContext.groupField;

  var _useCAP = (0, _hooks.useCreateActionProps)(),
      _onClick = _useCAP.onClick;

  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                form.setValuesIn(groupField.name, column.id);
                _context.next = 3;
                return _onClick();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var toColumns = function toColumns(groupField) {
  var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columns = {
    __unknown__: {
      id: '__unknown__',
      title: 'Unknown',
      color: 'default',
      cards: []
    }
  };
  groupField.uiSchema.enum.forEach(function (item) {
    columns[item.value] = {
      id: item.value,
      title: item.label,
      color: item.color,
      cards: []
    };
  });
  dataSource.forEach(function (ds) {
    var value = ds[groupField.name];

    if (value && columns[value]) {
      columns[value].cards.push(ds);
    } else {
      columns.__unknown__.cards.push(ds);
    }
  });

  if (columns.__unknown__.cards.length === 0) {
    delete columns.__unknown__;
  }

  return Object.values(columns);
};

exports.toColumns = toColumns;
var Kanban = (0, _react.observer)(function (props) {
  var _useProps = (0, _useProps2.useProps)(props),
      groupField = _useProps.groupField,
      onCardDragEnd = _useProps.onCardDragEnd,
      restProps = _objectWithoutProperties(_useProps, _excluded);

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      disableCardDrag = _useState2[0],
      setDisableCardDrag = _useState2[1];

  var schemas = (0, _react2.useMemo)(function () {
    return fieldSchema.reduceProperties(function (buf, current) {
      if (current['x-component'].endsWith('.Card')) {
        buf.card = current;
      } else if (current['x-component'].endsWith('.CardAdder')) {
        buf.cardAdder = current;
      } else if (current['x-component'].endsWith('.CardViewer')) {
        buf.cardViewer = current;
      }

      return buf;
    }, {
      card: null,
      cardAdder: null,
      cardViewer: null
    });
  }, []);

  var handleCardRemove = function handleCardRemove(card, column) {
    var updatedBoard = _board.Board.removeCard({
      columns: field.value
    }, column, card);

    field.value = updatedBoard.columns;
  };

  var handleCardDragEnd = function handleCardDragEnd(card, fromColumn, toColumn) {
    onCardDragEnd === null || onCardDragEnd === void 0 ? void 0 : onCardDragEnd({
      columns: field.value,
      groupField: groupField
    }, fromColumn, toColumn);

    var updatedBoard = _board.Board.moveCard({
      columns: field.value
    }, fromColumn, toColumn);

    field.value = updatedBoard.columns;
  };

  return /*#__PURE__*/_react2.default.createElement(_antd.Spin, {
    spinning: field.loading || false
  }, /*#__PURE__*/_react2.default.createElement(_board.Board, _objectSpread(_objectSpread({}, restProps), {}, {
    allowAddCard: !!schemas.cardAdder,
    disableColumnDrag: true,
    cardAdderPosition: 'bottom',
    disableCardDrag: restProps.disableCardDrag || disableCardDrag,
    onCardRemove: handleCardRemove,
    onCardDragEnd: handleCardDragEnd,
    renderColumnHeader: function renderColumnHeader(_ref) {
      var title = _ref.title,
          color = _ref.color;
      return /*#__PURE__*/_react2.default.createElement("div", {
        className: 'react-kanban-column-header'
      }, /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
        color: color
      }, title));
    },
    renderCard: function renderCard(card, _ref2) {
      var _field$value, _column$cards;

      var column = _ref2.column,
          dragging = _ref2.dragging;
      var columnIndex = (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.indexOf(column);
      var cardIndex = column === null || column === void 0 ? void 0 : (_column$cards = column.cards) === null || _column$cards === void 0 ? void 0 : _column$cards.indexOf(card);
      return schemas.card && /*#__PURE__*/_react2.default.createElement(_2.RecordProvider, {
        record: card
      }, /*#__PURE__*/_react2.default.createElement(_context2.KanbanCardContext.Provider, {
        value: {
          setDisableCardDrag: setDisableCardDrag,
          cardViewerSchema: schemas.cardViewer,
          cardField: field,
          card: card,
          column: column,
          dragging: dragging,
          columnIndex: columnIndex,
          cardIndex: cardIndex
        }
      }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
        name: schemas.card.name,
        schema: schemas.card
      })));
    },
    renderCardAdder: function renderCardAdder(_ref3) {
      var column = _ref3.column;

      if (!schemas.cardAdder) {
        return null;
      }

      return /*#__PURE__*/_react2.default.createElement(_context2.KanbanColumnContext.Provider, {
        value: {
          column: column,
          groupField: groupField
        }
      }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
        scope: {
          useCreateActionProps: useCreateActionProps
        }
      }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
        name: schemas.cardAdder.name,
        schema: schemas.cardAdder
      })));
    }
  }), {
    columns: field.value || []
  }));
});
exports.Kanban = Kanban;