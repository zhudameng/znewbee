"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesignableSwitch = void 0;

var _icons = require("@ant-design/icons");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("..");

var _pluginManager = require("../../plugin-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DesignableSwitch = function DesignableSwitch() {
  var _useDesignable = (0, _.useDesignable)(),
      designable = _useDesignable.designable,
      setDesignable = _useDesignable.setDesignable;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var style = {};

  if (designable) {
    style['backgroundColor'] = '#f18b62';
  }

  return /*#__PURE__*/_react.default.createElement(_pluginManager.PluginManager.Toolbar.Item, {
    selected: designable,
    icon: /*#__PURE__*/_react.default.createElement(_icons.HighlightOutlined, null),
    title: t('UI Editor'),
    style: style,
    onClick: function onClick() {
      setDesignable(!designable);
    }
  });
};

exports.DesignableSwitch = DesignableSwitch;