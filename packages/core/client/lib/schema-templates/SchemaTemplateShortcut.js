"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaTemplateShortcut = void 0;

var _icons = require("@ant-design/icons");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _reactRouterDom = require("react-router-dom");

var _pluginManager = require("../plugin-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaTemplateShortcut = function SchemaTemplateShortcut() {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var history = (0, _reactRouterDom.useHistory)();
  return /*#__PURE__*/_react.default.createElement(_pluginManager.PluginManager.Toolbar.Item, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.LayoutOutlined, null),
    title: t('Block templates'),
    onClick: function onClick() {
      history.push('/admin/plugins/block-templates');
    }
  });
};

exports.SchemaTemplateShortcut = SchemaTemplateShortcut;