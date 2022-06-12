"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableSelectorInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableSelectorInitializers = function TableSelectorInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react.default.createElement(_.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    title: t('Add block'),
    icon: 'PlusOutlined',
    items: [{
      type: 'itemGroup',
      title: 'Selector',
      children: [{
        key: 'details',
        type: 'item',
        title: 'Table',
        component: 'TableSelectorInitializer'
      }]
    }, {
      type: 'itemGroup',
      title: t('Media'),
      children: [{
        type: 'item',
        title: t('Add text'),
        component: 'BlockInitializer',
        schema: {
          type: 'void',
          'x-editable': false,
          'x-decorator': 'BlockItem',
          'x-designer': 'Markdown.Void.Designer',
          'x-component': 'Markdown.Void',
          'x-component-props': {
            content: t('This is a demo text, **supports Markdown syntax**.')
          }
        }
      }]
    }]
  });
};

exports.TableSelectorInitializers = TableSelectorInitializers;