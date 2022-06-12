"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kanban = Kanban;

require("@asseinfo/react-kanban/dist/styles.css");

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _Board = _interopRequireDefault(require("./Board"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var board = {
  columns: [{
    id: 1,
    title: 'Backlog',
    cards: [{
      id: 1,
      title: 'Card title 1',
      description: 'Card content'
    }, {
      id: 2,
      title: 'Card title 2',
      description: 'Card content'
    }, {
      id: 3,
      title: 'Card title 3',
      description: 'Card content'
    }]
  }, {
    id: 2,
    title: 'Doing',
    cards: [{
      id: 9,
      title: 'Card title 9',
      description: 'Card content'
    }]
  }, {
    id: 3,
    title: 'Q&A',
    cards: [{
      id: 10,
      title: 'Card title 10',
      description: 'Card content'
    }, {
      id: 11,
      title: 'Card title 11',
      description: 'Card content'
    }]
  }, {
    id: 4,
    title: 'Production',
    cards: [{
      id: 12,
      title: 'Card title 12',
      description: 'Card content'
    }, {
      id: 13,
      title: 'Card title 13',
      description: 'Card content'
    }]
  }]
};

function UncontrolledBoard() {
  var _useState = (0, _react.useState)(board),
      _useState2 = _slicedToArray(_useState, 2),
      controlledBoard = _useState2[0],
      setBoard = _useState2[1];

  function handleCardMove(card, source, destination) {
    var updatedBoard = (0, _helpers.moveCard)(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  function handleCardRemove(card, column) {
    var updatedBoard = (0, _helpers.removeCard)(controlledBoard, column, card);
    setBoard(updatedBoard);
  }

  return /*#__PURE__*/_react.default.createElement(_Board.default, {
    disableColumnDrag: true,
    allowRemoveCard: true,
    allowAddCard: {
      on: 'bottom'
    },
    onLaneRemove: console.log,
    onCardRemove: handleCardRemove,
    onCardDragEnd: handleCardMove,
    onLaneRename: console.log,
    cardAdderPosition: 'bottom',
    onNewCardConfirm: function onNewCardConfirm(draftCard) {
      return draftCard;
    },
    onCardNew: console.log,
    renderCardAdder: function renderCardAdder(_ref) {
      var column = _ref.column;
      return /*#__PURE__*/_react.default.createElement(_antd.Button, {
        block: true,
        type: 'text',
        onClick: function onClick() {
          var updatedBoard = (0, _helpers.addCard)(controlledBoard, column, {
            id: new Date().getTime(),
            title: 'Card title ' + new Date().getTime(),
            description: 'Card content'
          });
          setBoard(updatedBoard);
        }
      }, "\u6DFB\u52A0\u5361\u7247");
    }
  }, controlledBoard);
}

function Kanban() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(UncontrolledBoard, null));
}