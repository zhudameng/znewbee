"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ds = exports.SubFieldDataSourceProvider = exports.DataSourceProvider = exports.DataSourceContext = void 0;

var _react = require("@formily/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _2 = require("../");

var _apiClient = require("../api-client");

var _interfaces = require("./Configuration/interfaces");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var collection = {
  name: 'fields',
  targetKey: 'name',
  fields: [{
    type: 'string',
    name: 'type',
    interface: 'input',
    uiSchema: {
      title: '{{ t("Storage type") }}',
      type: 'string',
      'x-component': 'Select',
      enum: [{
        label: 'String',
        value: 'string'
      }],
      required: true
    }
  }, {
    type: 'string',
    name: 'interface',
    interface: 'input',
    uiSchema: {
      title: '{{ t("Field interface") }}',
      type: 'string',
      'x-component': 'Select',
      enum: _interfaces.options
    }
  }, {
    type: 'string',
    name: 'title',
    interface: 'input',
    uiSchema: {
      title: '{{ t("Field display name") }}',
      type: 'string',
      'x-component': 'Input',
      required: true
    }
  }, {
    type: 'string',
    name: 'name',
    interface: 'input',
    uiSchema: {
      title: '{{ t("Field name") }}',
      type: 'string',
      'x-component': 'Input'
    }
  }]
};
var DataSourceContext = /*#__PURE__*/(0, _react2.createContext)(null);
exports.DataSourceContext = DataSourceContext;

var useSelectedRowKeys = function useSelectedRowKeys() {
  var ctx = (0, _react2.useContext)(DataSourceContext);
  return [ctx.selectedRowKeys, ctx.setSelectedRowKeys];
};

var useDataSource = function useDataSource(options) {
  var ctx = (0, _react2.useContext)(DataSourceContext);
  return (0, _2.useRequest)(function () {
    return Promise.resolve({
      data: ctx.dataSource
    });
  }, _objectSpread(_objectSpread({}, options), {}, {
    refreshDeps: [JSON.stringify(ctx.dataSource)]
  }));
};

var useCreateAction = function useCreateAction() {
  var ctx = (0, _react2.useContext)(DataSourceContext);
  var form = (0, _react.useForm)();

  var _useActionContext = (0, _2.useActionContext)(),
      setVisible = _useActionContext.setVisible;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var dataSource;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('form.values', form.values);
                dataSource = ctx.dataSource || [];
                dataSource.push((0, _lodash.cloneDeep)(form.values));
                ctx.setDataSource(_toConsumableArray(dataSource));
                setVisible(false);
                _context.next = 7;
                return form.reset();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var useBulkDestroyAction = function useBulkDestroyAction() {
  var ctx = (0, _react2.useContext)(DataSourceContext);
  var selectedRowKeys = ctx.selectedRowKeys,
      setSelectedRowKeys = ctx.setSelectedRowKeys;
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var dataSource;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dataSource = ctx.dataSource || [];
                ctx.setDataSource(dataSource.filter(function (_, index) {
                  return !selectedRowKeys.includes(index);
                }));
                setSelectedRowKeys([]);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};

var useUpdateAction = function useUpdateAction() {
  var recordIndex = (0, _2.useRecordIndex)();
  var form = (0, _react.useForm)();

  var _useActionContext2 = (0, _2.useActionContext)(),
      setVisible = _useActionContext2.setVisible;

  var ctx = (0, _react2.useContext)(DataSourceContext);
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var dataSource, values;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dataSource = (ctx === null || ctx === void 0 ? void 0 : ctx.dataSource) || [];
                values = dataSource.map(function (item, index) {
                  if (index === recordIndex) {
                    return _objectSpread({}, form.values);
                  }

                  return item;
                });
                ctx.setDataSource(_toConsumableArray(values));
                setVisible(false);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
};

var useDestroyAction = function useDestroyAction() {
  var recordIndex = (0, _2.useRecordIndex)();
  var ctx = (0, _react2.useContext)(DataSourceContext);
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var dataSource;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dataSource = ctx.dataSource || [];
                ctx.setDataSource(dataSource.filter(function (_, index) {
                  return recordIndex !== index;
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  };
};

var ds = {
  useSelectedRowKeys: useSelectedRowKeys,
  useDataSource: useDataSource,
  useCreateAction: useCreateAction,
  useBulkDestroyAction: useBulkDestroyAction,
  useUpdateAction: useUpdateAction,
  useDestroyAction: useDestroyAction
};
exports.ds = ds;
var SubFieldDataSourceProvider = (0, _react.observer)(function (props) {
  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  var _useState3 = (0, _react2.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      dataSource = _useState4[0],
      setDataSource = _useState4[1];

  var record = (0, _2.useRecord)();
  var api = (0, _apiClient.useAPIClient)();
  var service = (0, _2.useRequest)(function () {
    if (record.interface === 'subTable') {
      var _record$children;

      if (record === null || record === void 0 ? void 0 : (_record$children = record.children) === null || _record$children === void 0 ? void 0 : _record$children.length) {
        return Promise.resolve({
          data: (record === null || record === void 0 ? void 0 : record.children) || []
        });
      }

      return api.resource('fields').list({
        paginate: false,
        appends: ['uiSchema'],
        sort: 'sort',
        filter: {
          parentKey: record.key
        }
      }).then(function (res) {
        return res === null || res === void 0 ? void 0 : res.data;
      });
    }

    return Promise.resolve({
      data: []
    });
  }, {
    onSuccess: function onSuccess(data) {
      console.log('dataSource1', data === null || data === void 0 ? void 0 : data.data);
      setDataSource(data === null || data === void 0 ? void 0 : data.data);
    }
  });
  return /*#__PURE__*/_react2.default.createElement(_2.CollectionProvider, {
    collection: collection
  }, /*#__PURE__*/_react2.default.createElement(DataSourceContext.Provider, {
    value: {
      rowKey: 'name',
      service: service,
      dataSource: dataSource,
      setDataSource: setDataSource,
      selectedRowKeys: selectedRowKeys,
      setSelectedRowKeys: setSelectedRowKeys
    }
  }, props.children));
});
exports.SubFieldDataSourceProvider = SubFieldDataSourceProvider;
var DataSourceProvider = (0, _react.observer)(function (props) {
  var rowKey = props.rowKey,
      collection = props.collection,
      association = props.association;

  var _useState5 = (0, _react2.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedRowKeys = _useState6[0],
      setSelectedRowKeys = _useState6[1];

  var _useState7 = (0, _react2.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      dataSource = _useState8[0],
      setDataSource = _useState8[1];

  var record = (0, _2.useRecord)();
  var api = (0, _apiClient.useAPIClient)();

  var _useCollectionManager = (0, _2.useCollectionManager)(),
      getCollection = _useCollectionManager.getCollection;

  var coll = getCollection(collection);
  var resourceOf = record === null || record === void 0 ? void 0 : record[association.targetKey || 'id'];
  var service = (0, _2.useRequest)(function () {
    if (resourceOf) {
      var _coll$fields, _coll$fields$filter;

      return api.request({
        resource: "".concat(association.collectionName, ".").concat(association.name),
        resourceOf: resourceOf,
        action: 'list',
        params: {
          appends: coll === null || coll === void 0 ? void 0 : (_coll$fields = coll.fields) === null || _coll$fields === void 0 ? void 0 : (_coll$fields$filter = _coll$fields.filter(function (field) {
            return field.target;
          })) === null || _coll$fields$filter === void 0 ? void 0 : _coll$fields$filter.map(function (field) {
            return field.name;
          })
        }
      }).then(function (res) {
        return res.data;
      });
    }

    return Promise.resolve({
      data: (record === null || record === void 0 ? void 0 : record[association.name]) || []
    });
  }, {
    onSuccess: function onSuccess(data) {
      setDataSource(data === null || data === void 0 ? void 0 : data.data);
    }
  });
  return /*#__PURE__*/_react2.default.createElement(_2.CollectionProvider, {
    collection: coll
  }, /*#__PURE__*/_react2.default.createElement(DataSourceContext.Provider, {
    value: {
      rowKey: rowKey,
      service: service,
      dataSource: dataSource,
      setDataSource: setDataSource,
      selectedRowKeys: selectedRowKeys,
      setSelectedRowKeys: setSelectedRowKeys
    }
  }, props.children));
});
exports.DataSourceProvider = DataSourceProvider;