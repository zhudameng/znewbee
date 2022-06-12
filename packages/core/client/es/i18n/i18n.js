import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { resources } from '../locale';

var log = require('debug')('i18next');

export var i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  lng: localStorage.getItem('ZNEWNEE_LOCALE') || 'en-US',
  // debug: true,
  defaultNS: 'client',
  // parseMissingKeyHandler: (key) => {
  //   console.log('parseMissingKeyHandler', `'${key}': '${key}',`);
  //   return key;
  // },
  // ns: ['client'],
  resources: resources
});
var momentLngs = {
  'en-US': 'en',
  'zh-CN': 'zh-cn'
};

function setMomentLng(language) {
  var lng = momentLngs[language || 'en-US'] || 'en';
  log(lng);
  moment.locale(lng);
}

setMomentLng(localStorage.getItem('ZNEWNEE_LOCALE'));
i18n.on('languageChanged', function (lng) {
  localStorage.setItem('ZNEWNEE_LOCALE', lng);
  setMomentLng(lng);
});
