import React, { useRef } from 'react';
import { when } from './utils';

function CardForm(_ref) {
  var onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;
  var inputCardTitle = useRef();
  var inputCardDescription = useRef();

  function addCard(event) {
    event.preventDefault();
    when(inputCardTitle.current.value)(function (value) {
      onConfirm({
        title: value,
        description: inputCardDescription.current.value
      });
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "react-kanban-card-adder-form"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: addCard
  }, /*#__PURE__*/React.createElement("input", {
    className: "react-kanban-card-adder-form__title",
    name: "title",
    autoFocus: true,
    defaultValue: "Title",
    ref: inputCardTitle
  }), /*#__PURE__*/React.createElement("input", {
    className: "react-kanban-card-adder-form__description",
    name: "description",
    defaultValue: "Description",
    ref: inputCardDescription
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '5px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "react-kanban-card-adder-form__button",
    type: "submit"
  }, "Add"), /*#__PURE__*/React.createElement("button", {
    className: "react-kanban-card-adder-form__button",
    type: "button",
    onClick: onCancel
  }, "Cancel"))));
}

export default CardForm;