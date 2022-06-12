function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Card(_ref) {
  var children = _ref.children,
      index = _ref.index,
      renderCard = _ref.renderCard,
      disableCardDrag = _ref.disableCardDrag;
  return /*#__PURE__*/React.createElement(Draggable, {
    draggableId: String(children.id),
    index: index,
    isDragDisabled: disableCardDrag
  }, function (provided, _ref2) {
    var isDragging = _ref2.isDragging;
    return /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread(_objectSpread({
      ref: provided.innerRef
    }, provided.draggableProps), provided.dragHandleProps), {}, {
      "data-testid": "card-".concat(children.id)
    }), renderCard(isDragging));
  });
}

export default Card;