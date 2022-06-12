"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _2 = require("../../../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabsDesigner = function TabsDesigner() {
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _.useDesignable)(),
      dn = _useDesignable.dn;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react2.default.createElement(_2.GeneralSchemaDesigner, {
    disableInitializer: true
  }, /*#__PURE__*/_react2.default.createElement(_2.SchemaSettings.ModalItem, {
    title: t('Edit'),
    schema: {
      type: 'object',
      title: t('Edit tab'),
      properties: {
        title: {
          title: t('Tab name'),
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {}
        }
      }
    },
    initialValues: {
      title: field.title
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title;

      if (title) {
        var _schema;

        fieldSchema.title = title;
        field.title = title;
        dn.emit('patch', {
          schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, "title", title), _schema)
        });
        dn.refresh();
      }
    }
  }), /*#__PURE__*/_react2.default.createElement(_2.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_2.SchemaSettings.Remove, null));
};

exports.TabsDesigner = TabsDesigner;