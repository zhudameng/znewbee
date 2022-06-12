import React, { createRef } from 'react';
import { when } from './utils';

function ColumnForm(_ref) {
  var onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;
  // FIXME use hook
  var inputColumnTitle = /*#__PURE__*/createRef();

  function addColumn(event) {
    event.preventDefault();
    when(inputColumnTitle.current.value)(onConfirm);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: 'react-kanban-column',
    style: {
      minWidth: '230px'
    }
  }, /*#__PURE__*/React.createElement("form", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    onSubmit: addColumn
  }, /*#__PURE__*/React.createElement("input", {
    type: 'text',
    ref: inputColumnTitle,
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    type: 'submit'
  }, "Add"), /*#__PURE__*/React.createElement("button", {
    type: 'button',
    onClick: onCancel
  }, "Cancel")));
}

export default ColumnForm;