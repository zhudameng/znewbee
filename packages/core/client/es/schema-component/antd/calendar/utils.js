import { get } from 'lodash';
import { i18n } from '../../../i18n';
export var toEvents = function toEvents(data, fieldNames) {
  return data === null || data === void 0 ? void 0 : data.map(function (item) {
    return {
      id: get(item, fieldNames.id || 'id'),
      title: get(item, fieldNames.title) || i18n.t('Untitle'),
      start: new Date(get(item, fieldNames.start)),
      end: new Date(get(item, fieldNames.end || fieldNames.start))
    };
  });
};