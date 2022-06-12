"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableVoid = void 0;

var _core = require("@formily/core");

var _react = require("@formily/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _ = require("../../../");

var _hooks = require("../../hooks");

var _Table = require("./Table.Array");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usePaginationProps = function usePaginationProps(props, service) {
  var _props$request, _props$request$params;

  if (props.pagination === false) {
    return false;
  }

  var pagination = props.pagination || {};

  if (props === null || props === void 0 ? void 0 : (_props$request = props.request) === null || _props$request === void 0 ? void 0 : (_props$request$params = _props$request.params) === null || _props$request$params === void 0 ? void 0 : _props$request$params.pageSize) {
    var _props$request2, _props$request2$param;

    pagination.defaultPageSize = props === null || props === void 0 ? void 0 : (_props$request2 = props.request) === null || _props$request2 === void 0 ? void 0 : (_props$request2$param = _props$request2.params) === null || _props$request2$param === void 0 ? void 0 : _props$request2$param.pageSize;
  }

  return _objectSpread(_objectSpread({
    showSizeChanger: true
  }, pagination), {}, {
    onChange: function onChange(page, pageSize) {
      var _service$params;

      service === null || service === void 0 ? void 0 : service.run(_objectSpread(_objectSpread({}, service === null || service === void 0 ? void 0 : (_service$params = service.params) === null || _service$params === void 0 ? void 0 : _service$params[0]), {}, {
        page: page,
        pageSize: pageSize
      }));
    }
  });
};

var useRequestProps = function useRequestProps(props) {
  var request = props.request,
      pagination = props.pagination,
      dataSource = props.dataSource;

  if (request) {
    if (pagination === false) {
      return request;
    }

    var params = (0, _lodash.cloneDeep)(request.params || {});

    if (!params.page) {
      params.page = (pagination === null || pagination === void 0 ? void 0 : pagination.current) || (pagination === null || pagination === void 0 ? void 0 : pagination.defaultCurrent) || 1;
    }

    if (!params.pageSize) {
      params.pageSize = (pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) || (pagination === null || pagination === void 0 ? void 0 : pagination.defaultPageSize) || 10;
    }

    request.params = params;
    return request;
  }

  return function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$page = params.page,
        page = _params$page === void 0 ? 1 : _params$page,
        _params$pageSize = params.pageSize,
        pageSize = _params$pageSize === void 0 ? 10 : _params$pageSize;
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize - 1;
    return Promise.resolve({
      data: pagination === false ? dataSource : dataSource === null || dataSource === void 0 ? void 0 : dataSource.slice(startIndex, endIndex + 1),
      meta: {
        page: page,
        pageSize: pageSize,
        count: (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) || 0
      }
    });
  };
};

var useDef = function useDef(options, props) {
  return (0, _.useRequest)(useRequestProps(props), options);
};

var useDefSelectedRowKeys = function useDefSelectedRowKeys() {
  var _result$state;

  var result = (0, _.useAsyncData)();
  return [result === null || result === void 0 ? void 0 : (_result$state = result.state) === null || _result$state === void 0 ? void 0 : _result$state.selectedRowKeys, function (selectedRowKeys) {
    var _result$setState;

    return result === null || result === void 0 ? void 0 : (_result$setState = result.setState) === null || _result$setState === void 0 ? void 0 : _result$setState.call(result, {
      selectedRowKeys: selectedRowKeys
    });
  }];
};

var TableVoid = (0, _react.observer)(function (props) {
  var _props$rowKey = props.rowKey,
      rowKey = _props$rowKey === void 0 ? 'id' : _props$rowKey,
      _props$useDataSource = props.useDataSource,
      useDataSource = _props$useDataSource === void 0 ? useDef : _props$useDataSource,
      _props$useSelectedRow = props.useSelectedRowKeys,
      useSelectedRowKeys = _props$useSelectedRow === void 0 ? useDefSelectedRowKeys : _props$useSelectedRow;
  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)();
  }, []);
  var f = (0, _hooks.useAttach)(form.createArrayField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  var result = useDataSource({
    uid: fieldSchema['x-uid'],
    onSuccess: function onSuccess(data) {
      var _field$componentProps, _data$meta, _data$meta3, _data$meta4;

      form.setValues(_defineProperty({}, fieldSchema.name, data === null || data === void 0 ? void 0 : data.data));

      if ((field === null || field === void 0 ? void 0 : (_field$componentProps = field.componentProps) === null || _field$componentProps === void 0 ? void 0 : _field$componentProps.pagination) === false) {
        return;
      }

      field.componentProps.pagination = field.componentProps.pagination || {};

      if (data === null || data === void 0 ? void 0 : (_data$meta = data.meta) === null || _data$meta === void 0 ? void 0 : _data$meta.count) {
        var _data$meta2;

        field.componentProps.pagination.total = data === null || data === void 0 ? void 0 : (_data$meta2 = data.meta) === null || _data$meta2 === void 0 ? void 0 : _data$meta2.count;
      }

      field.componentProps.pagination.current = (data === null || data === void 0 ? void 0 : (_data$meta3 = data.meta) === null || _data$meta3 === void 0 ? void 0 : _data$meta3.page) || 1;
      field.componentProps.pagination.pageSize = (data === null || data === void 0 ? void 0 : (_data$meta4 = data.meta) === null || _data$meta4 === void 0 ? void 0 : _data$meta4.pageSize) || 10;
    }
  }, props);
  return /*#__PURE__*/_react2.default.createElement(_.AsyncDataProvider, {
    value: result
  }, /*#__PURE__*/_react2.default.createElement(_react.FormContext.Provider, {
    value: form
  }, /*#__PURE__*/_react2.default.createElement(_react.FieldContext.Provider, {
    value: f
  }, /*#__PURE__*/_react2.default.createElement(_Table.TableArray, _objectSpread(_objectSpread({}, props), {}, {
    rowKey: rowKey,
    useSelectedRowKeys: useSelectedRowKeys,
    loading: result === null || result === void 0 ? void 0 : result.loading,
    pagination: usePaginationProps(props, result)
  })))));
});
exports.TableVoid = TableVoid;