"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toEvents = void 0;

var _lodash = require("lodash");

var _i18n = require("../../../i18n");

var toEvents = function toEvents(data, fieldNames) {
  return data === null || data === void 0 ? void 0 : data.map(function (item) {
    return {
      id: (0, _lodash.get)(item, fieldNames.id || 'id'),
      title: (0, _lodash.get)(item, fieldNames.title) || _i18n.i18n.t('Untitle'),
      start: new Date((0, _lodash.get)(item, fieldNames.start)),
      end: new Date((0, _lodash.get)(item, fieldNames.end || fieldNames.start))
    };
  });
};

exports.toEvents = toEvents;