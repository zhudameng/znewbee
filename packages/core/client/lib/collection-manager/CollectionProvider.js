"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

var _hooks = require("./hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionProvider = function CollectionProvider(props) {
  var allowNull = props.allowNull,
      name = props.name,
      collection = props.collection,
      children = props.children;

  var _useCollectionManager = (0, _hooks.useCollectionManager)(),
      getCollection = _useCollectionManager.getCollection;

  var value = getCollection(collection || name);

  if (!value && !allowNull) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_context.CollectionContext.Provider, {
    value: value
  }, children);
};

exports.CollectionProvider = CollectionProvider;