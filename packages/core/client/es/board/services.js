function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCoordinates(event, board) {
  if (event.destination === null) return {};
  var columnSource = {
    fromPosition: event.source.index
  };
  var columnDestination = {
    toPosition: event.destination.index
  };

  if (isAColumnMove(event.type)) {
    return {
      source: columnSource,
      destination: columnDestination
    };
  }

  return {
    source: _objectSpread(_objectSpread({}, columnSource), {}, {
      fromColumnId: getColumn(board, event.source.droppableId).id
    }),
    destination: _objectSpread(_objectSpread({}, columnDestination), {}, {
      toColumnId: getColumn(board, event.destination.droppableId).id
    })
  };
}

function isAColumnMove(type) {
  return type === 'BOARD';
}

function getCard(board, sourceCoordinate) {
  var column = board.columns.find(function (column) {
    return column.id === sourceCoordinate.fromColumnId;
  });
  return column.cards[sourceCoordinate.fromPosition];
}

function getColumn(board, droppableId) {
  return board.columns.find(function (_ref) {
    var id = _ref.id;
    return String(id) === droppableId;
  });
}

function isMovingAColumnToAnotherPosition(coordinates) {
  return coordinates.source.fromPosition !== coordinates.destination.toPosition;
}

function isMovingACardToAnotherPosition(coordinates) {
  return !(coordinates.source.fromPosition === coordinates.destination.toPosition && coordinates.source.fromColumnId === coordinates.destination.toColumnId);
}

export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition };