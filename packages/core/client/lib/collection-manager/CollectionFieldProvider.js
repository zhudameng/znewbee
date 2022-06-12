"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionFieldProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

var _hooks = require("./hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionFieldProvider = function CollectionFieldProvider(props) {
  var name = props.name,
      field = props.field,
      children = props.children;

  var _useCollection = (0, _hooks.useCollection)(),
      getField = _useCollection.getField;

  var value = field || getField((field === null || field === void 0 ? void 0 : field.name) || name);

  if (!value) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_context.CollectionFieldContext.Provider, {
    value: value
  }, children);
};

exports.CollectionFieldProvider = CollectionFieldProvider;