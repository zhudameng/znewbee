"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomFormItemInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _SchemaInitializer = require("../SchemaInitializer");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 表单里配置字段
var CustomFormItemInitializers = function CustomFormItemInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/_react.default.createElement(_SchemaInitializer.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    icon: 'SettingOutlined',
    items: [{
      type: 'itemGroup',
      title: t('Configure fields'),
      children: (0, _utils.useCustomFormItemInitializerFields)()
    }],
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Configure fields')
  });
};

exports.CustomFormItemInitializers = CustomFormItemInitializers;