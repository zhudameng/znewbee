"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProps = void 0;

var _shared = require("@formily/shared");

var _excluded = ["useProps"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useProps = function useProps(props, options) {
  var useProps = props.useProps,
      props1 = _objectWithoutProperties(props, _excluded);

  var props2 = (useProps === null || useProps === void 0 ? void 0 : useProps()) || {};
  return (0, _shared.merge)(props1 || {}, props2, options);
};

exports.useProps = useProps;