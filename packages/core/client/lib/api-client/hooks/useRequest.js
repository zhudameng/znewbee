"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = useRequest;

var _shared = require("@formily/shared");

var _ahooks = require("ahooks");

var _useRequest = _interopRequireDefault(require("ahooks/lib/useRequest"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _react = require("react");

var _context2 = require("../context");

var _assign = require("./assign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useRequest(service) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // 缓存用途
  var _useSetState = (0, _ahooks.useSetState)({}),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      state = _useSetState2[0],
      setState = _useSetState2[1];

  var api = (0, _react.useContext)(_context2.APIClientContext);

  if (typeof service === 'function') {
    var _result = (0, _useRequest.default)(service, _objectSpread(_objectSpread({}, options), {}, {
      onSuccess: function onSuccess() {
        var _options$onSuccess;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_options$onSuccess = options.onSuccess) === null || _options$onSuccess === void 0 ? void 0 : _options$onSuccess.call.apply(_options$onSuccess, [options].concat(args));

        if (options.uid) {
          api.services[options.uid] = _result;
        }
      }
    }));

    return _objectSpread(_objectSpread({}, _result), {}, {
      state: state,
      setState: setState
    });
  }

  var result = (0, _useRequest.default)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var params,
        resource,
        args,
        response,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            resource = service.resource;
            args = (0, _cloneDeep.default)(service);

            if (resource) {
              args.params = args.params || {};
              (0, _assign.assign)(args.params, params);
            } else {
              args = (0, _shared.merge)(args, params);
            }

            _context.next = 6;
            return api.request(args);

          case 6:
            response = _context.sent;
            return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), _objectSpread(_objectSpread({}, options), {}, {
    onSuccess: function onSuccess() {
      var _options$onSuccess2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_options$onSuccess2 = options.onSuccess) === null || _options$onSuccess2 === void 0 ? void 0 : _options$onSuccess2.call.apply(_options$onSuccess2, [options].concat(args));

      if (options.uid) {
        api.services[options.uid] = result;
      }
    }
  }));
  return _objectSpread(_objectSpread({}, result), {}, {
    state: state,
    setState: setState
  });
}