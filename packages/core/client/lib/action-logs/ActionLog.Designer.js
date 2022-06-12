"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionLogDesigner = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _collectionManager = require("../collection-manager");

var _actionHooks = require("../collection-manager/action-hooks");

var _hooks = require("../schema-component/hooks");

var _schemaSettings = require("../schema-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionLogDesigner = function ActionLogDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora$2, _field$decoratorProps;

  var _useCollection = (0, _collectionManager.useCollection)(),
      name = _useCollection.name,
      title = _useCollection.title;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var dataSource = (0, _actionHooks.useCollectionFilterOptions)(name);
  var ctx = (0, _collectionManager.useResourceActionContext)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useDesignable = (0, _hooks.useDesignable)(),
      dn = _useDesignable.dn;

  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.request) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : (_fieldSchema$xDecora$2 = _fieldSchema$xDecora$.params) === null || _fieldSchema$xDecora$2 === void 0 ? void 0 : _fieldSchema$xDecora$2.filter) || {};
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, {
    title: title || name
  }, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: '设置数据范围',
    schema: {
      type: 'object',
      title: '设置数据范围',
      properties: {
        filter: {
          default: defaultFilter,
          title: '数据范围',
          enum: dataSource,
          'x-component': 'Filter',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var _ctx$params, _schema;

      var filter = _ref.filter;
      var params = field.decoratorProps.request.params || {};
      params.filter = filter;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params = ctx.params) === null || _ctx$params === void 0 ? void 0 : _ctx$params[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: '每页显示',
    value: ((_field$decoratorProps = field.decoratorProps.request.params) === null || _field$decoratorProps === void 0 ? void 0 : _field$decoratorProps.pageSize) || 20,
    options: [{
      label: '10',
      value: 10
    }, {
      label: '20',
      value: 20
    }, {
      label: '50',
      value: 50
    }, {
      label: '100',
      value: 100
    }, {
      label: '200',
      value: 200
    }],
    onChange: function onChange(pageSize) {
      var _ctx$params2, _schema2;

      var params = field.decoratorProps.request.params || {};
      params.pageSize = pageSize;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params2 = ctx.params) === null || _ctx$params2 === void 0 ? void 0 : _ctx$params2[0]), {}, {
        pageSize: pageSize
      }));
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema2)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};

exports.ActionLogDesigner = ActionLogDesigner;