var _excluded = ["pagination", "useProps", "onChange"],
    _excluded2 = ["pagination"],
    _excluded3 = ["dragSort", "showIndex", "onRowDragEnd", "onRowSelectionChange", "onChange", "rowSelection"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { Table as AntdTable } from 'antd';
import { default as classNames, default as cls } from 'classnames';
import React from 'react';
import ReactDragListView from 'react-drag-listview';
import { useTranslation } from 'react-i18next';
import { DndContext } from '../..';
import { RecordIndexProvider, RecordProvider, useSchemaInitializer } from '../../../';

var isColumnComponent = function isColumnComponent(schema) {
  var _schema$xComponent;

  return ((_schema$xComponent = schema['x-component']) === null || _schema$xComponent === void 0 ? void 0 : _schema$xComponent.endsWith('.Column')) > -1;
};

var useTableColumns = function useTableColumns() {
  var start = Date.now();
  var field = useField();
  var schema = useFieldSchema();

  var _useSchemaInitializer = useSchemaInitializer(schema['x-initializer']),
      exists = _useSchemaInitializer.exists,
      render = _useSchemaInitializer.render;

  var columns = schema.reduceProperties(function (buf, s) {
    if (isColumnComponent(s)) {
      return buf.concat([s]);
    }
  }, []).map(function (s) {
    return {
      title: /*#__PURE__*/React.createElement(RecursionField, {
        name: s.name,
        schema: s,
        onlyRenderSelf: true
      }),
      dataIndex: s.name,
      key: s.name,
      // width: 300,
      render: function render(v, record) {
        var _field$value;

        var index = (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.indexOf(record);
        console.log((Date.now() - start) / 1000);
        return /*#__PURE__*/React.createElement(RecordIndexProvider, {
          index: index
        }, /*#__PURE__*/React.createElement(RecordProvider, {
          record: record
        }, /*#__PURE__*/React.createElement(RecursionField, {
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

export var components = {
  header: {
    wrapper: function wrapper(props) {
      return /*#__PURE__*/React.createElement(DndContext, null, /*#__PURE__*/React.createElement("thead", _objectSpread({}, props)));
    },
    cell: function cell(props) {
      return /*#__PURE__*/React.createElement("th", _objectSpread(_objectSpread({}, props), {}, {
        className: cls(props.className, css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n              max-width: 300px;\n              white-space: nowrap;\n              &:hover .general-schema-designer {\n                display: block;\n              }\n            "]))))
      }));
    }
  },
  body: {
    wrapper: function wrapper(props) {
      return /*#__PURE__*/React.createElement(DndContext, null, /*#__PURE__*/React.createElement("tbody", _objectSpread({}, props)));
    },
    row: function row(props) {
      return /*#__PURE__*/React.createElement("tr", _objectSpread({}, props));
    },
    cell: function cell(props) {
      return /*#__PURE__*/React.createElement("td", _objectSpread(_objectSpread({}, props), {}, {
        className: classNames(props.className, css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            max-width: 300px;\n            white-space: nowrap;\n            .nb-read-pretty-input-number {\n              text-align: right;\n            }\n          "]))))
      }));
    }
  }
};

var SortHandle = function SortHandle() {
  return /*#__PURE__*/React.createElement(MenuOutlined, {
    className: 'drag-handle',
    style: {
      cursor: 'grab'
    }
  });
};

var TableIndex = function TableIndex(props) {
  var index = props.index;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames('nb-table-index'),
    style: {
      padding: '0 8px 0 16px'
    }
  }, index + 1);
};

var usePaginationProps = function usePaginationProps(pagination1, pagination2) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  if (pagination2 === false) {
    return false;
  }

  if (!pagination2 && pagination1 === false) {
    return false;
  }

  return _objectSpread(_objectSpread({
    showTotal: function showTotal(total) {
      return t('Total {{count}} items', {
        count: total
      });
    },
    showSizeChanger: true
  }, pagination1), pagination2);
};

export var Table = observer(function (props) {
  var _field$data, _field$value3, _field$value3$slice;

  var field = useField();
  var columns = useTableColumns();

  var pagination1 = props.pagination,
      useProps = props.useProps,
      onChange = props.onChange,
      others1 = _objectWithoutProperties(props, _excluded);

  var _ref = (useProps === null || useProps === void 0 ? void 0 : useProps()) || {},
      pagination2 = _ref.pagination,
      others2 = _objectWithoutProperties(_ref, _excluded2);

  var _others1$others = _objectSpread(_objectSpread({}, others1), others2),
      _others1$others$dragS = _others1$others.dragSort,
      dragSort = _others1$others$dragS === void 0 ? false : _others1$others$dragS,
      _others1$others$showI = _others1$others.showIndex,
      showIndex = _others1$others$showI === void 0 ? true : _others1$others$showI,
      onRowDragEnd = _others1$others.onRowDragEnd,
      onRowSelectionChange = _others1$others.onRowSelectionChange,
      onTableChange = _others1$others.onChange,
      rowSelection = _others1$others.rowSelection,
      others = _objectWithoutProperties(_others1$others, _excluded3);

  var paginationProps = usePaginationProps(pagination1, pagination2);
  var restProps = {
    rowSelection: rowSelection ? _objectSpread({
      type: 'checkbox',
      selectedRowKeys: (field === null || field === void 0 ? void 0 : (_field$data = field.data) === null || _field$data === void 0 ? void 0 : _field$data.selectedRowKeys) || [],
      onChange: function onChange(selectedRowKeys, selectedRows) {
        field.data = field.data || {};
        field.data.selectedRowKeys = selectedRowKeys;
        onRowSelectionChange === null || onRowSelectionChange === void 0 ? void 0 : onRowSelectionChange(selectedRowKeys, selectedRows);
      },
      renderCell: function renderCell(checked, record, index, originNode) {
        var _props$pagination, _props$pagination2;

        if (!dragSort && !showIndex) {
          return originNode;
        }

        var current = props === null || props === void 0 ? void 0 : (_props$pagination = props.pagination) === null || _props$pagination === void 0 ? void 0 : _props$pagination.current;
        var pageSize = (props === null || props === void 0 ? void 0 : (_props$pagination2 = props.pagination) === null || _props$pagination2 === void 0 ? void 0 : _props$pagination2.pageSize) || 20;

        if (current) {
          index = index + (current - 1) * pageSize;
        }

        return /*#__PURE__*/React.createElement("div", {
          className: classNames(checked ? 'checked' : null, css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n                    position: relative;\n                    display: flex;\n                    align-items: center;\n                    justify-content: space-evenly;\n                    padding-right: 8px;\n                    .nb-table-index {\n                      opacity: 0;\n                    }\n                    &:not(.checked) {\n                      .nb-table-index {\n                        opacity: 1;\n                      }\n                    }\n                    &:hover {\n                      .nb-table-index {\n                        opacity: 0;\n                      }\n                      .nb-origin-node {\n                        display: block;\n                      }\n                    }\n                  "]))))
        }, /*#__PURE__*/React.createElement("div", {
          className: classNames(checked ? 'checked' : null, css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n                      position: relative;\n                      display: flex;\n                      align-items: center;\n                      justify-content: space-evenly;\n                    "]))))
        }, dragSort && /*#__PURE__*/React.createElement(SortHandle, null), showIndex && /*#__PURE__*/React.createElement(TableIndex, {
          index: index
        })), /*#__PURE__*/React.createElement("div", {
          className: classNames('nb-origin-node', checked ? 'checked' : null, css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n                      position: absolute;\n                      right: 50%;\n                      transform: translateX(50%);\n                      &:not(.checked) {\n                        display: none;\n                      }\n                    "]))))
        }, originNode));
      }
    }, rowSelection) : undefined
  };

  var defaultRowKey = function defaultRowKey(record) {
    var _field$value2, _field$value2$indexOf;

    return (_field$value2 = field.value) === null || _field$value2 === void 0 ? void 0 : (_field$value2$indexOf = _field$value2.indexOf) === null || _field$value2$indexOf === void 0 ? void 0 : _field$value2$indexOf.call(_field$value2, record);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        .ant-table {\n          overflow-x: auto;\n          overflow-y: hidden;\n        }\n      "])))
  }, /*#__PURE__*/React.createElement(ReactDragListView, {
    handleSelector: '.drag-handle',
    onDragEnd: function () {
      var _onDragEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fromIndex, toIndex) {
        var from, to;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                from = field.value[fromIndex];
                to = field.value[toIndex];
                field.move(fromIndex, toIndex);
                onRowDragEnd({
                  fromIndex: fromIndex,
                  toIndex: toIndex,
                  from: from,
                  to: to
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onDragEnd(_x, _x2) {
        return _onDragEnd.apply(this, arguments);
      }

      return onDragEnd;
    }(),
    lineClassName: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n          border-bottom: 2px solid rgba(241, 139, 98, 0.6) !important;\n        "])))
  }, /*#__PURE__*/React.createElement(AntdTable, _objectSpread(_objectSpread(_objectSpread({
    rowKey: defaultRowKey
  }, others), restProps), {}, {
    pagination: paginationProps,
    components: components,
    onChange: function onChange(pagination, filters, sorter, extra) {
      onTableChange === null || onTableChange === void 0 ? void 0 : onTableChange(pagination, filters, sorter, extra);
    },
    // tableLayout={'auto'}
    // scroll={{ x: 12 * 300 + 80 }}
    columns: columns,
    dataSource: field === null || field === void 0 ? void 0 : (_field$value3 = field.value) === null || _field$value3 === void 0 ? void 0 : (_field$value3$slice = _field$value3.slice) === null || _field$value3$slice === void 0 ? void 0 : _field$value3$slice.call(_field$value3)
  }))));
});