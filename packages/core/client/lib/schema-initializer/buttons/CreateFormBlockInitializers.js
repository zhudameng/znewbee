"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFormBlockInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateFormBlockInitializers = function CreateFormBlockInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/_react.default.createElement(_.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    title: component ? null : t('Add block'),
    icon: 'PlusOutlined',
    insertPosition: insertPosition,
    component: component,
    items: [{
      type: 'itemGroup',
      title: '{{t("Data blocks")}}',
      children: [{
        type: 'item',
        title: '{{t("Form")}}',
        component: 'CreateFormBlockInitializer'
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

exports.CreateFormBlockInitializers = CreateFormBlockInitializers;