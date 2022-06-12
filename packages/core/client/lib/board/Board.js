"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _Column = _interopRequireDefault(require("./Column"));

var _ColumnAdder = _interopRequireDefault(require("./ColumnAdder"));

var _DefaultCard = _interopRequireDefault(require("./DefaultCard"));

var _DefaultColumnHeader = _interopRequireDefault(require("./DefaultColumnHeader"));

var helpers = _interopRequireWildcard(require("./helpers"));

var _services = require("./services");

var _utils = require("./utils");

var _withDroppable = _interopRequireDefault(require("./withDroppable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Columns = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement("div", _objectSpread({
    ref: ref,
    style: {
      whiteSpace: 'nowrap'
    }
  }, props));
});
var DroppableBoard = (0, _withDroppable.default)(Columns);

var Board = function Board(props) {
  return props.initialBoard ? /*#__PURE__*/_react.default.createElement(UncontrolledBoard, _objectSpread({}, props)) : /*#__PURE__*/_react.default.createElement(ControlledBoard, _objectSpread({}, props));
};

Object.keys(helpers).forEach(function (key) {
  Board[key] = helpers[key];
});

function UncontrolledBoard(_ref) {
  var initialBoard = _ref.initialBoard,
      onCardDragEnd = _ref.onCardDragEnd,
      onColumnDragEnd = _ref.onColumnDragEnd,
      allowAddColumn = _ref.allowAddColumn,
      cardAdderPosition = _ref.cardAdderPosition,
      renderCardAdder = _ref.renderCardAdder,
      _renderColumnAdder = _ref.renderColumnAdder,
      onNewColumnConfirm = _ref.onNewColumnConfirm,
      onColumnRemove = _ref.onColumnRemove,
      _renderColumnHeader = _ref.renderColumnHeader,
      allowRemoveColumn = _ref.allowRemoveColumn,
      allowRenameColumn = _ref.allowRenameColumn,
      onColumnRename = _ref.onColumnRename,
      onCardNew = _ref.onCardNew,
      _renderCard = _ref.renderCard,
      allowRemoveCard = _ref.allowRemoveCard,
      onCardRemove = _ref.onCardRemove,
      onColumnNew = _ref.onColumnNew,
      disableCardDrag = _ref.disableCardDrag,
      disableColumnDrag = _ref.disableColumnDrag,
      allowAddCard = _ref.allowAddCard,
      onNewCardConfirm = _ref.onNewCardConfirm;

  var _useState = (0, _react.useState)(initialBoard),
      _useState2 = _slicedToArray(_useState, 2),
      board = _useState2[0],
      setBoard = _useState2[1];

  var handleOnCardDragEnd = (0, _utils.partialRight)(handleOnDragEnd, {
    moveCallback: helpers.moveCard,
    notifyCallback: onCardDragEnd
  });
  var handleOnColumnDragEnd = (0, _utils.partialRight)(handleOnDragEnd, {
    moveCallback: helpers.moveColumn,
    notifyCallback: onColumnDragEnd
  });

  function handleOnDragEnd(_ref2, _ref3) {
    var source = _ref2.source,
        destination = _ref2.destination,
        subject = _ref2.subject;
    var moveCallback = _ref3.moveCallback,
        notifyCallback = _ref3.notifyCallback;
    var reorderedBoard = moveCallback(board, source, destination);
    (0, _utils.when)(notifyCallback)(function (callback) {
      return callback(reorderedBoard, subject, source, destination);
    });
    setBoard(reorderedBoard);
  }

  function handleColumnAdd(_x) {
    return _handleColumnAdd.apply(this, arguments);
  }

  function _handleColumnAdd() {
    _handleColumnAdd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newColumn) {
      var column, boardWithNewColumn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_renderColumnAdder) {
                _context.next = 4;
                break;
              }

              _context.t0 = newColumn;
              _context.next = 7;
              break;

            case 4:
              _context.next = 6;
              return onNewColumnConfirm(newColumn);

            case 6:
              _context.t0 = _context.sent;

            case 7:
              column = _context.t0;
              boardWithNewColumn = (0, helpers.addColumn)(board, column);
              onColumnNew(boardWithNewColumn, column);
              setBoard(boardWithNewColumn);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleColumnAdd.apply(this, arguments);
  }

  function handleColumnRemove(column) {
    var filteredBoard = (0, helpers.removeColumn)(board, column);
    onColumnRemove(filteredBoard, column);
    setBoard(filteredBoard);
  }

  function handleColumnRename(column, title) {
    var boardWithRenamedColumn = (0, helpers.changeColumn)(board, column, {
      title: title
    });
    onColumnRename(boardWithRenamedColumn, _objectSpread(_objectSpread({}, column), {}, {
      title: title
    }));
    setBoard(boardWithRenamedColumn);
  }

  function handleCardAdd(column, card) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var boardWithNewCard = (0, helpers.addCard)(board, column, card, options);
    onCardNew(boardWithNewCard, boardWithNewCard.columns.find(function (_ref4) {
      var id = _ref4.id;
      return id === column.id;
    }), card);
    setBoard(boardWithNewCard);
  }

  function handleDraftCardAdd(_x2, _x3) {
    return _handleDraftCardAdd.apply(this, arguments);
  }

  function _handleDraftCardAdd() {
    _handleDraftCardAdd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(column, card) {
      var options,
          newCard,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.next = 3;
              return onNewCardConfirm(card);

            case 3:
              newCard = _context2.sent;
              handleCardAdd(column, newCard, options);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleDraftCardAdd.apply(this, arguments);
  }

  function handleCardRemove(column, card) {
    var boardWithoutCard = (0, helpers.removeCard)(board, column, card);
    onCardRemove(boardWithoutCard, boardWithoutCard.columns.find(function (_ref5) {
      var id = _ref5.id;
      return id === column.id;
    }), card);
    setBoard(boardWithoutCard);
  }

  return /*#__PURE__*/_react.default.createElement(BoardContainer, _objectSpread(_objectSpread({
    cardAdderPosition: cardAdderPosition,
    onCardDragEnd: handleOnCardDragEnd,
    onColumnDragEnd: handleOnColumnDragEnd,
    renderCardAdder: renderCardAdder,
    renderColumnAdder: function renderColumnAdder() {
      if (!allowAddColumn) return null;
      if (_renderColumnAdder) return _renderColumnAdder({
        addColumn: handleColumnAdd
      });
      if (!onNewColumnConfirm) return null;
      return /*#__PURE__*/_react.default.createElement(_ColumnAdder.default, {
        onConfirm: function onConfirm(title) {
          return handleColumnAdd({
            title: title,
            cards: []
          });
        }
      });
    }
  }, _renderColumnHeader && {
    renderColumnHeader: function renderColumnHeader(column) {
      return _renderColumnHeader(column, {
        removeColumn: handleColumnRemove.bind(null, column),
        renameColumn: handleColumnRename.bind(null, column),
        addCard: handleCardAdd.bind(null, column)
      });
    }
  }), {}, {
    renderCard: function renderCard(column, card, dragging) {
      if (_renderCard) return _renderCard(card, {
        removeCard: handleCardRemove.bind(null, column, card),
        dragging: dragging
      });
      return /*#__PURE__*/_react.default.createElement(_DefaultCard.default, {
        dragging: dragging,
        allowRemoveCard: allowRemoveCard,
        onCardRemove: function onCardRemove(card) {
          return handleCardRemove(column, card);
        }
      }, card);
    },
    allowRemoveColumn: allowRemoveColumn,
    onColumnRemove: handleColumnRemove,
    allowRenameColumn: allowRenameColumn,
    onColumnRename: handleColumnRename,
    disableColumnDrag: disableColumnDrag,
    disableCardDrag: disableCardDrag,
    onCardNew: function onCardNew(column, card) {
      return handleDraftCardAdd(column, card, allowAddCard);
    },
    allowAddCard: allowAddCard && onNewCardConfirm
  }), board);
}

