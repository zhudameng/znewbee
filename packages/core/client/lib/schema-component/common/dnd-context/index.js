"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DndContext = void 0;

var _core = require("@dnd-kit/core");

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../../../");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useDragEnd = function useDragEnd(props) {
  var _useDesignable = (0, _hooks.useDesignable)(),
      refresh = _useDesignable.refresh;

  var api = (0, _.useAPIClient)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return function (event) {
    var _active$data, _active$data$current, _over$data, _over$data$current, _over$data2, _over$data2$current, _over$data3, _over$data3$current, _over$data4, _over$data4$current;

    var active = event.active,
        over = event.over;
    var activeSchema = active === null || active === void 0 ? void 0 : (_active$data = active.data) === null || _active$data === void 0 ? void 0 : (_active$data$current = _active$data.current) === null || _active$data$current === void 0 ? void 0 : _active$data$current.schema;
    var overSchema = over === null || over === void 0 ? void 0 : (_over$data = over.data) === null || _over$data === void 0 ? void 0 : (_over$data$current = _over$data.current) === null || _over$data$current === void 0 ? void 0 : _over$data$current.schema;
    var insertAdjacent = over === null || over === void 0 ? void 0 : (_over$data2 = over.data) === null || _over$data2 === void 0 ? void 0 : (_over$data2$current = _over$data2.current) === null || _over$data2$current === void 0 ? void 0 : _over$data2$current.insertAdjacent;
    var breakRemoveOn = over === null || over === void 0 ? void 0 : (_over$data3 = over.data) === null || _over$data3 === void 0 ? void 0 : (_over$data3$current = _over$data3.current) === null || _over$data3$current === void 0 ? void 0 : _over$data3$current.breakRemoveOn;
    var wrapSchema = over === null || over === void 0 ? void 0 : (_over$data4 = over.data) === null || _over$data4 === void 0 ? void 0 : (_over$data4$current = _over$data4.current) === null || _over$data4$current === void 0 ? void 0 : _over$data4$current.wrapSchema;

    if (!activeSchema || !overSchema) {
      var _props$onDragEnd;

      props === null || props === void 0 ? void 0 : (_props$onDragEnd = props.onDragEnd) === null || _props$onDragEnd === void 0 ? void 0 : _props$onDragEnd.call(props, event);
      return;
    }

    if (activeSchema === overSchema) {
      var _props$onDragEnd2;

      props === null || props === void 0 ? void 0 : (_props$onDragEnd2 = props.onDragEnd) === null || _props$onDragEnd2 === void 0 ? void 0 : _props$onDragEnd2.call(props, event);
      return;
    }

    var dn = (0, _hooks.createDesignable)({
      t: t,
      api: api,
      refresh: refresh,
      current: overSchema
    });
    dn.loadAPIClientEvents();

    if (activeSchema.parent === overSchema.parent) {
      var _props$onDragEnd3;

      dn.insertBeforeBeginOrAfterEnd(activeSchema);
      props === null || props === void 0 ? void 0 : (_props$onDragEnd3 = props.onDragEnd) === null || _props$onDragEnd3 === void 0 ? void 0 : _props$onDragEnd3.call(props, event);
      return;
    }

    if (insertAdjacent) {
      var _props$onDragEnd4;

      dn.insertAdjacent(insertAdjacent, activeSchema, {
        wrap: wrapSchema,
        breakRemoveOn: breakRemoveOn,
        removeParentsIfNoChildren: true
      });
      props === null || props === void 0 ? void 0 : (_props$onDragEnd4 = props.onDragEnd) === null || _props$onDragEnd4 === void 0 ? void 0 : _props$onDragEnd4.call(props, event);
      return;
    }
  };
};

var DndContext = (0, _react.observer)(function (props) {
  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  return /*#__PURE__*/_react2.default.createElement(_core.DndContext, _objectSpread(_objectSpread({
    collisionDetection: _core.rectIntersection
  }, props), {}, {
    onDragEnd: useDragEnd(props)
  }), /*#__PURE__*/_react2.default.createElement(_core.DragOverlay, {
    dropAnimation: {
      duration: 10,
      easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
    }
  }, /*#__PURE__*/_react2.default.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, t('Dragging'))), props.children);
});
exports.DndContext = DndContext;