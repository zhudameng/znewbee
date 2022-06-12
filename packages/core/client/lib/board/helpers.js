"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCard = addCard;
exports.addColumn = addColumn;
exports.changeCard = changeCard;
exports.changeColumn = changeColumn;
exports.moveCard = moveCard;
exports.moveColumn = moveColumn;
exports.removeCard = removeCard;
exports.removeColumn = removeColumn;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reorderCardsOnColumn(column, reorderCards) {
  return _objectSpread(_objectSpread({}, column), {}, {
    cards: reorderCards(column.cards)
  });
}

function moveColumn(board, _ref, _ref2) {
  var fromPosition = _ref.fromPosition;
  var toPosition = _ref2.toPosition;
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: (0, _utils.changeElementOfPositionInArray)(board.columns, fromPosition, toPosition)
  });
}

function moveCard(board, _ref3, _ref4) {
  var fromPosition = _ref3.fromPosition,
      fromColumnId = _ref3.fromColumnId;
  var toPosition = _ref4.toPosition,
      toColumnId = _ref4.toColumnId;
  var sourceColumn = board.columns.find(function (column) {
    return column.id === fromColumnId;
  });
  var destinationColumn = board.columns.find(function (column) {
    return column.id === toColumnId;
  });

  var reorderColumnsOnBoard = function reorderColumnsOnBoard(reorderColumnsMapper) {
    return _objectSpread(_objectSpread({}, board), {}, {
      columns: board.columns.map(reorderColumnsMapper)
    });
  };

  var reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn);
  var reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn);

  if (sourceColumn.id === destinationColumn.id) {
    var reorderedCardsOnColumn = reorderCardsOnSourceColumn(function (cards) {
      return (0, _utils.changeElementOfPositionInArray)(cards, fromPosition, toPosition);
    });
    return reorderColumnsOnBoard(function (column) {
      return column.id === sourceColumn.id ? reorderedCardsOnColumn : column;
    });
  } else {
    var reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn(function (cards) {
      return (0, _utils.removeFromArrayAtPosition)(cards, fromPosition);
    });
    var reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn(function (cards) {
      return (0, _utils.addInArrayAtPosition)(cards, sourceColumn.cards[fromPosition], toPosition);
    });
    return reorderColumnsOnBoard(function (column) {
      if (column.id === sourceColumn.id) return reorderedCardsOnSourceColumn;
      if (column.id === destinationColumn.id) return reorderedCardsOnDestinationColumn;
      return column;
    });
  }
}

function addColumn(board, column) {
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: (0, _utils.addInArrayAtPosition)(board.columns, column, board.columns.length)
  });
}

function removeColumn(board, column) {
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: board.columns.filter(function (_ref5) {
      var id = _ref5.id;
      return id !== column.id;
    })
  });
}

function changeColumn(board, column, newColumn) {
  var changedColumns = (0, _utils.replaceElementOfArray)(board.columns)({
    when: function when(_ref6) {
      var id = _ref6.id;
      return id === column.id;
    },
    for: function _for(value) {
      return _objectSpread(_objectSpread({}, value), newColumn);
    }
  });
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: changedColumns
  });
}

function addCard(board, inColumn, card) {
  var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      on = _ref7.on;

  var columnToAdd = board.columns.find(function (_ref8) {
    var id = _ref8.id;
    return id === inColumn.id;
  });
  var cards = (0, _utils.addInArrayAtPosition)(columnToAdd.cards, card, on === 'top' ? 0 : columnToAdd.cards.length);
  var columns = (0, _utils.replaceElementOfArray)(board.columns)({
    when: function when(_ref9) {
      var id = _ref9.id;
      return inColumn.id === id;
    },
    for: function _for(value) {
      return _objectSpread(_objectSpread({}, value), {}, {
        cards: cards
      });
    }
  });
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: columns
  });
}

function removeCard(board, fromColumn, card) {
  var columnToRemove = board.columns.find(function (_ref10) {
    var id = _ref10.id;
    return id === fromColumn.id;
  });
  var filteredCards = columnToRemove.cards.filter(function (_ref11) {
    var id = _ref11.id;
    return card.id !== id;
  });

  var columnWithoutCard = _objectSpread(_objectSpread({}, columnToRemove), {}, {
    cards: filteredCards
  });

  var filteredColumns = board.columns.map(function (column) {
    return fromColumn.id === column.id ? columnWithoutCard : column;
  });
  return _objectSpread(_objectSpread({}, board), {}, {
    columns: filteredColumns
  });
}

function changeCard(board, cardId, newCard) {
  var changedCards = function changedCards(cards) {
    return (0, _utils.replaceElementOfArray)(cards)({
      when: function when(_ref12) {
        var id = _ref12.id;
        return id === cardId;
      },
      for: function _for(card) {
        return _objectSpread(_objectSpread({}, card), newCard);
      }
    });
  };

  return _objectSpread(_objectSpread({}, board), {}, {
    columns: board.columns.map(function (column) {
      return _objectSpread(_objectSpread({}, column), {}, {
        cards: changedCards(column.cards)
      });
    })
  });
}