function ControlledBoard(_ref6) {
  var board = _ref6.children,
      onCardDragEnd = _ref6.onCardDragEnd,
      onColumnDragEnd = _ref6.onColumnDragEnd,
      allowAddColumn = _ref6.allowAddColumn,
      renderCardAdder = _ref6.renderCardAdder,
      _renderColumnAdder2 = _ref6.renderColumnAdder,
      onNewColumnConfirm = _ref6.onNewColumnConfirm,
      onColumnRemove = _ref6.onColumnRemove,
      renderColumnHeader = _ref6.renderColumnHeader,
      allowRemoveColumn = _ref6.allowRemoveColumn,
      allowRenameColumn = _ref6.allowRenameColumn,
      onColumnRename = _ref6.onColumnRename,
      _renderCard2 = _ref6.renderCard,
      allowAddCard = _ref6.allowAddCard,
      allowRemoveCard = _ref6.allowRemoveCard,
      _onCardRemove = _ref6.onCardRemove,
      disableCardDrag = _ref6.disableCardDrag,
      disableColumnDrag = _ref6.disableColumnDrag,
      cardAdderPosition = _ref6.cardAdderPosition;
  var handleOnCardDragEnd = (0, _utils.partialRight)(handleOnDragEnd, {
    notifyCallback: onCardDragEnd
  });
  var handleOnColumnDragEnd = (0, _utils.partialRight)(handleOnDragEnd, {
    notifyCallback: onColumnDragEnd
  });

  function handleOnDragEnd(_ref7, _ref8) {
    var source = _ref7.source,
        destination = _ref7.destination,
        subject = _ref7.subject;
    var notifyCallback = _ref8.notifyCallback;
    (0, _utils.when)(notifyCallback)(function (callback) {
      return callback(subject, source, destination);
    });
  }

  return /*#__PURE__*/_react.default.createElement(BoardContainer, _objectSpread(_objectSpread({
    cardAdderPosition: cardAdderPosition,
    onCardDragEnd: handleOnCardDragEnd,
    onColumnDragEnd: handleOnColumnDragEnd,
    renderCardAdder: renderCardAdder,
    renderColumnAdder: function renderColumnAdder() {
      if (!allowAddColumn) return null;
      if (_renderColumnAdder2) return _renderColumnAdder2();
      if (!onNewColumnConfirm) return null;
      return /*#__PURE__*/_react.default.createElement(_ColumnAdder.default, {
        onConfirm: function onConfirm(title) {
          return onNewColumnConfirm({
            title: title,
            cards: []
          });
        }
      });
    }
  }, renderColumnHeader && {
    renderColumnHeader: renderColumnHeader
  }), {}, {
    renderCard: function renderCard(column, card, dragging) {
      if (_renderCard2) return _renderCard2(card, {
        column: column,
        dragging: dragging
      });
      return /*#__PURE__*/_react.default.createElement(_DefaultCard.default, {
        dragging: dragging,
        allowRemoveCard: allowRemoveCard,
        onCardRemove: function onCardRemove(card) {
          return _onCardRemove(card, column);
        }
      }, card);
    },
    allowAddCard: allowAddCard,
    allowRemoveColumn: allowRemoveColumn,
    onColumnRemove: onColumnRemove,
    allowRenameColumn: allowRenameColumn,
    onColumnRename: onColumnRename,
    disableColumnDrag: disableColumnDrag,
    disableCardDrag: disableCardDrag
  }), board);
}

