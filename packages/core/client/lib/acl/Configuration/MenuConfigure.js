"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuConfigure = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _apiClient = require("../../api-client");

var _recordProvider = require("../../record-provider");

var _schemaComponent = require("../../schema-component");

var _RoleTable = require("./RoleTable");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var findUids = function findUids(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  var uids = [];

  var _iterator = _createForOfIteratorHelper(items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      uids.push(item.uid);
      uids.push.apply(uids, _toConsumableArray(findUids(item.children)));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return uids;
};

var MenuConfigure = function MenuConfigure() {
  var record = (0, _recordProvider.useRecord)();
  var api = (0, _apiClient.useAPIClient)();
  var items = (0, _RoleTable.useMenuItems)();
  var compile = (0, _schemaComponent.useCompile)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var allUids = findUids(items);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      uids = _useState2[0],
      setUids = _useState2[1];

  var _useRequest = (0, _apiClient.useRequest)({
    resource: 'roles.menuUiSchemas',
    resourceOf: record.name,
    action: 'list',
    params: {
      paginate: false
    }
  }, {
    onSuccess: function onSuccess(data) {
      var _data$data;

      setUids((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.map(function (schema) {
        return schema['x-uid'];
      })) || []);
    }
  }),
      loading = _useRequest.loading,
      refresh = _useRequest.refresh;

  var resource = api.resource('roles.menuUiSchemas', record.name);
  var allChecked = allUids.length === uids.length;
  return /*#__PURE__*/_react.default.createElement(_antd.Table, {
    loading: loading,
    rowKey: 'uid',
    pagination: false,
    expandable: {
      defaultExpandAllRows: true
    },
    columns: [{
      dataIndex: 'title',
      title: t('Menu item title')
    }, {
      dataIndex: 'accessible',
      title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
        checked: allChecked,
        onChange: function () {
          var _onChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!allChecked) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 3;
                    return resource.set({
                      values: []
                    });

                  case 3:
                    _context.next = 7;
                    break;

                  case 5:
                    _context.next = 7;
                    return resource.set({
                      values: allUids
                    });

                  case 7:
                    refresh();

                    _antd.message.success(t('Saved successfully'));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onChange(_x) {
            return _onChange.apply(this, arguments);
          }

          return onChange;
        }()
      }), ' ', t('Accessible')),
      render: function render(_, schema) {
        var checked = uids.includes(schema.uid);
        return /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
          checked: checked,
          onChange: function () {
            var _onChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
              var index;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (checked) {
                        index = uids.indexOf(schema.uid);
                        uids.splice(index, 1);
                        setUids(_toConsumableArray(uids));
                      } else {
                        setUids(function (prev) {
                          return [].concat(_toConsumableArray(prev), [schema.uid]);
                        });
                      }

                      _context2.next = 3;
                      return resource.toggle({
                        values: {
                          tk: schema.uid
                        }
                      });

                    case 3:
                      _antd.message.success(t('Saved successfully'));

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            function onChange(_x2) {
              return _onChange2.apply(this, arguments);
            }

            return onChange;
          }()
        });
      }
    }],
    dataSource: items
  });
};

exports.MenuConfigure = MenuConfigure;