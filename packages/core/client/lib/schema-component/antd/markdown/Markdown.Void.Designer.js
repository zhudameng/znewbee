"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownVoidDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _schemaSettings = require("../../../schema-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownVoidDesigner = function MarkdownVoidDesigner() {
  var field = (0, _react.useField)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, null, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Item, {
    title: t('Edit markdown'),
    onClick: function onClick() {
      field.editable = true;
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.MarkdownVoidDesigner = MarkdownVoidDesigner;