"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AntdConfigProvider = AntdConfigProvider;

var _antd = require("antd");

var _en_US = _interopRequireDefault(require("antd/lib/locale/en_US"));

var _zh_CN = _interopRequireDefault(require("antd/lib/locale/zh_CN"));

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _apiClient = require("../api-client");

var _excluded = ["remoteLocale"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AntdConfigProvider(props) {
  var remoteLocale = props.remoteLocale,
      others = _objectWithoutProperties(props, _excluded);

  var api = (0, _apiClient.useAPIClient)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      i18n = _useTranslation.i18n;

  var _useRequest = (0, _apiClient.useRequest)({
    url: 'app:getLang'
  }, {
    onSuccess: function onSuccess(data) {
      var _data$data;

      var locale = api.auth.locale;

      if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.lang) && !locale) {
        var _data$data2, _data$data3;

        api.auth.setLocale(data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.lang);
        i18n.changeLanguage(data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.lang);
      }
    },
    manual: !remoteLocale
  }),
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement(_antd.ConfigProvider, _objectSpread(_objectSpread({}, others), {}, {
    locale: i18n.language === 'zh-CN' ? _zh_CN.default : _en_US.default
  }), props.children);
}