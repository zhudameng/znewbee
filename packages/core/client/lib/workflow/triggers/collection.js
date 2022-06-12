"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _react2 = require("@formily/react");

var _collectionManager = require("../../collection-manager");

var _schemaComponent = require("../../schema-component");

var _WorkflowCanvas = require("../WorkflowCanvas");

var _calculators = require("../calculators");

var _collection = require("../schemas/collection");

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FieldsSelect = (0, _react2.observer)(function (props) {
  var _values$config;

  var compile = (0, _schemaComponent.useCompile)();

  var _useCollectionManager = (0, _collectionManager.useCollectionManager)(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var _useForm = (0, _react2.useForm)(),
      values = _useForm.values;

  var fields = getCollectionFields(values === null || values === void 0 ? void 0 : (_values$config = values.config) === null || _values$config === void 0 ? void 0 : _values$config.collection);
  return /*#__PURE__*/_react.default.createElement(_antd.Select, _objectSpread({}, props), fields.filter(function (field) {
    return !field.hidden && (field.uiSchema ? !field.uiSchema['x-read-pretty'] : true);
  }).map(function (field) {
    var _field$uiSchema;

    return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      value: field.name
    }, compile((_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title));
  }));
});
var _default = {
  title: '{{t("Collection event")}}',
  type: 'collection',
  fieldset: {
    'config.collection': _collection.collection,
    'config.mode': {
      type: 'number',
      title: '{{t("Trigger on")}}',
      name: 'config.mode',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        options: [{
          value: 1,
          label: '{{t("After record added")}}'
        }, {
          value: 2,
          label: '{{t("After record updated")}}'
        }, {
          value: 3,
          label: '{{t("After record added or updated")}}'
        }, {
          value: 4,
          label: '{{t("After record deleted")}}'
        }]
      },
      required: true
    },
    'config.changed': {
      type: 'array',
      name: 'changed',
      title: '{{t("Changed fields")}}',
      description: '{{t("Triggered only if one of the selected fields changes. If unselected, it means that it will be triggered when any field changes. When record is added or deleted, any field is considered to have been changed.")}}',
      'x-decorator': 'FormItem',
      'x-component': 'FieldsSelect',
      'x-component-props': {
        mode: 'multiple'
      }
    },
    'config.condition': _objectSpread(_objectSpread({}, _collection.filter), {}, {
      name: 'config.condition',
      title: '{{t("Only triggers when match conditions")}}'
    })
  },
  scope: {
    useCollectionDataSource: _collectionManager.useCollectionDataSource
  },
  components: {
    FieldsSelect: FieldsSelect
  },
  getter: function getter(_ref) {
    var _collections$find, _options$path;

    var type = _ref.type,
        options = _ref.options,
        _onChange = _ref.onChange;

    var _useTranslation = (0, _reactI18next.useTranslation)(),
        t = _useTranslation.t;

    var compile = (0, _schemaComponent.useCompile)();

    var _useCollectionManager2 = (0, _collectionManager.useCollectionManager)(),
        _useCollectionManager3 = _useCollectionManager2.collections,
        collections = _useCollectionManager3 === void 0 ? [] : _useCollectionManager3;

    var _useFlowContext = (0, _WorkflowCanvas.useFlowContext)(),
        workflow = _useFlowContext.workflow;

    var collection = (_collections$find = collections.find(function (item) {
      return item.name === workflow.config.collection;
    })) !== null && _collections$find !== void 0 ? _collections$find : {
      fields: []
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Select, {
      placeholder: t('Fields'),
      value: options === null || options === void 0 ? void 0 : (_options$path = options.path) === null || _options$path === void 0 ? void 0 : _options$path.replace(/^data\./, ''),
      onChange: function onChange(path) {
        _onChange({
          type: type,
          options: _objectSpread(_objectSpread({}, options), {}, {
            path: "data.".concat(path)
          })
        });
      }
    }, collection.fields.filter(function (field) {
      var _field$uiSchema2;

      return _calculators.BaseTypeSet.has(field === null || field === void 0 ? void 0 : (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.type);
    }).map(function (field) {
      return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
        key: field.name,
        value: field.name
      }, compile(field.uiSchema.title));
    }));
  }
};
exports.default = _default;