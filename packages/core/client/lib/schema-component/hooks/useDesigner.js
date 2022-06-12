"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDesigner = void 0;

var _react = require("@formily/react");

var _ = require(".");

var Def = function Def() {
  return null;
};

var useDesigner = function useDesigner() {
  var _useDesignable = (0, _.useDesignable)(),
      designable = _useDesignable.designable;

  var fieldSchema = (0, _react.useFieldSchema)();
  var component = (0, _.useComponent)(fieldSchema['x-designer'], Def);
  return designable ? component : Def;
};

exports.useDesigner = useDesigner;