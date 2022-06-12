"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.components = exports.TableArray = void 0;

var _icons = require("@ant-design/icons");

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _reactDragListview = _interopRequireDefault(require("react-drag-listview"));

var _ = require("../..");

var _2 = require("../../../");

var _excluded = ["dragSort", "showIndex", "useSelectedRowKeys", "useDataSource", "useAction", "onChange"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isColumnComponent = function isColumnComponent(schema) {
  var _schema$xComponent;

  return ((_schema$xComponent = schema['x-component']) === null || _schema$xComponent === void 0 ? void 0 : _schema$xComponent.endsWith('.Column')) > -1;
};

var useTableColumns = function useTableColumns() {
  var start = Date.now();
  var field = (0, _react.useField)();
  var schema = (0, _react.useFieldSchema)();

  var _useSchemaInitializer = (0, _2.useSchemaInitializer)(schema['x-initializer']),
      exists = _useSchemaInitializer.exists,
      render = _useSchemaInitializer.render;

  var columns = schema.reduceProperties(function (buf, s) {
    if (isColumnComponent(s)) {
      return buf.concat([s]);
    }
  }, []).map(function (s) {
    return {
      title: /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
        name: s.name,
        schema: s,
        onlyRenderSelf: true
      }),
      dataIndex: s.name,
      key: s.name,
      render: function render(v, record) {
        var _field$value;

        var index = (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.indexOf(record);
        console.log((Date.now() - start) / 1000);
        return /*#__PURE__*/_react2.default.createElement(_2.RecordIndexProvider, {
          index: index
        }, /*#__PURE__*/_react2.default.createElement(_2.RecordProvider, {
          record: record
        }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
          schema: s,
          name: index,
          onlyRenderProperties: true
        })));
      }
    };
  });

  if (!exists) {
    return columns;
  }

  return columns.concat({
    title: render(),
    dataIndex: 'TABLE_COLUMN_INITIALIZER',
    key: 'TABLE_COLUMN_INITIALIZER'
  });
};

var components = {
  header: {
    wrapper: function wrapper(props) {
      return /*#__PURE__*/_react2.default.createElement(_.DndContext, null, /*#__PURE__*/_react2.default.createElement("thead", _objectSpread({}, props)));
    },
    cell: function cell(props) {
      return /*#__PURE__*/_react2.default.createElement("th", _objectSpread(_objectSpread({}, props), {}, {
        className: (0, _classnames.default)(props.className, (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n              &:hover .general-schema-designer {\n                display: block;\n              }\n            "]))))
      }));
    }
  },
  body: {
    wrapper: function wrapper(props) {
      return /*#__PURE__*/_react2.default.createElement(_.DndContext, null, /*#__PURE__*/_react2.default.createElement("tbody", _objectSpread({}, props)));
    },
    row: function row(props) {
      return /*#__PURE__*/_react2.default.createElement("tr", _objectSpread({}, props));
    },
    cell: function cell(props) {
      return /*#__PURE__*/_react2.default.createElement("td", _objectSpread(_objectSpread({}, props), {}, {
        className: (0, _classnames.default)(props.className, (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            max-width: 300px;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n          "]))))
      }));
    }
  }
};
exports.components = components;

var useDef = function useDef() {
  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  return [selectedRowKeys, setSelectedRowKeys];
};

var useDefDataSource = function useDefDataSource(options, props) {
  var field = (0, _react.useField)();
  return (0, _2.useRequest)(function () {
    return Promise.resolve({
      data: field.value
    });
  }, options);
};

var SortHandle = function SortHandle() {
  return /*#__PURE__*/_react2.default.createElement(_icons.MenuOutlined, {
    className: 'drag-handle',
    style: {
      cursor: 'grab'
    }
  });
};

var TableIndex = function TableIndex(props) {
  var index = props.index;
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _classnames.default)('nb-table-index'),
    style: {
      padding: '0 8px 0 16px'
    }
  }, index + 1);
};

var useDefAction = function useDefAction() {
  return {
    move: function move() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
};

var TableArray = (0, _react.observer)(function (props) {
  var _field$value3, _field$value3$slice;

  var field = (0, _react.useField)();
  var columns = useTableColumns();

  var _props$dragSort = props.dragSort,
      dragSort = _props$dragSort === void 0 ? false : _props$dragSort,
      _props$showIndex = props.showIndex,
      showIndex = _props$showIndex === void 0 ? true : _props$showIndex,
      _props$useSelectedRow = props.useSelectedRowKeys,
      useSelectedRowKeys = _props$useSelectedRow === void 0 ? useDef : _props$useSelectedRow,
      _props$useDataSource = props.useDataSource,
      useDataSource = _props$useDataSource === void 0 ? useDefDataSource : _props$useDataSource,
      _props$useAction = props.useAction,
      useAction = _props$useAction === void 0 ? useDefAction : _props$useAction,
      onChange = props.onChange,
      others = _objectWithoutProperties(props, _excluded);

  var _useSelectedRowKeys = useSelectedRowKeys(),
      _useSelectedRowKeys2 = _slicedToArray(_useSelectedRowKeys, 2),
      selectedRowKeys = _useSelectedRowKeys2[0],
      setSelectedRowKeys = _useSelectedRowKeys2[1];

  useDataSource({
    onSuccess: function onSuccess(data) {
      field.value = (data === null || data === void 0 ? void 0 : data.data) || [];
    }
  });

  var _useAction = useAction(),
      move = _useAction.move;

  var restProps = {
    rowSelection: props.rowSelection ? _objectSpread({
      type: 'checkbox',
      selectedRowKeys: selectedRowKeys,
      onChange: function onChange(selectedRowKeys) {
        setSelectedRowKeys(selectedRowKeys);
      },
      renderCell: function renderCell(checked, record, index, originNode) {
        var _props$pagination, _props$pagination2;

        var current = props === null || props === void 0 ? void 0 : (_props$pagination = props.pagination) === null || _props$pagination === void 0 ? void 0 : _props$pagination.current;
        var pageSize = (props === null || props === void 0 ? void 0 : (_props$pagination2 = props.pagination) === null || _props$pagination2 === void 0 ? void 0 : _props$pagination2.pageSize) || 20;

        if (current) {
          index = index + (current - 1) * pageSize;
        }

        return /*#__PURE__*/_react2.default.createElement("div", {
          className: (0, _classnames.default)(checked ? 'checked' : null, (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n                    position: relative;\n                    display: flex;\n                    align-items: center;\n                    justify-content: space-evenly;\n                    padding-right: 8px;\n                    .nb-table-index {\n                      opacity: 0;\n                    }\n                    &:not(.checked) {\n                      .nb-table-index {\n                        opacity: 1;\n                      }\n                    }\n                    &:hover {\n                      .nb-table-index {\n                        opacity: 0;\n                      }\n                      .nb-origin-node {\n                        display: block;\n                      }\n                    }\n                  "]))))
        }, /*#__PURE__*/_react2.default.createElement("div", {
          className: (0, _classnames.default)(checked ? 'checked' : null, (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n                      position: relative;\n                      display: flex;\n                      align-items: center;\n                      justify-content: space-evenly;\n                    "]))))
        }, dragSort && /*#__PURE__*/_react2.default.createElement(SortHandle, null), showIndex && /*#__PURE__*/_react2.default.createElement(TableIndex, {
          index: index
        })), /*#__PURE__*/_react2.default.createElement("div", {
          className: (0, _classnames.default)('nb-origin-node', checked ? 'checked' : null, (0, _css.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n                      position: absolute;\n                      right: 50%;\n                      transform: translateX(50%);\n                      &:not(.checked) {\n                        display: none;\n                      }\n                    "]))))
        }, originNode));
      }
    }, props.rowSelection) : undefined
  };

  var defaultRowKey = function defaultRowKey(record) {
    var _field$value2, _field$value2$indexOf;

    return (_field$value2 = field.value) === null || _field$value2 === void 0 ? void 0 : (_field$value2$indexOf = _field$value2.indexOf) === null || _field$value2$indexOf === void 0 ? void 0 : _field$value2$indexOf.call(_field$value2, record);
  };

  return /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        .ant-table {\n          overflow-x: auto;\n          overflow-y: hidden;\n        }\n      "])))
  }, /*#__PURE__*/_react2.default.createElement(_reactDragListview.default, {
    handleSelector: '.drag-handle',
    onDragEnd: function () {
      var _onDragEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fromIndex, toIndex) {
        var from, to;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                from = field.value[fromIndex];
                to = field.value[toIndex];
                field.move(fromIndex, toIndex);
                _context2.next = 5;
                return move(from, to);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onDragEnd(_x, _x2) {
        return _onDragEnd.apply(this, arguments);
      }

      return onDragEnd;
    }(),
    lineClassName: (0, _css.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n          border-bottom: 2px solid rgba(241, 139, 98, 0.6) !important;\n        "])))
  }, /*#__PURE__*/_react2.default.createElement(_antd.Table, _objectSpread(_objectSpread(_objectSpread({
    rowKey: defaultRowKey
  }, others), restProps), {}, {
    components: components,
    columns: columns,
    dataSource: field === null || field === void 0 ? void 0 : (_field$value3 = field.value) === null || _field$value3 === void 0 ? void 0 : (_field$value3$slice = _field$value3.slice) === null || _field$value3$slice === void 0 ? void 0 : _field$value3$slice.call(_field$value3)
  }))));
});
exports.TableArray = TableArray;