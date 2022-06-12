"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KanbanDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _blockProvider = require("../../../block-provider");

var _collectionManager = require("../../../collection-manager");

var _actionHooks = require("../../../collection-manager/action-hooks");

var _schemaSettings = require("../../../schema-settings");

var _schemaTemplates = require("../../../schema-templates");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KanbanDesigner = function KanbanDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$;

  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      title = _useCollection.title;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var dataSource = (0, _actionHooks.useCollectionFilterOptions)(name);

  var _useKanbanBlockContex = (0, _blockProvider.useKanbanBlockContext)(),
      service = _useKanbanBlockContex.service;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useDesignable = (0, _hooks.useDesignable)(),
      dn = _useDesignable.dn;

  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.params) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : _fieldSchema$xDecora$.filter) || {};
  var template = (0, _schemaTemplates.useSchemaTemplate)();
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
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
    onSubmit: function onSubmit(_ref) {
      var _service$params, _schema;

      var filter = _ref.filter;
      var params = field.decoratorProps.params || {};
      params.filter = filter;
      field.decoratorProps.params = params;
      fieldSchema['x-decorator-props']['params'] = params;
      service.run(_objectSpread(_objectSpread({}, (_service$params = service.params) === null || _service$params === void 0 ? void 0 : _service$params[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Template, {
    componentName: 'Kanban',
    collectionName: name
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.KanbanDesigner = KanbanDesigner;