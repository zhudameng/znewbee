function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { forwardRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import CardAdder from './CardAdder';
import { pickPropOut } from './utils';
import withDroppable from './withDroppable';
var ColumnEmptyPlaceholder = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement("div", _objectSpread({
    ref: ref,
    style: {
      minHeight: 'inherit',
      height: 'inherit'
    }
  }, props));
});
var DroppableColumn = withDroppable(ColumnEmptyPlaceholder);

function Column(_ref) {
  var children = _ref.children,
      columnIndex = _ref.index,
      _renderCard = _ref.renderCard,
      _ref$renderCardAdder = _ref.renderCardAdder,
      renderCardAdder = _ref$renderCardAdder === void 0 ? function (_ref2) {
    var column = _ref2.column,
        onConfirm = _ref2.onConfirm;
    return /*#__PURE__*/React.createElement(CardAdder, {
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
  return /*#__PURE__*/React.createElement(Draggable, {
    draggableId: "column-draggable-".concat(children.id),
    index: columnIndex,
    isDragDisabled: disableColumnDrag
  }, function (columnProvided) {
    var _children$cards;

    var draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style');
    return /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread({
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
    }), /*#__PURE__*/React.createElement("div", _objectSpread({}, columnProvided.dragHandleProps), renderColumnHeader(children)), cardAdderPosition === 'top' && allowAddCard && renderCardAdder({
      column: children,
      onConfirm: onCardNew
    }), /*#__PURE__*/React.createElement(DroppableColumn, {
      droppableId: String(children.id)
    }, (children === null || children === void 0 ? void 0 : (_children$cards = children.cards) === null || _children$cards === void 0 ? void 0 : _children$cards.length) ? /*#__PURE__*/React.createElement("div", {
      className: "react-kanban-card-skeleton"
    }, children.cards.map(function (card, index) {
      return /*#__PURE__*/React.createElement(Card, {
        key: card.id,
        index: index,
        renderCard: function renderCard(dragging) {
          return _renderCard(children, card, dragging);
        },
        disableCardDrag: disableCardDrag
      }, card);
    })) : /*#__PURE__*/React.createElement("div", {
      className: "react-kanban-card-skeleton"
    })), cardAdderPosition === 'bottom' && allowAddCard && renderCardAdder({
      column: children,
      onConfirm: onCardNew
    }));
  });
}

export default Column;