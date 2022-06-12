"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableColumnInitializers = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _SchemaInitializer = require("../SchemaInitializer");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 表格列配置
var TableColumnInitializers = function TableColumnInitializers(props) {
  var _props$items = props.items,
      items = _props$items === void 0 ? [] : _props$items;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react.default.createElement(_SchemaInitializer.SchemaInitializer.Button, {
    insertPosition: 'beforeEnd',
    icon: 'SettingOutlined',
    wrap: function wrap(s) {
      if (s['x-action-column']) {
        return s;
      }

      return {
        type: 'void',
        'x-decorator': 'TableV2.Column.Decorator',
        'x-designer': 'TableV2.Column.Designer',
        'x-component': 'TableV2.Column',
        properties: _defineProperty({}, s.name, _objectSpread({}, s))
      };
    },
    items: (0, _utils.itemsMerge)([{
      type: 'itemGroup',
      title: t('Display fields'),
      children: (0, _utils.useTableColumnInitializerFields)()
    }, {
      type: 'divider'
    }, {
      type: 'item',
      title: t('Action column'),
      component: 'TableActionColumnInitializer'
    }], items)
  }, t('Configure columns'));
};

exports.TableColumnInitializers = TableColumnInitializers;