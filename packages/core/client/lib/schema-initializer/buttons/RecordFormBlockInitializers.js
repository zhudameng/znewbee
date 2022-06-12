"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordFormBlockInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordFormBlockInitializers = function RecordFormBlockInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react.default.createElement(_.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    title: t('Add block'),
    icon: 'PlusOutlined',
    items: [{
      type: 'itemGroup',
      title: '{{ t("Data blocks") }}',
      children: [{
        type: 'item',
        title: '{{ t("Form") }}',
        component: 'RecordFormBlockInitializer'
      }]
    }, {
      type: 'itemGroup',
      title: '{{t("Media")}}',
      children: [{
        type: 'item',
        title: '{{t("Markdown")}}',
        component: 'MarkdownBlockInitializer'
      }]
    }]
  });
};

exports.RecordFormBlockInitializers = RecordFormBlockInitializers;