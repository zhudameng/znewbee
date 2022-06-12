function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField, useFieldSchema } from '@formily/react';
import React, { createContext, useContext, useEffect } from 'react';
import { useCollectionManager } from '../collection-manager';
import { BlockProvider, useBlockRequestContext } from './BlockProvider';
export var TableBlockContext = /*#__PURE__*/createContext({});

var InternalTableBlockProvider = function InternalTableBlockProvider(props) {
  var params = props.params,
      showIndex = props.showIndex,
      dragSort = props.dragSort,
      rowKey = props.rowKey;
  var field = useField();

  var _useBlockRequestConte = useBlockRequestContext(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service; // if (service.loading) {
  //   return <Spin />;
  // }


  return /*#__PURE__*/React.createElement(TableBlockContext.Provider, {
    value: {
      field: field,
      service: service,
      resource: resource,
      params: params,
      showIndex: showIndex,
      dragSort: dragSort,
      rowKey: rowKey
    }
  }, props.children);
};

var useAssociationNames = function useAssociationNames(collection) {
  var _getCollectionFields;

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var names = (_getCollectionFields = getCollectionFields(collection)) === null || _getCollectionFields === void 0 ? void 0 : _getCollectionFields.filter(function (field) {
    return field.target;
  }).map(function (field) {
    return field.name;
  });
  return names;
  var fieldSchema = useFieldSchema();
  var tableSchema = fieldSchema.reduceProperties(function (buf, schema) {
    if (schema['x-component'] === 'TableV2') {
      return schema;
    }

    return buf;
  }, null);
  return tableSchema.reduceProperties(function (buf, schema) {
    if (schema['x-component'] === 'TableV2.Column') {
      var s = schema.reduceProperties(function (buf, s) {
        if (s['x-collection-field'] && names.includes(s.name)) {
          return s;
        }

        return buf;
      }, null);

      if (s) {
        buf.push(s.name);
      }
    }

    return buf;
  }, []);
};

export var TableBlockProvider = function TableBlockProvider(props) {
  var params = _objectSpread({}, props.params);

  var appends = useAssociationNames(props.collection);

  if (props.dragSort) {
    params['sort'] = ['sort'];
  }

  if (appends === null || appends === void 0 ? void 0 : appends.length) {
    params['appends'] = appends;
  }

  return /*#__PURE__*/React.createElement(BlockProvider, _objectSpread(_objectSpread({}, props), {}, {
    params: params
  }), /*#__PURE__*/React.createElement(InternalTableBlockProvider, _objectSpread(_objectSpread({}, props), {}, {
    params: params
  })));
};
export var useTableBlockContext = function useTableBlockContext() {
  return useContext(TableBlockContext);
};
export var useTableBlockProps = function useTableBlockProps() {
  var _ctx$service6, _ctx$service7, _ctx$params, _ctx$params2, _ctx$params3;

  var field = useField();
  var ctx = useTableBlockContext();
  useEffect(function () {
    var _ctx$service;

    if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : _ctx$service.loading)) {
      var _ctx$service2, _ctx$service2$data, _ctx$field, _ctx$field$data, _ctx$service3, _ctx$service3$data, _ctx$service3$data$me, _ctx$service4, _ctx$service4$data, _ctx$service4$data$me, _ctx$service5, _ctx$service5$data, _ctx$service5$data$me;

      field.value = ctx === null || ctx === void 0 ? void 0 : (_ctx$service2 = ctx.service) === null || _ctx$service2 === void 0 ? void 0 : (_ctx$service2$data = _ctx$service2.data) === null || _ctx$service2$data === void 0 ? void 0 : _ctx$service2$data.data;
      field.data = field.data || {};
      field.data.selectedRowKeys = ctx === null || ctx === void 0 ? void 0 : (_ctx$field = ctx.field) === null || _ctx$field === void 0 ? void 0 : (_ctx$field$data = _ctx$field.data) === null || _ctx$field$data === void 0 ? void 0 : _ctx$field$data.selectedRowKeys;
      field.componentProps.pagination = field.componentProps.pagination || {};
      field.componentProps.pagination.pageSize = ctx === null || ctx === void 0 ? void 0 : (_ctx$service3 = ctx.service) === null || _ctx$service3 === void 0 ? void 0 : (_ctx$service3$data = _ctx$service3.data) === null || _ctx$service3$data === void 0 ? void 0 : (_ctx$service3$data$me = _ctx$service3$data.meta) === null || _ctx$service3$data$me === void 0 ? void 0 : _ctx$service3$data$me.pageSize;
      field.componentProps.pagination.total = ctx === null || ctx === void 0 ? void 0 : (_ctx$service4 = ctx.service) === null || _ctx$service4 === void 0 ? void 0 : (_ctx$service4$data = _ctx$service4.data) === null || _ctx$service4$data === void 0 ? void 0 : (_ctx$service4$data$me = _ctx$service4$data.meta) === null || _ctx$service4$data$me === void 0 ? void 0 : _ctx$service4$data$me.count;
      field.componentProps.pagination.current = ctx === null || ctx === void 0 ? void 0 : (_ctx$service5 = ctx.service) === null || _ctx$service5 === void 0 ? void 0 : (_ctx$service5$data = _ctx$service5.data) === null || _ctx$service5$data === void 0 ? void 0 : (_ctx$service5$data$me = _ctx$service5$data.meta) === null || _ctx$service5$data$me === void 0 ? void 0 : _ctx$service5$data$me.page;
    }
  }, [ctx === null || ctx === void 0 ? void 0 : (_ctx$service6 = ctx.service) === null || _ctx$service6 === void 0 ? void 0 : _ctx$service6.loading]);
  return {
    loading: ctx === null || ctx === void 0 ? void 0 : (_ctx$service7 = ctx.service) === null || _ctx$service7 === void 0 ? void 0 : _ctx$service7.loading,
    showIndex: ctx.showIndex,
    dragSort: ctx.dragSort,
    rowKey: ctx.rowKey || 'id',
    pagination: (ctx === null || ctx === void 0 ? void 0 : (_ctx$params = ctx.params) === null || _ctx$params === void 0 ? void 0 : _ctx$params.paginate) !== false ? {
      defaultCurrent: (ctx === null || ctx === void 0 ? void 0 : (_ctx$params2 = ctx.params) === null || _ctx$params2 === void 0 ? void 0 : _ctx$params2.page) || 1,
      defaultPageSize: ctx === null || ctx === void 0 ? void 0 : (_ctx$params3 = ctx.params) === null || _ctx$params3 === void 0 ? void 0 : _ctx$params3.pageSize
    } : false,
    onRowSelectionChange: function onRowSelectionChange(selectedRowKeys) {
      var _ctx$field2;

      ctx.field.data = (ctx === null || ctx === void 0 ? void 0 : (_ctx$field2 = ctx.field) === null || _ctx$field2 === void 0 ? void 0 : _ctx$field2.data) || {};
      ctx.field.data.selectedRowKeys = selectedRowKeys;
    },
    onRowDragEnd: function onRowDragEnd(_ref) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var from, to;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                from = _ref.from, to = _ref.to;
                _context.next = 3;
                return ctx.resource.move({
                  sourceId: from[ctx.rowKey || 'id'],
                  targetId: to[ctx.rowKey || 'id']
                });

              case 3:
                ctx.service.refresh();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onChange: function onChange(_ref2) {
      var _ctx$service$params;

      var current = _ref2.current,
          pageSize = _ref2.pageSize;
      ctx.service.run(_objectSpread(_objectSpread({}, (_ctx$service$params = ctx.service.params) === null || _ctx$service$params === void 0 ? void 0 : _ctx$service$params[0]), {}, {
        page: current,
        pageSize: pageSize
      }));
    }
  };
};