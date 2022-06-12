"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _icons = require("@ant-design/icons");

var _core = require("@formily/core");

var _react = require("@formily/react");

var _get = _interopRequireDefault(require("lodash/get"));

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _reactBigCalendar = require("react-big-calendar");

var dates = _interopRequireWildcard(require("react-big-calendar/lib/utils/dates"));

var _reactI18next = require("react-i18next");

var _ = require("../../../");

var _i18n = require("../../../i18n");

var _useProps2 = require("../../hooks/useProps");

var _action = require("../action");

var _context = require("./context");

require("./style.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var localizer = (0, _reactBigCalendar.momentLocalizer)(_moment.default);

function Toolbar(props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  var toolBarSchema = (0, _react2.useMemo)(function () {
    return fieldSchema.reduceProperties(function (buf, current) {
      if (current['x-component'].endsWith('.ActionBar')) {
        return current;
      }

      return buf;
    }, null);
  }, []);
  return /*#__PURE__*/_react2.default.createElement(_context.CalendarToolbarContext.Provider, {
    value: props
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    name: toolBarSchema.name,
    schema: toolBarSchema
  }));
}

var messages = {
  allDay: '',
  previous: /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_icons.LeftOutlined, null)),
  next: /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_icons.RightOutlined, null)),
  today: _i18n.i18n.t('Today'),
  month: _i18n.i18n.t('Month'),
  week: _i18n.i18n.t('Week'),
  work_week: _i18n.i18n.t('Work week'),
  day: _i18n.i18n.t('Day'),
  agenda: _i18n.i18n.t('Agenda'),
  date: _i18n.i18n.t('Date'),
  time: _i18n.i18n.t('Time'),
  event: _i18n.i18n.t('Event'),
  noEventsInRange: _i18n.i18n.t('None'),
  showMore: function showMore(count) {
    return _i18n.i18n.t('{{count}} more items', {
      count: count
    });
  }
};

var useEvents = function useEvents(dataSource, fieldNames) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return (0, _react2.useMemo)(function () {
    return Array.isArray(dataSource) ? dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item) {
      return {
        id: (0, _get.default)(item, fieldNames.id || 'id'),
        title: (0, _get.default)(item, fieldNames.title) || t('Untitle'),
        start: new Date((0, _get.default)(item, fieldNames.start)),
        end: new Date((0, _get.default)(item, fieldNames.end || fieldNames.start))
      };
    }) : [];
  }, [dataSource, fieldNames]);
};

var CalendarRecordViewer = function CalendarRecordViewer(props) {
  var visible = props.visible,
      setVisible = props.setVisible,
      record = props.record;
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)();
  }, [record]);
  var fieldSchema = (0, _react.useFieldSchema)();
  var eventSchema = (0, _react2.useMemo)(function () {
    return fieldSchema.reduceProperties(function (buf, current) {
      if (current['x-component'].endsWith('.Event')) {
        return current;
      }

      return buf;
    }, null);
  }, []);
  return eventSchema && /*#__PURE__*/_react2.default.createElement(_action.ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react2.default.createElement(_.RecordProvider, {
    record: record
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    schema: eventSchema,
    name: eventSchema.name
  })));
};

var Calendar = (0, _react.observer)(function (props) {
  var _useProps = (0, _useProps2.useProps)(props),
      dataSource = _useProps.dataSource,
      fieldNames = _useProps.fieldNames;

  var events = useEvents(dataSource, fieldNames);

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react2.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      record = _useState4[0],
      setRecord = _useState4[1];

  return /*#__PURE__*/_react2.default.createElement("div", _objectSpread(_objectSpread({}, props), {}, {
    style: {
      height: 700
    }
  }), /*#__PURE__*/_react2.default.createElement(CalendarRecordViewer, {
    visible: visible,
    setVisible: setVisible,
    record: record
  }), /*#__PURE__*/_react2.default.createElement(_reactBigCalendar.Calendar, {
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
exports.Calendar = Calendar;