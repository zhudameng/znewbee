"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultCard(_ref) {
  var card = _ref.children,
      dragging = _ref.dragging,
      allowRemoveCard = _ref.allowRemoveCard,
      onCardRemove = _ref.onCardRemove;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-kanban-card ".concat(dragging ? 'react-kanban-card--dragging' : '')
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "react-kanban-card__title"
  }, /*#__PURE__*/_react.default.createElement("span", null, card.title), allowRemoveCard && /*#__PURE__*/_react.default.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return onCardRemove(card);
    }
  }, "\xD7"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "react-kanban-card__description"
  }, card.description));
}

var _default = DefaultCard;
exports.default = _default;