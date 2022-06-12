"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterableFields = exports.FilterActionDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _collectionManager = require("../../../collection-manager");

var _schemaSettings = require("../../../schema-settings");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useFilterableFields = function useFilterableFields(collectionName) {
  var _fields$filter;

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      getCollectionFields = _useCollectionManager.getCollectionFields,
      getInterface = _useCollectionManager.getInterface;

  var fields = getCollectionFields(collectionName);
  return fields === null || fields === void 0 ? void 0 : (_fields$filter = fields.filter) === null || _fields$filter === void 0 ? void 0 : _fields$filter.call(fields, function (field) {
    if (!field.interface) {
      return false;
    }

    var fieldInterface = getInterface(field.interface);

    if (!fieldInterface.filterable) {
      return false;
    }

    return true;
  });
};

exports.useFilterableFields = useFilterableFields;

var FilterActionDesigner = function FilterActionDesigner(props) {
  var _fieldSchema$xCompon, _fieldSchema$xCompon3;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _.useDesignable)(),
      dn = _useDesignable.dn;

  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name;

  var fields = useFilterableFields(name);
  var compile = (0, _hooks.useCompile)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var nonfilterable = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon.nonfilterable) || [];
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, _objectSpread(_objectSpread({}, props), {}, {
    disableInitializer: true
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ItemGroup, {
    title: t('Filterable fields')
  }, fields.map(function (field) {
    var _field$uiSchema;

    var checked = !nonfilterable.includes(field.name);
    return /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SwitchItem, {
      checked: checked,
      title: compile(field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title),
      onChange: function onChange(value) {
        var _fieldSchema$xCompon2, _schema;

        fieldSchema['x-component-props'] = (fieldSchema === null || fieldSchema === void 0 ? void 0 : fieldSchema['x-component-props']) || {};
        var nonfilterable = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon2 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon2 === void 0 ? void 0 : _fieldSchema$xCompon2.nonfilterable) || [];

        if (!value) {
          nonfilterable.push(field.name);
        } else {
          var index = nonfilterable.indexOf(field.name);
          nonfilterable.splice(index, 1);
        }

        fieldSchema['x-component-props'].nonfilterable = nonfilterable;
        dn.emit('patch', {
          schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-component-props', _objectSpread({}, fieldSchema['x-component-props'])), _schema)
        });
        dn.refresh();
      }
    });
  })), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Edit button'),
    schema: {
      type: 'object',
      title: t('Edit button'),
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: t('Button title'),
          default: fieldSchema.title,
          'x-component-props': {}
        },
        icon: {
          'x-decorator': 'FormItem',
          'x-component': 'IconPicker',
          title: t('Button icon'),
          default: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon3 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon3 === void 0 ? void 0 : _fieldSchema$xCompon3.icon,
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title,
          icon = _ref.icon;

      if (title) {
        var _schema2;

        fieldSchema.title = title;
        field.title = title;
        field.componentProps.icon = icon;
        fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
        fieldSchema['x-component-props'].icon = icon;
        dn.emit('patch', {
          schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, "title", title), _defineProperty(_schema2, 'x-component-props', _objectSpread({}, fieldSchema['x-component-props'])), _schema2)
        });
        dn.refresh();
      }
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: function breakRemoveOn(s) {
      return s['x-component'] === 'Space' || s['x-component'] === 'ActionBar';
    }
  }));
};

exports.FilterActionDesigner = FilterActionDesigner;