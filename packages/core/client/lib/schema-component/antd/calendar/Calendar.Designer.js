"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _blockProvider = require("../../../block-provider");

var _collectionManager = require("../../../collection-manager");

var _actionHooks = require("../../../collection-manager/action-hooks");

var _schemaSettings = require("../../../schema-settings");

var _schemaTemplates = require("../../../schema-templates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useOptions = function useOptions() {
  var compile = (0, _.useCompile)();

  var _useCollection = (0, _collectionManager.useCollection)(),
      fields = _useCollection.fields;

  var options = fields === null || fields === void 0 ? void 0 : fields.map(function (field) {
    var _field$uiSchema;

    return {
      value: field.name,
      label: compile(field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title)
    };
  });
  return options;
};

var CalendarDesigner = function CalendarDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora2;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useCollection2 = (0, _collectionManager.useCollection)(),
      name = _useCollection2.name,
      title = _useCollection2.title,
      fields = _useCollection2.fields;

  var dataSource = (0, _actionHooks.useCollectionFilterOptions)(name);

  var _useCalendarBlockCont = (0, _blockProvider.useCalendarBlockContext)(),
      service = _useCalendarBlockCont.service;

  var _useDesignable = (0, _.useDesignable)(),
      dn = _useDesignable.dn;

  var compile = (0, _.useCompile)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var template = (0, _schemaTemplates.useSchemaTemplate)();
  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.params) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : _fieldSchema$xDecora$.filter) || {};
  var options = useOptions();
  var fieldNames = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora2 = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora2 === void 0 ? void 0 : _fieldSchema$xDecora2['fieldNames']) || {};
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('Title field'),
    value: fieldNames.title,
    options: options,
    onChange: function onChange(title) {
      var _schema;

      var fieldNames = field.decoratorProps.fieldNames || {};
      fieldNames['title'] = title;
      field.decoratorProps.params = fieldNames;
      fieldSchema['x-decorator-props']['params'] = fieldNames;
      service.refresh();
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', field.decoratorProps), _schema)
      });
      dn.refresh();
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('Start date field'),
    value: fieldNames.start,
    options: options,
    onChange: function onChange(start) {
      var _schema2;

      var fieldNames = field.decoratorProps.fieldNames || {};
      fieldNames['start'] = start;
      field.decoratorProps.params = fieldNames;
      fieldSchema['x-decorator-props']['params'] = fieldNames;
      service.refresh();
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-decorator-props', field.decoratorProps), _schema2)
      });
      dn.refresh();
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('End date field'),
    value: fieldNames.end,
    options: options,
    onChange: function onChange(end) {
      var _schema3;

      var fieldNames = field.decoratorProps.fieldNames || {};
      fieldNames['end'] = end;
      field.decoratorProps.params = fieldNames;
      fieldSchema['x-decorator-props']['params'] = fieldNames;
      service.refresh();
      dn.emit('patch', {
        schema: (_schema3 = {}, _defineProperty(_schema3, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema3, 'x-decorator-props', field.decoratorProps), _schema3)
      });
      dn.refresh();
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Set the data scope'),
    schema: {
      type: 'object',
      title: t('Set the data scope'),
      properties: {
        filter: {
          default: defaultFilter,
          enum: dataSource,
          'x-component': 'Filter',
          'x-component-props': {}
        }
      }
    },
    initialValues: {// title: field.title,
      // icon: field.componentProps.icon,
    },
    onSubmit: function onSubmit(_ref) {
      var _service$params, _schema4;

      var filter = _ref.filter;
      var params = field.decoratorProps.params || {};
      params.filter = filter;
      field.decoratorProps.params = params;
      fieldSchema['x-decorator-props']['params'] = params;
      service.run(_objectSpread(_objectSpread({}, service === null || service === void 0 ? void 0 : (_service$params = service.params) === null || _service$params === void 0 ? void 0 : _service$params[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema4 = {}, _defineProperty(_schema4, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema4, 'x-decorator-props', field.decoratorProps), _schema4)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Template, {
    componentName: 'Calendar',
    collectionName: name
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.CalendarDesigner = CalendarDesigner;