"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChinaRegionProvider = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("..");

var _apiClient = require("../api-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useChinaRegionDataSource = function useChinaRegionDataSource(options) {
  var field = (0, _react.useField)();
  var maxLevel = field.componentProps.maxLevel;
  return (0, _apiClient.useRequest)({
    resource: 'chinaRegions',
    action: 'list',
    params: {
      sort: 'code',
      paginate: false,
      filter: {
        level: 1
      }
    }
  }, _objectSpread(_objectSpread({}, options), {}, {
    onSuccess: function onSuccess(data) {
      var _data$data;

      options === null || options === void 0 ? void 0 : options.onSuccess({
        data: (data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.map(function (item) {
          if (maxLevel !== 1) {
            item.isLeaf = false;
          }

          return item;
        })) || []
      });
    }
  }));
};

var useChinaRegionLoadData = function useChinaRegionLoadData() {
  var api = (0, _apiClient.useAPIClient)();
  var field = (0, _react.useField)();
  var maxLevel = field.componentProps.maxLevel;
  return function (selectedOptions) {
    var _targetOption$childre;

    var targetOption = selectedOptions[selectedOptions.length - 1];

    if ((targetOption === null || targetOption === void 0 ? void 0 : (_targetOption$childre = targetOption.children) === null || _targetOption$childre === void 0 ? void 0 : _targetOption$childre.length) > 0) {
      return;
    }

    targetOption.loading = true;
    api.resource('chinaRegions').list({
      sort: 'code',
      paginate: false,
      filter: {
        parentCode: targetOption.code
      }
    }).then(function (_ref) {
      var _data$data2;

      var data = _ref.data;
      targetOption.loading = false;
      targetOption.children = (data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.map(function (item) {
        if (maxLevel > item.level) {
          item.isLeaf = false;
        }

        return item;
      })) || [];
      field.dataSource = _toConsumableArray(field.dataSource);
    });
  };
};

var ChinaRegionProvider = function ChinaRegionProvider(props) {
  return /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
    scope: {
      useChinaRegionDataSource: useChinaRegionDataSource,
      useChinaRegionLoadData: useChinaRegionLoadData
    }
  }, props.children);
};

exports.ChinaRegionProvider = ChinaRegionProvider;