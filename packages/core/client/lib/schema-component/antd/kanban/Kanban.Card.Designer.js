"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KanbanCardDesigner = void 0;

var _icons = require("@ant-design/icons");

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _apiClient = require("../../../api-client");

var _schemaComponent = require("../../../schema-component");

var _schemaInitializer = require("../../../schema-initializer");

var _utils = require("../../../schema-initializer/utils");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var titleCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  pointer-events: none;\n  position: absolute;\n  font-size: 12px;\n  background: #f18b62;\n  color: #fff;\n  padding: 0 5px;\n  line-height: 16px;\n  height: 16px;\n  border-bottom-right-radius: 2px;\n  border-radius: 2px;\n  top: 2px;\n  left: 2px;\n"])));

var gridRowColWrap = function gridRowColWrap(schema) {
  schema['x-read-pretty'] = true;
  return {
    type: 'void',
    'x-component': 'Grid.Row',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'Grid.Col',
      properties: _defineProperty({}, schema.name || (0, _shared.uid)(), schema)
    })
  };
}; // export const removeGridFormItem = (schema, cb) => {
//   cb(schema, {
//     removeParentsIfNoChildren: true,
//     breakRemoveOn: {
//       'x-component': 'Kanban.Card',
//     },
//   });
// };


var KanbanCardDesigner = function KanbanCardDesigner(props) {
  var _useDesignable = (0, _schemaComponent.useDesignable)(),
      dn = _useDesignable.dn,
      designable = _useDesignable.designable;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var api = (0, _apiClient.useAPIClient)();

  var _useDesignable2 = (0, _schemaComponent.useDesignable)(),
      refresh = _useDesignable2.refresh;

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var fields = (0, _utils.useFormItemInitializerFields)({
    readPretty: true,
    block: 'KanbanV2'
  });

  if (!designable) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer'
  }, /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 2,
    align: 'center'
  }, /*#__PURE__*/_react2.default.createElement(_schemaInitializer.SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    insert: function insert(schema) {
      var gridSchema = fieldSchema.reduceProperties(function (buf, schema) {
        if (schema['x-component'] === 'Grid') {
          return schema;
        }

        return buf;
      }, null);

      if (!gridSchema) {
        return;
      }

      var dn = (0, _schemaComponent.createDesignable)({
        t: t,
        api: api,
        refresh: refresh,
        current: gridSchema
      });
      dn.loadAPIClientEvents();
      dn.insertBeforeEnd(schema);
    },
    items: [{
      type: 'itemGroup',
      title: t('Display fields'),
      children: fields
    }],
    component: /*#__PURE__*/_react2.default.createElement(_icons.MenuOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 12
      }
    })
  }))));
};

exports.KanbanCardDesigner = KanbanCardDesigner;