function BoardContainer(props) {
  var _board$columns2;

  var board = props.children,
      renderCard = props.renderCard,
      disableColumnDrag = props.disableColumnDrag,
      disableCardDrag = props.disableCardDrag,
      cardAdderPosition = props.cardAdderPosition,
      renderCardAdder = props.renderCardAdder,
      _renderColumnHeader2 = props.renderColumnHeader,
      renderColumnAdder = props.renderColumnAdder,
      allowRemoveColumn = props.allowRemoveColumn,
      onColumnRemove = props.onColumnRemove,
      allowRenameColumn = props.allowRenameColumn,
      onColumnRename = props.onColumnRename,
      onColumnDragEnd = props.onColumnDragEnd,
      onCardDragEnd = props.onCardDragEnd,
      onCardNew = props.onCardNew,
      allowAddCard = props.allowAddCard;

  function handleOnDragEnd(event) {
    var _board$columns;

    var coordinates = (0, _services.getCoordinates)(event, board);
    if (!coordinates.source) return;
    (0, _services.isAColumnMove)(event.type) ? (0, _services.isMovingAColumnToAnotherPosition)(coordinates) && onColumnDragEnd(_objectSpread(_objectSpread({}, coordinates), {}, {
      subject: (_board$columns = board.columns) === null || _board$columns === void 0 ? void 0 : _board$columns[coordinates.source.fromPosition]
    })) : (0, _services.isMovingACardToAnotherPosition)(coordinates) && onCardDragEnd(_objectSpread(_objectSpread({}, coordinates), {}, {
      subject: (0, _services.getCard)(board, coordinates.source)
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: handleOnDragEnd
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'flex-start'
    },
    className: "react-kanban-board"
  }, /*#__PURE__*/_react.default.createElement(DroppableBoard, {
    droppableId: "board-droppable",
    direction: "horizontal",
    type: "BOARD"
  }, (_board$columns2 = board.columns) === null || _board$columns2 === void 0 ? void 0 : _board$columns2.map(function (column, index) {
    var _column$index;

    return /*#__PURE__*/_react.default.createElement(_Column.default, {
      key: column.id,
      index: (_column$index = column === null || column === void 0 ? void 0 : column.index) !== null && _column$index !== void 0 ? _column$index : index,
      renderCard: renderCard,
      renderCardAdder: renderCardAdder,
      renderColumnHeader: function renderColumnHeader(column) {
        return _renderColumnHeader2 ? _renderColumnHeader2(column) : /*#__PURE__*/_react.default.createElement(_DefaultColumnHeader.default, {
          allowRemoveColumn: allowRemoveColumn,
          onColumnRemove: onColumnRemove,
          allowRenameColumn: allowRenameColumn,
          onColumnRename: onColumnRename
        }, column);
      },
      cardAdderPosition: cardAdderPosition,
      disableColumnDrag: disableColumnDrag,
      disableCardDrag: disableCardDrag,
      onCardNew: onCardNew,
      allowAddCard: allowAddCard
    }, column);
  })), renderColumnAdder()));
}

var _default = Board;
exports.default = _default;