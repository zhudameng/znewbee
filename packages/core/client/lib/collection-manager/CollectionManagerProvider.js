"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteCollectionManagerProvider = exports.CollectionManagerProvider = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _apiClient = require("../api-client");

var _CollectionManagerSchemaComponentProvider = require("./CollectionManagerSchemaComponentProvider");

var _context3 = require("./context");

var defaultInterfaces = _interopRequireWildcard(require("./interfaces"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollectionManagerProvider = function CollectionManagerProvider(props) {
  var service = props.service,
      interfaces = props.interfaces,
      _props$collections = props.collections,
      collections = _props$collections === void 0 ? [] : _props$collections,
      _refreshCM = props.refreshCM;
  return /*#__PURE__*/_react.default.createElement(_context3.CollectionManagerContext.Provider, {
    value: {
      service: service,
      interfaces: _objectSpread(_objectSpread({}, defaultInterfaces), interfaces),
      collections: collections,
      refreshCM: function () {
        var _refreshCM2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_refreshCM) {
                    _context.next = 3;
                    break;
                  }

                  _context.next = 3;
                  return _refreshCM();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function refreshCM() {
          return _refreshCM2.apply(this, arguments);
        }

        return refreshCM;
      }()
    }
  }, /*#__PURE__*/_react.default.createElement(_CollectionManagerSchemaComponentProvider.CollectionManagerSchemaComponentProvider, null, props.children));
};

exports.CollectionManagerProvider = CollectionManagerProvider;

var RemoteCollectionManagerProvider = function RemoteCollectionManagerProvider(props) {
  var _service$data;

  var api = (0, _apiClient.useAPIClient)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      contentLoading = _useState2[0],
      setContentLoading = _useState2[1];

  var options = {
    resource: 'collections',
    action: 'list',
    params: {
      paginate: false,
      appends: ['fields', 'fields.uiSchema'],
      filter: {// inherit: false,
      },
      sort: ['sort']
    }
  };
  var service = (0, _apiClient.useRequest)(options);

  if (service.loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement(CollectionManagerProvider, _objectSpread({
    service: _objectSpread(_objectSpread({}, service), {}, {
      contentLoading: contentLoading,
      setContentLoading: setContentLoading
    }),
    collections: service === null || service === void 0 ? void 0 : (_service$data = service.data) === null || _service$data === void 0 ? void 0 : _service$data.data,
    refreshCM: function () {
      var _refreshCM3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$api$request, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setContentLoading(true);
                _context2.next = 3;
                return api.request(options);

              case 3:
                _yield$api$request = _context2.sent;
                data = _yield$api$request.data;
                service.mutate(data);
                setContentLoading(false);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function refreshCM() {
        return _refreshCM3.apply(this, arguments);
      }

      return refreshCM;
    }()
  }, props));
};

exports.RemoteCollectionManagerProvider = RemoteCollectionManagerProvider;