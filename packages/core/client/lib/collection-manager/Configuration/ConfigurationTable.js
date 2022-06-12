"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationTable = void 0;

var _react = require("@formily/react");

var _reactive = require("@formily/reactive");

var _shared = require("@formily/shared");

var _react2 = _interopRequireWildcard(require("react"));

var _apiClient = require("../../api-client");

var _recordProvider = require("../../record-provider");

var _schemaComponent = require("../../schema-component");

var _useCollectionManager3 = require("../hooks/useCollectionManager");

var _AddSubFieldAction = require("./AddSubFieldAction");

var _EditSubFieldAction = require("./EditSubFieldAction");

var _collections = require("./schemas/collections");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useAsyncDataSource = function useAsyncDataSource(service) {
  return function (field) {
    field.loading = true;
    service(field).then(_reactive.action.bound(function (data) {
      field.dataSource = data;
      field.loading = false;
    }));
  };
};

var useCollectionValues = function useCollectionValues(options) {
  var _useActionContext = (0, _schemaComponent.useActionContext)(),
      visible = _useActionContext.visible;

  var result = (0, _apiClient.useRequest)(function () {
    return Promise.resolve({
      data: {
        name: "t_".concat((0, _shared.uid)()),
        createdBy: true,
        updatedBy: true,
        sortable: true,
        fields: [{
          name: 'id',
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          uiSchema: {
            type: 'number',
            title: '{{t("ID")}}',
            'x-component': 'InputNumber',
            'x-read-pretty': true
          },
          interface: 'id'
        }, {
          interface: 'createdAt',
          type: 'date',
          field: 'createdAt',
          name: 'createdAt',
          uiSchema: {
            type: 'datetime',
            title: '{{t("Created at")}}',
            'x-component': 'DatePicker',
            'x-component-props': {},
            'x-read-pretty': true
          }
        }, {
          interface: 'createdBy',
          type: 'belongsTo',
          target: 'users',
          foreignKey: 'createdById',
          name: 'createdBy',
          uiSchema: {
            type: 'object',
            title: '{{t("Created by")}}',
            'x-component': 'RecordPicker',
            'x-component-props': {
              fieldNames: {
                value: 'id',
                label: 'nickname'
              }
            },
            'x-read-pretty': true
          }
        }, {
          type: 'date',
          field: 'updatedAt',
          name: 'updatedAt',
          interface: 'updatedAt',
          uiSchema: {
            type: 'string',
            title: '{{t("Last updated at")}}',
            'x-component': 'DatePicker',
            'x-component-props': {},
            'x-read-pretty': true
          }
        }, {
          type: 'belongsTo',
          target: 'users',
          foreignKey: 'updatedById',
          name: 'updatedBy',
          interface: 'updatedBy',
          uiSchema: {
            type: 'object',
            title: '{{t("Last updated by")}}',
            'x-component': 'RecordPicker',
            'x-component-props': {
              fieldNames: {
                value: 'id',
                label: 'nickname'
              }
            },
            'x-read-pretty': true
          }
        }]
      }
    });
  }, _objectSpread(_objectSpread({}, options), {}, {
    manual: true
  }));
  (0, _react2.useEffect)(function () {
    if (visible) {
      result.run();
    }
  }, [visible]);
  return result;
};

var useSelectedRowKeys = function useSelectedRowKeys() {
  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  return [selectedRowKeys, setSelectedRowKeys];
};

var useDestroySubField = function useDestroySubField() {
  var record = (0, _recordProvider.useRecord)();
  var form = (0, _react.useForm)();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _form$values, _form$values$children, _form$values$children2;

        var children;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                children = (_form$values = form.values) === null || _form$values === void 0 ? void 0 : (_form$values$children = _form$values.children) === null || _form$values$children === void 0 ? void 0 : (_form$values$children2 = _form$values$children.slice) === null || _form$values$children2 === void 0 ? void 0 : _form$values$children2.call(_form$values$children);
                form.setValuesIn('children', children.filter(function (child) {
                  return child.name !== record.name;
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var useBulkDestroySubField = function useBulkDestroySubField() {
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};

var ConfigurationTable = function ConfigurationTable() {
  var _useCollectionManager = (0, _useCollectionManager3.useCollectionManager)(),
      _useCollectionManager2 = _useCollectionManager.collections,
      collections = _useCollectionManager2 === void 0 ? [] : _useCollectionManager2;

  var compile = (0, _schemaComponent.useCompile)();

  var loadCollections = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(field) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", collections === null || collections === void 0 ? void 0 : collections.map(function (item) {
                return {
                  label: compile(item.title),
                  value: item.name
                };
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function loadCollections(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_schemaComponent.SchemaComponent, {
    schema: _collections.collectionSchema,
    components: {
      AddSubFieldAction: _AddSubFieldAction.AddSubFieldAction,
      EditSubFieldAction: _EditSubFieldAction.EditSubFieldAction
    },
    scope: {
      useDestroySubField: useDestroySubField,
      useBulkDestroySubField: useBulkDestroySubField,
      useSelectedRowKeys: useSelectedRowKeys,
      useCollectionValues: useCollectionValues,
      useAsyncDataSource: useAsyncDataSource,
      loadCollections: loadCollections
    }
  }));
};

exports.ConfigurationTable = ConfigurationTable;