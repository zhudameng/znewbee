import React from 'react';

function DefaultCard(_ref) {
  var card = _ref.children,
      dragging = _ref.dragging,
      allowRemoveCard = _ref.allowRemoveCard,
      onCardRemove = _ref.onCardRemove;
  return /*#__PURE__*/React.createElement("div", {
    className: "react-kanban-card ".concat(dragging ? 'react-kanban-card--dragging' : '')
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    className: "react-kanban-card__title"
  }, /*#__PURE__*/React.createElement("span", null, card.title), allowRemoveCard && /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return onCardRemove(card);
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    className: "react-kanban-card__description"
  }, card.description));
}

export default DefaultCard;