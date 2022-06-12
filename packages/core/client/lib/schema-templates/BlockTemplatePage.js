"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockTemplatePage = void 0;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _collectionManager = require("../collection-manager");

var _schemaComponent = require("../schema-component");

var _uiSchemaTemplates = require("./collections/uiSchemaTemplates");

var _uiSchemaTemplates2 = require("./schemas/uiSchemaTemplates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockTemplatePage = function BlockTemplatePage() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.PageHeader, {
    ghost: false,
    title: t('Block templates')
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 24
    }
  }, /*#__PURE__*/_react.default.createElement(_collectionManager.CollectionManagerProvider, {
    collections: [_uiSchemaTemplates.uiSchemaTemplatesCollection]
  }, /*#__PURE__*/_react.default.createElement(_schemaComponent.SchemaComponent, {
    schema: _uiSchemaTemplates2.uiSchemaTemplatesSchema
  }))));
};

exports.BlockTemplatePage = BlockTemplatePage;