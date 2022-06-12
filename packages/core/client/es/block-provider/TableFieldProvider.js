function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import { useField } from '@formily/react';
import React, { createContext, useContext, useEffect } from 'react';
import { BlockProvider, useBlockRequestContext } from './BlockProvider';
export var TableFieldContext = /*#__PURE__*/createContext({});

var InternalTableFieldProvider = function InternalTableFieldProvider(props) {
  var _props$params = props.params,
      params = _props$params === void 0 ? {} : _props$params,
      showIndex = props.showIndex,
      dragSort = props.dragSort;
  var field = useField();

  var _useBlockRequestConte = useBlockRequestContext(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service; // if (service.loading) {
  //   return <Spin />;
  // }


  return /*#__PURE__*/React.createElement(TableFieldContext.Provider, {
    value: {
      field: field,
      service: service,
      resource: resource,
      params: params,
      showIndex: showIndex,
      dragSort: dragSort
    }
  }, props.children);
};

export var TableFieldResource = /*#__PURE__*/function () {
  function TableFieldResource(options) {
    _classCallCheck(this, TableFieldResource);

    this.field = void 0;
    this.api = void 0;
    this.sourceId = void 0;
    this.resource = void 0;
    this.field = options.field;
    this.api = options.api;
    this.sourceId = options.sourceId;
    this.resource = this.api.resource(options.resource, this.sourceId);
  }

  _createClass(TableFieldResource, [{
    key: "list",
    value: function () {
      var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.field.data = this.field.data || {};

                if (!this.field.data.changed) {
                  _context.next = 4;
                  break;
                }

                console.log('list.dataSource', this.field.data.dataSource);
                return _context.abrupt("return", {
                  data: {
                    data: this.field.data.dataSource
                  }
                });

              case 4:
                if (this.sourceId) {
                  _context.next = 8;
                  break;
                }

                console.log('list.sourceId', this.field.data.dataSource);
                this.field.data.dataSource = [];
                return _context.abrupt("return", {
                  data: {
                    data: []
                  }
                });

              case 8:
                _context.next = 10;
                return this.resource.list(options);

              case 10:
                response = _context.sent;
                console.log('list', response);
                this.field.data.dataSource = response.data.data;
                return _context.abrupt("return", {
                  data: {
                    data: response.data.data
                  }
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function list(_x) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var filterByTk;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('get', options);
                filterByTk = options.filterByTk;
                return _context2.abrupt("return", {
                  data: {
                    data: this.field.data.dataSource[filterByTk]
                  }
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
        var values;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('create', options);
                values = options.values;
                this.field.data.dataSource.push(values);
                this.field.data.changed = true;

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
        var filterByTk, values;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('update', options);
                filterByTk = options.filterByTk, values = options.values;
                this.field.data.dataSource[filterByTk] = values;
                this.field.data.changed = true;

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options) {
        var filterByTk;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('destroy', options);
                filterByTk = options.filterByTk;

                if (!Array.isArray(filterByTk)) {
                  filterByTk = [filterByTk];
                }

                this.field.data.dataSource = this.field.data.dataSource.filter(function (item, index) {
                  return !filterByTk.includes(index);
                });
                this.field.data.changed = true;

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function destroy(_x5) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);

  return TableFieldResource;
}();
export var TableFieldProvider = function TableFieldProvider(props) {
  return /*#__PURE__*/React.createElement(BlockProvider, _objectSpread({
    block: 'TableField'
  }, props), /*#__PURE__*/React.createElement(InternalTableFieldProvider, _objectSpread({}, props)));
};
export var useTableFieldContext = function useTableFieldContext() {
  return useContext(TableFieldContext);
};
export var useTableFieldProps = function useTableFieldProps() {
  var _ctx$service3, _ctx$service4;

  var field = useField();
  var ctx = useTableFieldContext();
  useEffect(function () {
    var _ctx$service;

    if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : _ctx$service.loading)) {
      var _ctx$service2, _ctx$service2$data, _ctx$field, _ctx$field$data;

      field.value = ctx === null || ctx === void 0 ? void 0 : (_ctx$service2 = ctx.service) === null || _ctx$service2 === void 0 ? void 0 : (_ctx$service2$data = _ctx$service2.data) === null || _ctx$service2$data === void 0 ? void 0 : _ctx$service2$data.data;
      field.data = field.data || {};
      field.data.selectedRowKeys = ctx === null || ctx === void 0 ? void 0 : (_ctx$field = ctx.field) === null || _ctx$field === void 0 ? void 0 : (_ctx$field$data = _ctx$field.data) === null || _ctx$field$data === void 0 ? void 0 : _ctx$field$data.selectedRowKeys;
    }
  }, [ctx === null || ctx === void 0 ? void 0 : (_ctx$service3 = ctx.service) === null || _ctx$service3 === void 0 ? void 0 : _ctx$service3.loading]);
  return {
    size: 'middle',
    loading: ctx === null || ctx === void 0 ? void 0 : (_ctx$service4 = ctx.service) === null || _ctx$service4 === void 0 ? void 0 : _ctx$service4.loading,
    showIndex: ctx.showIndex,
    dragSort: ctx.dragSort,
    pagination: false,
    rowKey: function rowKey(record) {
      var _field$value, _field$value$indexOf;

      return (_field$value = field.value) === null || _field$value === void 0 ? void 0 : (_field$value$indexOf = _field$value.indexOf) === null || _field$value$indexOf === void 0 ? void 0 : _field$value$indexOf.call(_field$value, record);
    },
    onRowSelectionChange: function onRowSelectionChange(selectedRowKeys) {
      var _ctx$field2;

      ctx.field.data = (ctx === null || ctx === void 0 ? void 0 : (_ctx$field2 = ctx.field) === null || _ctx$field2 === void 0 ? void 0 : _ctx$field2.data) || {};
      ctx.field.data.selectedRowKeys = selectedRowKeys;
    },
    onChange: function onChange(_ref) {
      var current = _ref.current,
          pageSize = _ref.pageSize;
      ctx.service.run({
        page: current,
        pageSize: pageSize
      });
    }
  };
};