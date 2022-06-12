"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordBlockInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useRelationFields = function useRelationFields() {
  var _useCollection = (0, _.useCollection)(),
      fields = _useCollection.fields;

  return fields.filter(function (field) {
    return ['linkTo', 'subTable'].includes(field.interface);
  }).map(function (field) {
    var _field$uiSchema;

    return {
      key: field.name,
      type: 'item',
      field: field,
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name,
      component: 'RecordAssociationBlockInitializer'
    };
  });
};

var RecordBlockInitializers = function RecordBlockInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/_react.default.createElement(_.SchemaInitializer.Button, {
    wrap: _utils.gridRowColWrap,
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Add block'),
    icon: 'PlusOutlined',
    items: [{
      type: 'itemGroup',
      title: '{{t("Current record blocks")}}',
      children: [{
        key: 'details',
        type: 'item',
        title: '{{t("Details")}}',
        component: 'RecordReadPrettyFormBlockInitializer'
      }, {
        key: 'form',
        type: 'item',
        title: '{{t("Form")}}',
        component: 'RecordFormBlockInitializer'
      }]
    }, {
      type: 'itemGroup',
      title: '{{t("Relationship blocks")}}',
      children: useRelationFields()
    }, {
      type: 'itemGroup',
      title: '{{t("Media")}}',
      children: [{
        key: 'markdown',
        type: 'item',
        title: '{{t("Markdown")}}',
        component: 'MarkdownBlockInitializer'
      }]
    }]
  });
};

exports.RecordBlockInitializers = RecordBlockInitializers;