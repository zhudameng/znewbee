"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;

var _css = require("@emotion/css");

var _antd = require("@formily/antd");

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _collectionManager = require("../../../collection-manager");

var _schemaSettings = require("../../../schema-settings");

var _blockItem = require("../block-item");

var _shared = require("../input/shared");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormItem = function FormItem(props) {
  var field = (0, _react.useField)();
  return /*#__PURE__*/_react2.default.createElement(_blockItem.BlockItem, {
    className: 'nb-form-item'
  }, /*#__PURE__*/_react2.default.createElement(_antd.FormItem, _objectSpread(_objectSpread({
    className: "".concat((0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["& .ant-space{\n        flex-wrap:wrap;\n      }"]))))
  }, props), {}, {
    extra: field.description ? /*#__PURE__*/_react2.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: (0, _shared.HTMLEncode)(field.description).split('\n').join('<br/>')
      }
    }) : null
  })));
};

exports.FormItem = FormItem;

FormItem.Designer = function () {
  var _collectionField$uiSc, _collectionField$uiSc2, _fieldSchema$xDecora, _field$componentProps, _field$componentProps2;

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var _useCollection = (0, _collectionManager.useCollection)(),
      getField = _useCollection.getField;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useDesignable = (0, _.useDesignable)(),
      dn = _useDesignable.dn,
      refresh = _useDesignable.refresh;

  var compile = (0, _.useCompile)();
  var collectionField = getField(fieldSchema['name']);
  var originalTitle = collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc = collectionField.uiSchema) === null || _collectionField$uiSc === void 0 ? void 0 : _collectionField$uiSc.title;
  var targetFields = (collectionField === null || collectionField === void 0 ? void 0 : collectionField.target) ? getCollectionFields(collectionField.target) : [];
  var initialValue = {
    title: field.title === originalTitle ? undefined : field.title
  };

  if (!field.readPretty) {
    initialValue['required'] = field.required;
  }

  var options = targetFields.filter(function (field) {
    return !(field === null || field === void 0 ? void 0 : field.target) && field.type !== 'boolean';
  }).map(function (field) {
    var _field$uiSchema;

    return {
      value: field === null || field === void 0 ? void 0 : field.name,
      label: compile(field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || (field === null || field === void 0 ? void 0 : field.name)
    };
  });
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, null, collectionField && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Edit field title'),
    schema: {
      type: 'object',
      title: t('Edit field title'),
      properties: {
        title: {
          title: t('Field title'),
          default: field === null || field === void 0 ? void 0 : field.title,
          description: "".concat(t('Original field title: ')).concat(collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc2 = collectionField.uiSchema) === null || _collectionField$uiSc2 === void 0 ? void 0 : _collectionField$uiSc2.title),
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title;

      if (title) {
        field.title = title;
        fieldSchema.title = title;
        dn.emit('patch', {
          schema: {
            'x-uid': fieldSchema['x-uid'],
            title: fieldSchema.title
          }
        });
      }

      dn.refresh();
    }
  }), !field.readPretty && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Edit description'),
    schema: {
      type: 'object',
      title: t('Edit description'),
      properties: {
        description: {
          // title: t('Description'),
          default: field === null || field === void 0 ? void 0 : field.description,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref2) {
      var description = _ref2.description;
      field.description = description;
      fieldSchema.description = description;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          description: fieldSchema.description
        }
      });
      dn.refresh();
    }
  }), field.readPretty && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Edit tooltip'),
    schema: {
      type: 'object',
      title: t('Edit description'),
      properties: {
        tooltip: {
          default: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : _fieldSchema$xDecora.tooltip,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref3) {
      var tooltip = _ref3.tooltip;
      field.decoratorProps.tooltip = tooltip;
      fieldSchema['x-decorator-props'] = fieldSchema['x-decorator-props'] || {};
      fieldSchema['x-decorator-props']['tooltip'] = tooltip;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          'x-decorator-props': fieldSchema['x-decorator-props']
        }
      });
      dn.refresh();
    }
  }), !field.readPretty && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SwitchItem, {
    title: t('Required'),
    checked: field.required,
    onChange: function onChange(required) {
      var schema = _defineProperty({}, 'x-uid', fieldSchema['x-uid']);

      field.required = required;
      fieldSchema['required'] = required;
      schema['required'] = required;
      dn.emit('patch', {
        schema: schema
      });
      refresh();
    }
  }), (collectionField === null || collectionField === void 0 ? void 0 : collectionField.target) && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('Title field'),
    options: options,
    value: field === null || field === void 0 ? void 0 : (_field$componentProps = field.componentProps) === null || _field$componentProps === void 0 ? void 0 : (_field$componentProps2 = _field$componentProps.fieldNames) === null || _field$componentProps2 === void 0 ? void 0 : _field$componentProps2.label,
    onChange: function onChange(label) {
      var schema = _defineProperty({}, 'x-uid', fieldSchema['x-uid']);

      var fieldNames = _objectSpread(_objectSpread({}, field.componentProps.fieldNames), {}, {
        label: label
      });

      fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
      fieldSchema['x-component-props']['fieldNames'] = fieldNames;
      field.componentProps.fieldNames = fieldNames;
      schema['x-component-props'] = {
        fieldNames: fieldNames
      };
      dn.emit('patch', {
        schema: schema
      });
      dn.refresh();
    }
  }), collectionField && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    confirm: {
      title: t('Delete field')
    },
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};