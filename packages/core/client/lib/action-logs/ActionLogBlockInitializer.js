"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionLogBlockInitializer = void 0;

var _icons = require("@ant-design/icons");

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _schemaInitializer = require("../schema-initializer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionLogBlockInitializer = function ActionLogBlockInitializer(props) {
  var insert = props.insert;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react.default.createElement(_schemaInitializer.SchemaInitializer.Item, _objectSpread(_objectSpread({}, props), {}, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.TableOutlined, null),
    onClick: function onClick(_ref) {
      var item = _ref.item;
      insert({
        type: 'void',
        'x-component': 'ActionLog',
        'x-component-props': {}
      });
    },
    items: [{
      type: 'item',
      name: 'ActionLog',
      title: t('Action Logs')
    }]
  }));
};

exports.ActionLogBlockInitializer = ActionLogBlockInitializer;