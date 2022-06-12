"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditSubFieldAction = void 0;

var _antd = require("@formily/antd");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _apiClient = require("../../api-client");

var _recordProvider = require("../../record-provider");

var _schemaComponent = require("../../schema-component");

var _actionHooks = require("../action-hooks");

var _hooks = require("../hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var getSchema = function getSchema(schema) {
  if (!schema) {
    return;
  }

  var properties = (0, _cloneDeep.default)(schema.properties);
  properties.name['x-disabled'] = true;
  return {
    type: 'object',
    properties: _defineProperty({}, (0, _shared.uid)(), {
      type: 'void',
      'x-component': 'Action.Drawer',
      'x-decorator': 'Form',
      'x-decorator-props': {
        useValues: function useValues(options) {
          return (0, _apiClient.useRequest)(function () {
            return Promise.resolve({
              data: (0, _cloneDeep.default)(schema.default)
            });
          }, options);
        }
      },
      title: '{{ t("Edit field") }}',
      properties: _objectSpread(_objectSpread({}, properties), {}, {
        footer: {
          type: 'void',
          'x-component': 'Action.Drawer.Footer',
          properties: {
            action1: {
              title: '{{ t("Cancel") }}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ cm.useCancelAction }}'
              }
            },
            action2: {
              title: '{{ t("Submit") }}',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
                useAction: '{{ ds.useUpdateAction }}'
              }
            }
          }
        }
      })
    })
  };
};

var useUpdateCollectionField = function useUpdateCollectionField() {
  var form = (0, _react.useForm)();

  var _useUpdateAction = (0, _actionHooks.useUpdateAction)(),
      _run = _useUpdateAction.run;

  var _useCollectionManager = (0, _hooks.useCollectionManager)(),
      refreshCM = _useCollectionManager.refreshCM;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _form$values, _form$values$uiSchema, _form$values$uiSchema2;

        var options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return form.submit();

              case 2:
                options = (form === null || form === void 0 ? void 0 : (_form$values = form.values) === null || _form$values === void 0 ? void 0 : (_form$values$uiSchema = _form$values.uiSchema) === null || _form$values$uiSchema === void 0 ? void 0 : (_form$values$uiSchema2 = _form$values$uiSchema.enum) === null || _form$values$uiSchema2 === void 0 ? void 0 : _form$values$uiSchema2.slice()) || [];
                form.setValuesIn('uiSchema.enum', options.map(function (option) {
                  return _objectSpread({
                    value: (0, _shared.uid)()
                  }, option);
                }));
                _context.next = 6;
                return _run();

              case 6:
                _context.next = 8;
                return refreshCM();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var EditSubFieldAction = function EditSubFieldAction(props) {
  var record = (0, _recordProvider.useRecord)();

  var _useCollectionManager2 = (0, _hooks.useCollectionManager)(),
      getInterface = _useCollectionManager2.getInterface;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react2.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      schema = _useState4[0],
      setSchema = _useState4[1];

  var api = (0, _apiClient.useAPIClient)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react2.default.createElement(_schemaComponent.ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react2.default.createElement("a", {
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var schema;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // const { data } = await api.resource('collections.fields', record.collectionName).get({
                //   filterByTk: record.name,
                //   appends: record.interface === 'subTable' ? ['uiSchema', 'children'] : ['uiSchema'],
                // });
                schema = getSchema(_objectSpread(_objectSpread({}, getInterface(record.interface)), {}, {
                  default: record
                }));
                setSchema(schema);
                setVisible(true);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onClick() {
        return _onClick.apply(this, arguments);
      }

      return onClick;
    }()
  }, t('Edit')), /*#__PURE__*/_react2.default.createElement(_schemaComponent.SchemaComponent, {
    schema: schema,
    components: {
      ArrayTable: _antd.ArrayTable
    },
    scope: {
      useUpdateCollectionField: useUpdateCollectionField
    }
  }));
};

exports.EditSubFieldAction = EditSubFieldAction;