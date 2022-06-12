"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _ = require("../..");

var _WorkflowCanvas = require("../WorkflowCanvas");

var _calculators = require("../calculators");

var _collection = require("../schemas/collection");

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  title: '{{t("Query record")}}',
  type: 'query',
  group: 'collection',
  fieldset: {
    'config.collection': _collection.collection,
    'config.multiple': {
      type: 'boolean',
      title: '{{t("Multiple records")}}',
      name: 'config.multiple',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-component-props': {
        disabled: true
      }
    },
    'config.params': {
      type: 'object',
      name: 'config.params',
      title: '',
      'x-decorator': 'FormItem',
      properties: {
        filter: _collection.filter
      }
    }
  },
  view: {},
  scope: {
    useCollectionDataSource: _.useCollectionDataSource
  },
  components: {
    VariableComponent: _calculators.VariableComponent
  },
  getter: function getter(_ref) {
    var _collections$find;

    var type = _ref.type,
        options = _ref.options,
        _onChange = _ref.onChange;

    var _useTranslation = (0, _reactI18next.useTranslation)(),
        t = _useTranslation.t;

    var compile = (0, _.useCompile)();

    var _useCollectionManager = (0, _.useCollectionManager)(),
        _useCollectionManager2 = _useCollectionManager.collections,
        collections = _useCollectionManager2 === void 0 ? [] : _useCollectionManager2;

    var _useFlowContext = (0, _WorkflowCanvas.useFlowContext)(),
        nodes = _useFlowContext.nodes;

    var _nodes$find = nodes.find(function (n) {
      return n.id == options.nodeId;
    }),
        config = _nodes$find.config;

    var collection = (_collections$find = collections.find(function (item) {
      return item.name === config.collection;
    })) !== null && _collections$find !== void 0 ? _collections$find : {
      fields: []
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Select, {
      value: options.path,
      placeholder: t('Fields'),
      onChange: function onChange(path) {
        _onChange({
          type: type,
          options: _objectSpread(_objectSpread({}, options), {}, {
            path: path
          })
        });
      }
    }, collection.fields.filter(function (field) {
      var _field$uiSchema;

      return _calculators.BaseTypeSet.has((_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.type);
    }).map(function (field) {
      return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
        key: field.name,
        value: field.name
      }, compile(field.uiSchema.title));
    }));
  }
};
exports.default = _default;