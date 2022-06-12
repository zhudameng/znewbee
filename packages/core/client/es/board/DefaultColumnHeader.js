function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';

function ColumnTitle(_ref) {
  var allowRenameColumn = _ref.allowRenameColumn,
      onClick = _ref.onClick,
      title = _ref.children;
  return allowRenameColumn ? /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: onClick
  }, title) : /*#__PURE__*/React.createElement("span", null, title);
}

function useRenameMode(state) {
  var _useState = useState(state),
      _useState2 = _slicedToArray(_useState, 2),
      renameMode = _useState2[0],
      setRenameMode = _useState2[1];

  function toggleRenameMode() {
    setRenameMode(!renameMode);
  }

  return [renameMode, toggleRenameMode];
}

function DefaultColumnHeader(_ref2) {
  var column = _ref2.children,
      allowRemoveColumn = _ref2.allowRemoveColumn,
      onColumnRemove = _ref2.onColumnRemove,
      allowRenameColumn = _ref2.allowRenameColumn,
      onColumnRename = _ref2.onColumnRename;

  var _useRenameMode = useRenameMode(false),
      _useRenameMode2 = _slicedToArray(_useRenameMode, 2),
      renameMode = _useRenameMode2[0],
      toggleRenameMode = _useRenameMode2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      titleInput = _useState4[0],
      setTitleInput = _useState4[1];

  function handleRenameColumn(event) {
    event.preventDefault();
    onColumnRename(column, titleInput);
    toggleRenameMode();
  }

  function handleRenameMode() {
    setTitleInput(column.title);
    toggleRenameMode();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: 'react-kanban-column-header'
  }, renameMode ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleRenameColumn
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("input", {
    type: 'text',
    value: titleInput,
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      return setTitleInput(value);
    },
    autoFocus: true
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("button", {
    className: 'react-kanban-column-header__button',
    type: 'submit'
  }, "Rename"), /*#__PURE__*/React.createElement("button", {
    className: 'react-kanban-column-header__button',
    type: 'button',
    onClick: handleRenameMode
  }, "Cancel"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ColumnTitle, {
    allowRenameColumn: allowRenameColumn,
    onClick: handleRenameMode
  }, column.title), allowRemoveColumn && /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      return onColumnRemove(column);
    }
  }, "\xD7")));
}

export default DefaultColumnHeader;