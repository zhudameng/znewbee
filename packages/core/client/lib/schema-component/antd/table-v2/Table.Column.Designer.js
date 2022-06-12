"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableColumnDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _collectionManager = require("../../../collection-manager");

var _schemaSettings = require("../../../schema-settings");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useLabelFields = function useLabelFields(collectionName) {
  var _targetFields$filter, _targetFields$filter$, _targetFields$filter$2;

  if (!collectionName) {
    return [];
  }

  var compile = (0, _hooks.useCompile)();

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var targetFields = getCollectionFields(collectionName);
  return targetFields === null || targetFields === void 0 ? void 0 : (_targetFields$filter = targetFields.filter) === null || _targetFields$filter === void 0 ? void 0 : (_targetFields$filter$ = _targetFields$filter.call(targetFields, function (field) {
    return (field === null || field === void 0 ? void 0 : field.interface) && !(field === null || field === void 0 ? void 0 : field.target) && field.type !== 'boolean';
  })) === null || _targetFields$filter$ === void 0 ? void 0 : (_targetFields$filter$2 = _targetFields$filter$.map) === null || _targetFields$filter$2 === void 0 ? void 0 : _targetFields$filter$2.call(_targetFields$filter$, function (field) {
    var _field$uiSchema;

    return {
      value: field.name,
      label: compile((field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name)
    };
  });
};

var TableColumnDesigner = function TableColumnDesigner(props) {
  var _fieldSchema$xCompon, _uiSchema$xComponent, _collectionField$uiSc;

  var uiSchema = props.uiSchema,
      fieldSchema = props.fieldSchema,
      collectionField = props.collectionField;
  var field = (0, _react.useField)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var columnSchema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _hooks.useDesignable)(),
      dn = _useDesignable.dn;

  var fieldNames = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon['fieldNames']) || (uiSchema === null || uiSchema === void 0 ? void 0 : (_uiSchema$xComponent = uiSchema['x-component-props']) === null || _uiSchema$xComponent === void 0 ? void 0 : _uiSchema$xComponent['fieldNames']);
  var options = useLabelFields(collectionField === null || collectionField === void 0 ? void 0 : collectionField.target);
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    disableInitializer: true
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Custom column title'),
    schema: {
      type: 'object',
      title: t('Custom column title'),
      properties: {
        title: {
          // title: t('Column title'),
          default: columnSchema === null || columnSchema === void 0 ? void 0 : columnSchema.title,
          description: "".concat(t('Original title: ')).concat(collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc = collectionField.uiSchema) === null || _collectionField$uiSc === void 0 ? void 0 : _collectionField$uiSc.title),
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
        columnSchema.title = title;
        dn.emit('patch', {
          schema: {
            'x-uid': columnSchema['x-uid'],
            title: columnSchema.title
          }
        });
      }

      dn.refresh();
    }
  }), (collectionField === null || collectionField === void 0 ? void 0 : collectionField.interface) === 'linkTo' && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('Title field'),
    options: options,
    value: fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames['label'],
    onChange: function onChange(label) {
      var fieldNames = _objectSpread(_objectSpread({}, fieldSchema['x-component-props']['fieldNames']), {}, {
        label: label
      });

      fieldSchema['x-component-props']['fieldNames'] = fieldNames;
      field.query(".*.".concat(fieldSchema.name)).take(function (f) {
        f.componentProps.fieldNames = fieldNames;
      });
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          'x-component-props': {
            fieldNames: fieldNames
          }
        }
      });
      dn.refresh();
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    },
    confirm: {
      title: t('Delete table column')
    }
  }));
};

exports.TableColumnDesigner = TableColumnDesigner;