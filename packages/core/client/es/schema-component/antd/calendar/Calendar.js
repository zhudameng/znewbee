function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { createForm } from '@formily/core';
import { observer, RecursionField, useFieldSchema } from '@formily/react';
import get from 'lodash/get';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import * as dates from 'react-big-calendar/lib/utils/dates';
import { useTranslation } from 'react-i18next';
import { RecordProvider } from '../../../';
import { i18n } from '../../../i18n';
import { useProps } from '../../hooks/useProps';
import { ActionContext } from '../action';
import { CalendarToolbarContext } from './context';
import './style.less';
var localizer = momentLocalizer(moment);

function Toolbar(props) {
  var fieldSchema = useFieldSchema();
  var toolBarSchema = useMemo(function () {
    return fieldSchema.reduceProperties(function (buf, current) {
      if (current['x-component'].endsWith('.ActionBar')) {
        return current;
      }

      return buf;
    }, null);
  }, []);
  return /*#__PURE__*/React.createElement(CalendarToolbarContext.Provider, {
    value: props
  }, /*#__PURE__*/React.createElement(RecursionField, {
    name: toolBarSchema.name,
    schema: toolBarSchema
  }));
}

var messages = {
  allDay: '',
  previous: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LeftOutlined, null)),
  next: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RightOutlined, null)),
  today: i18n.t('Today'),
  month: i18n.t('Month'),
  week: i18n.t('Week'),
  work_week: i18n.t('Work week'),
  day: i18n.t('Day'),
  agenda: i18n.t('Agenda'),
  date: i18n.t('Date'),
  time: i18n.t('Time'),
  event: i18n.t('Event'),
  noEventsInRange: i18n.t('None'),
  showMore: function showMore(count) {
    return i18n.t('{{count}} more items', {
      count: count
    });
  }
};

var useEvents = function useEvents(dataSource, fieldNames) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return useMemo(function () {
    return Array.isArray(dataSource) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item) {
      return {
        id: get(item, fieldNames.id || 'id'),
        title: get(item, fieldNames.title) || t('Untitle'),
        start: new Date(get(item, fieldNames.start)),
        end: new Date(get(item, fieldNames.end || fieldNames.start))
      };
    }) : [];
  }, [dataSource, fieldNames]);
};

var CalendarRecordViewer = function CalendarRecordViewer(props) {
  var visible = props.visible,
      setVisible = props.setVisible,
      record = props.record;
  var form = useMemo(function () {
    return createForm();
  }, [record]);
  var fieldSchema = useFieldSchema();
  var eventSchema = useMemo(function () {
    return fieldSchema.reduceProperties(function (buf, current) {
      if (current['x-component'].endsWith('.Event')) {
        return current;
      }

      return buf;
    }, null);
  }, []);
  return eventSchema && /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(RecordProvider, {
    record: record
  }, /*#__PURE__*/React.createElement(RecursionField, {
    schema: eventSchema,
    name: eventSchema.name
  })));
};

export var Calendar = observer(function (props) {
  var _useProps = useProps(props),
      dataSource = _useProps.dataSource,
      fieldNames = _useProps.fieldNames;

  var events = useEvents(dataSource, fieldNames);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      record = _useState4[0],
      setRecord = _useState4[1];

  return /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread({}, props), {}, {
    style: {
      height: 700
    }
  }), /*#__PURE__*/React.createElement(CalendarRecordViewer, {
    visible: visible,
    setVisible: setVisible,
    record: record
  }), /*#__PURE__*/React.createElement(BigCalendar, {
    popup: true,
    selectable: true,
    events: events,
    views: ['month', 'week', 'day'],
    step: 60,
    showMultiDayTimes: true,
    messages: messages,
    onSelectSlot: function onSelectSlot(slotInfo) {
      console.log('onSelectSlot', slotInfo);
    },
    onDoubleClickEvent: function onDoubleClickEvent(event) {
      console.log('onDoubleClickEvent');
    },
    onSelectEvent: function onSelectEvent(event) {
      var record = dataSource === null || dataSource === void 0 ? void 0 : dataSource.find(function (item) {
        return item[fieldNames.id] === event.id;
      });

      if (!record) {
        return;
      }

      setRecord(record);
      setVisible(true);
    },
    formats: {
      monthHeaderFormat: 'Y-M',
      agendaDateFormat: 'M-DD',
      dayHeaderFormat: 'Y-M-DD',
      dayRangeHeaderFormat: function dayRangeHeaderFormat(_ref, culture, local) {
        var start = _ref.start,
            end = _ref.end;

        if (dates.eq(start, end, 'month')) {
          return local.format(start, 'Y-M', culture);
        }

        return "".concat(local.format(start, 'Y-M', culture), " - ").concat(local.format(end, 'Y-M', culture));
      }
    },
    defaultDate: new Date(),
    components: {
      toolbar: Toolbar
    },
    localizer: localizer
  }));
});