"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormDesigner = void 0;

var _react = _interopRequireDefault(require("react"));

var _collectionManager = require("../../../collection-manager");

var _schemaSettings = require("../../../schema-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormDesigner = function FormDesigner() {
  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      title = _useCollection.title;

  return /*#__PURE__*/_react.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    title: title || name
  }, /*#__PURE__*/_react.default.createElement(_schemaSettings.SchemaSettings.Template, {
    componentName: 'Form',
    collectionName: name
  }), /*#__PURE__*/_react.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.FormDesigner = FormDesigner;