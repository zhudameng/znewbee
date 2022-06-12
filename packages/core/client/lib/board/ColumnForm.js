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

function ColumnForm(_ref) {
  var onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;
  // FIXME use hook
  var inputColumnTitle = /*#__PURE__*/(0, _react.createRef)();

  function addColumn(event) {
    event.preventDefault();
    (0, _utils.when)(inputColumnTitle.current.value)(onConfirm);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'react-kanban-column',
    style: {
      minWidth: '230px'
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    onSubmit: addColumn
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: 'text',
    ref: inputColumnTitle,
    autoFocus: true
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: 'submit'
  }, "Add"), /*#__PURE__*/_react.default.createElement("button", {
    type: 'button',
    onClick: onCancel
  }, "Cancel")));
}

var _default = ColumnForm;
exports.default = _default;