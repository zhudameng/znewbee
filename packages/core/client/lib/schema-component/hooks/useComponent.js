"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponent = void 0;

var _react = require("@formily/react");

var _lodash = require("lodash");

var _react2 = require("react");

var useComponent = function useComponent(component, defaults) {
  if (!component) {
    return defaults;
  }

  if (typeof component !== 'string') {
    return component;
  }

  var _useContext = (0, _react2.useContext)(_react.SchemaOptionsContext),
      components = _useContext.components;

  return (0, _lodash.get)(components, component) || defaults;
};

exports.useComponent = useComponent;