"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CardForm(_ref) {
  var onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;
  var inputCardTitle = (0, _react.useRef)();
  var inputCardDescription = (0, _react.useRef)();

  function addCard(event) {
    event.preventDefault();
    (0, _utils.when)(inputCardTitle.current.value)(function (value) {
      onConfirm({
        title: value,
        description: inputCardDescription.current.value
      });
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-kanban-card-adder-form"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: addCard
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "react-kanban-card-adder-form__title",
    name: "title",
    autoFocus: true,
    defaultValue: "Title",
    ref: inputCardTitle
  }), /*#__PURE__*/_react.default.createElement("input", {
    className: "react-kanban-card-adder-form__description",
    name: "description",
    defaultValue: "Description",
    ref: inputCardDescription
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "react-kanban-card-adder-form__button",
    type: "submit"
  }, "Add"), /*#__PURE__*/_react.default.createElement("button", {
    className: "react-kanban-card-adder-form__button",
    type: "button",
    onClick: onCancel
  }, "Cancel"))));
}

var _default = CardForm;
exports.default = _default;