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

import { Spin } from 'antd';
import React, { useState } from 'react';
import { useAPIClient, useRequest } from '../api-client';
import { CollectionManagerSchemaComponentProvider } from './CollectionManagerSchemaComponentProvider';
import { CollectionManagerContext } from './context';
import * as defaultInterfaces from './interfaces';
export var CollectionManagerProvider = function CollectionManagerProvider(props) {
  var service = props.service,
      interfaces = props.interfaces,
      _props$collections = props.collections,
      collections = _props$collections === void 0 ? [] : _props$collections,
      _refreshCM = props.refreshCM;
  return /*#__PURE__*/React.createElement(CollectionManagerContext.Provider, {
    value: {
      service: service,
      interfaces: _objectSpread(_objectSpread({}, defaultInterfaces), interfaces),
      collections: collections,
      refreshCM: function () {
        var _refreshCM2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_refreshCM) {
                    _context.next = 3;
                    break;
                  }

                  _context.next = 3;
                  return _refreshCM();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function refreshCM() {
          return _refreshCM2.apply(this, arguments);
        }

        return refreshCM;
      }()
    }
  }, /*#__PURE__*/React.createElement(CollectionManagerSchemaComponentProvider, null, props.children));
};
export var RemoteCollectionManagerProvider = function RemoteCollectionManagerProvider(props) {
  var _service$data;

  var api = useAPIClient();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      contentLoading = _useState2[0],
      setContentLoading = _useState2[1];

  var options = {
    resource: 'collections',
    action: 'list',
    params: {
      paginate: false,
      appends: ['fields', 'fields.uiSchema'],
      filter: {// inherit: false,
      },
      sort: ['sort']
    }
  };
  var service = useRequest(options);

  if (service.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(CollectionManagerProvider, _objectSpread({
    service: _objectSpread(_objectSpread({}, service), {}, {
      contentLoading: contentLoading,
      setContentLoading: setContentLoading
    }),
    collections: service === null || service === void 0 ? void 0 : (_service$data = service.data) === null || _service$data === void 0 ? void 0 : _service$data.data,
    refreshCM: function () {
      var _refreshCM3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$api$request, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setContentLoading(true);
                _context2.next = 3;
                return api.request(options);

              case 3:
                _yield$api$request = _context2.sent;
                data = _yield$api$request.data;
                service.mutate(data);
                setContentLoading(false);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function refreshCM() {
        return _refreshCM3.apply(this, arguments);
      }

      return refreshCM;
    }()
  }, props));
};