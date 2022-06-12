"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPrettyFormItemInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _SchemaInitializer = require("../SchemaInitializer");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadPrettyFormItemInitializers = function ReadPrettyFormItemInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/_react.default.createElement(_SchemaInitializer.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    icon: 'SettingOutlined',
    items: [{
      type: 'itemGroup',
      title: t('Display fields'),
      children: (0, _utils.useFormItemInitializerFields)()
    }, {
      type: 'divider'
    }, {
      type: 'item',
      title: t('Add text'),
      component: 'BlockInitializer',
      schema: {
        type: 'void',
        'x-editable': false,
        'x-decorator': 'FormItem',
        'x-designer': 'Markdown.Void.Designer',
        'x-component': 'Markdown.Void',
        'x-component-props': {
          content: t('This is a demo text, **supports Markdown syntax**.')
        }
      }
    }],
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Configure fields')
  });
};

exports.ReadPrettyFormItemInitializers = ReadPrettyFormItemInitializers;