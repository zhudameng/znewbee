"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKanbanBlockProps = exports.useKanbanBlockContext = exports.KanbanBlockProvider = exports.KanbanBlockContext = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _acl = require("../acl");

var _collectionManager = require("../collection-manager");

var _Kanban = require("../schema-component/antd/kanban/Kanban");

var _BlockProvider = require("./BlockProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KanbanBlockContext = /*#__PURE__*/(0, _react2.createContext)({});
exports.KanbanBlockContext = KanbanBlockContext;

var useGroupField = function useGroupField(props) {
  var _useCollection = (0, _collectionManager.useCollection)(),
      getField = _useCollection.getField;

  var groupField = props.groupField;

  if (typeof groupField === 'string') {
    return getField(groupField);
  }

  if (groupField === null || groupField === void 0 ? void 0 : groupField.name) {
    return getField(groupField === null || groupField === void 0 ? void 0 : groupField.name);
  }
};

var InternalKanbanBlockProvider = function InternalKanbanBlockProvider(props) {
  var field = (0, _react.useField)();

  var _useBlockRequestConte = (0, _BlockProvider.useBlockRequestContext)(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service;

  var groupField = useGroupField(props);

  if (!groupField) {
    return null;
  }

  if (service.loading && !field.loaded) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Spin, null);
  }

  field.loaded = true;
  return /*#__PURE__*/_react2.default.createElement(KanbanBlockContext.Provider, {
    value: {
      props: {
        resource: props.resource
      },
      field: field,
      service: service,
      resource: resource,
      groupField: groupField
    }
  }, props.children);
};

var KanbanBlockProvider = function KanbanBlockProvider(props) {
  return /*#__PURE__*/_react2.default.createElement(_BlockProvider.BlockProvider, _objectSpread({}, props), /*#__PURE__*/_react2.default.createElement(InternalKanbanBlockProvider, _objectSpread({}, props)));
};

exports.KanbanBlockProvider = KanbanBlockProvider;

var useKanbanBlockContext = function useKanbanBlockContext() {
  return (0, _react2.useContext)(KanbanBlockContext);
};

exports.useKanbanBlockContext = useKanbanBlockContext;

var useDisableCardDrag = function useDisableCardDrag() {
  var _ctx$props;

  var ctx = useKanbanBlockContext();

  var _useACLRoleContext = (0, _acl.useACLRoleContext)(),
      allowAll = _useACLRoleContext.allowAll,
      allowConfigure = _useACLRoleContext.allowConfigure,
      getActionParams = _useACLRoleContext.getActionParams;

  if (allowAll || allowConfigure) {
    return false;
  }

  var result = getActionParams("".concat(ctx === null || ctx === void 0 ? void 0 : (_ctx$props = ctx.props) === null || _ctx$props === void 0 ? void 0 : _ctx$props.resource, ":update"), {
    skipOwnCheck: true
  });
  return !result;
};

var useKanbanBlockProps = function useKanbanBlockProps() {
  var _ctx$service3;

  var field = (0, _react.useField)();
  var ctx = useKanbanBlockContext();
  (0, _react2.useEffect)(function () {
    var _ctx$service;

    if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : _ctx$service.loading)) {
      var _ctx$service2, _ctx$service2$data;

      field.value = (0, _Kanban.toColumns)(ctx.groupField, ctx === null || ctx === void 0 ? void 0 : (_ctx$service2 = ctx.service) === null || _ctx$service2 === void 0 ? void 0 : (_ctx$service2$data = _ctx$service2.data) === null || _ctx$service2$data === void 0 ? void 0 : _ctx$service2$data.data);
    } // field.loading = ctx?.service?.loading;

  }, [ctx === null || ctx === void 0 ? void 0 : (_ctx$service3 = ctx.service) === null || _ctx$service3 === void 0 ? void 0 : _ctx$service3.loading]);
  return {
    groupField: ctx.groupField,
    disableCardDrag: useDisableCardDrag(),
    onCardDragEnd: function onCardDragEnd(_ref, _ref2, _ref3) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _sourceColumn$cards, _destinationColumn$ca;

        var columns, groupField, fromColumnId, fromPosition, toColumnId, toPosition, sourceColumn, destinationColumn, sourceCard, targetCard, values;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                columns = _ref.columns, groupField = _ref.groupField;
                fromColumnId = _ref2.fromColumnId, fromPosition = _ref2.fromPosition;
                toColumnId = _ref3.toColumnId, toPosition = _ref3.toPosition;
                sourceColumn = columns.find(function (column) {
                  return column.id === fromColumnId;
                });
                destinationColumn = columns.find(function (column) {
                  return column.id === toColumnId;
                });
                sourceCard = sourceColumn === null || sourceColumn === void 0 ? void 0 : (_sourceColumn$cards = sourceColumn.cards) === null || _sourceColumn$cards === void 0 ? void 0 : _sourceColumn$cards[fromPosition];
                targetCard = destinationColumn === null || destinationColumn === void 0 ? void 0 : (_destinationColumn$ca = destinationColumn.cards) === null || _destinationColumn$ca === void 0 ? void 0 : _destinationColumn$ca[toPosition];
                values = {
                  sourceId: sourceCard.id,
                  sortField: "".concat(groupField.name, "_sort")
                };

                if (targetCard) {
                  values['targetId'] = targetCard.id;
                } else {
                  values['targetScope'] = _defineProperty({}, groupField.name, toColumnId);
                }

                _context.next = 11;
                return ctx.resource.move(values);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

exports.useKanbanBlockProps = useKanbanBlockProps;