"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableArrayDesigner = void 0;

var _react = _interopRequireDefault(require("react"));

var _schemaSettings = require("../../../schema-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableArrayDesigner = function TableArrayDesigner() {
  return /*#__PURE__*/_react.default.createElement(_schemaSettings.GeneralSchemaDesigner, null, /*#__PURE__*/_react.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.TableArrayDesigner = TableArrayDesigner;