function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import '@asseinfo/react-kanban/dist/styles.css';
import { Button } from 'antd';
import React, { useState } from 'react';
import Board from './Board';
import { addCard, moveCard, removeCard } from './helpers';
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
  var _useState = useState(board),
      _useState2 = _slicedToArray(_useState, 2),
      controlledBoard = _useState2[0],
      setBoard = _useState2[1];

  function handleCardMove(card, source, destination) {
    var updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  function handleCardRemove(card, column) {
    var updatedBoard = removeCard(controlledBoard, column, card);
    setBoard(updatedBoard);
  }

  return /*#__PURE__*/React.createElement(Board, {
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
      return /*#__PURE__*/React.createElement(Button, {
        block: true,
        type: 'text',
        onClick: function onClick() {
          var updatedBoard = addCard(controlledBoard, column, {
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

export function Kanban() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UncontrolledBoard, null));
}