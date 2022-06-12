"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _moment = _interopRequireDefault(require("moment"));

var _reactI18next = require("react-i18next");

var _locale = require("../locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('debug')('i18next');

var i18n = _i18next.default.createInstance();

exports.i18n = i18n;
i18n.use(_reactI18next.initReactI18next).init({
  lng: localStorage.getItem('ZNEWNEE_LOCALE') || 'en-US',
  // debug: true,
  defaultNS: 'client',
  // parseMissingKeyHandler: (key) => {
  //   console.log('parseMissingKeyHandler', `'${key}': '${key}',`);
  //   return key;
  // },
  // ns: ['client'],
  resources: _locale.resources
});
var momentLngs = {
  'en-US': 'en',
  'zh-CN': 'zh-cn'
};

function setMomentLng(language) {
  var lng = momentLngs[language || 'en-US'] || 'en';
  log(lng);

  _moment.default.locale(lng);
}

setMomentLng(localStorage.getItem('ZNEWNEE_LOCALE'));
i18n.on('languageChanged', function (lng) {
  localStorage.setItem('ZNEWNEE_LOCALE', lng);
  setMomentLng(lng);
});
