"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterItems = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _context = require("./context");

var _FilterGroup = require("./FilterGroup");

var _FilterItem = require("./FilterItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterItems = (0, _react.observer)(function (props) {
  var _field$value;

  var field = (0, _react.useField)();
  return /*#__PURE__*/_react2.default.createElement("div", null, field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.map(function (item, index) {
    return /*#__PURE__*/_react2.default.createElement(_context.RemoveConditionContext.Provider, {
      value: function value() {
        return field.remove(index);
      }
    }, /*#__PURE__*/_react2.default.createElement(_react.ObjectField, {
      name: index,
      component: [item.$and || item.$or ? _FilterGroup.FilterGroup : _FilterItem.FilterItem]
    }));
  }));
});
exports.FilterItems = FilterItems;