"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _Card = _interopRequireDefault(require("./Card"));

var _CardAdder = _interopRequireDefault(require("./CardAdder"));

var _utils = require("./utils");

var _withDroppable = _interopRequireDefault(require("./withDroppable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColumnEmptyPlaceholder = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement("div", _objectSpread({
    ref: ref,
    style: {
      minHeight: 'inherit',
      height: 'inherit'
    }
  }, props));
});
var DroppableColumn = (0, _withDroppable.default)(ColumnEmptyPlaceholder);

function Column(_ref) {
  var children = _ref.children,
      columnIndex = _ref.index,
      _renderCard = _ref.renderCard,
      _ref$renderCardAdder = _ref.renderCardAdder,
      renderCardAdder = _ref$renderCardAdder === void 0 ? function (_ref2) {
    var column = _ref2.column,
        onConfirm = _ref2.onConfirm;
    return /*#__PURE__*/_react.default.createElement(_CardAdder.default, {
      column: column,
      onConfirm: onConfirm
    });
  } : _ref$renderCardAdder,
      renderColumnHeader = _ref.renderColumnHeader,
      disableColumnDrag = _ref.disableColumnDrag,
      disableCardDrag = _ref.disableCardDrag,
      onCardNew = _ref.onCardNew,
      allowAddCard = _ref.allowAddCard,
      _ref$cardAdderPositio = _ref.cardAdderPosition,
      cardAdderPosition = _ref$cardAdderPositio === void 0 ? 'top' : _ref$cardAdderPositio;
  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
    draggableId: "column-draggable-".concat(children.id),
    index: columnIndex,
    isDragDisabled: disableColumnDrag
  }, function (columnProvided) {
    var _children$cards;

    var draggablePropsWithoutStyle = (0, _utils.pickPropOut)(columnProvided.draggableProps, 'style');
    return /*#__PURE__*/_react.default.createElement("div", _objectSpread(_objectSpread({
      ref: columnProvided.innerRef
    }, draggablePropsWithoutStyle), {}, {
      style: _objectSpread({
        height: '100%',
        minHeight: '28px',
        display: 'inline-block',
        verticalAlign: 'top'
      }, columnProvided.draggableProps.style),
      className: "react-kanban-column",
      "data-testid": "column-".concat(children.id)
    }), /*#__PURE__*/_react.default.createElement("div", _objectSpread({}, columnProvided.dragHandleProps), renderColumnHeader(children)), cardAdderPosition === 'top' && allowAddCard && renderCardAdder({
      column: children,
      onConfirm: onCardNew
    }), /*#__PURE__*/_react.default.createElement(DroppableColumn, {
      droppableId: String(children.id)
    }, (children === null || children === void 0 ? void 0 : (_children$cards = children.cards) === null || _children$cards === void 0 ? void 0 : _children$cards.length) ? /*#__PURE__*/_react.default.createElement("div", {
      className: "react-kanban-card-skeleton"
    }, children.cards.map(function (card, index) {
      return /*#__PURE__*/_react.default.createElement(_Card.default, {
        key: card.id,
        index: index,
        renderCard: function renderCard(dragging) {
          return _renderCard(children, card, dragging);
        },
        disableCardDrag: disableCardDrag
      }, card);
    })) : /*#__PURE__*/_react.default.createElement("div", {
      className: "react-kanban-card-skeleton"
    })), cardAdderPosition === 'bottom' && allowAddCard && renderCardAdder({
      column: children,
      onConfirm: onCardNew
    }));
  });
}

var _default = Column;
exports.default = _default;