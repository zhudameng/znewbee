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

import { Checkbox, message, Table } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient, useRequest } from '../../api-client';
import { useRecord } from '../../record-provider';
import { useCompile } from '../../schema-component';
import { useMenuItems } from './RoleTable';

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

export var MenuConfigure = function MenuConfigure() {
  var record = useRecord();
  var api = useAPIClient();
  var items = useMenuItems();
  var compile = useCompile();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var allUids = findUids(items);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      uids = _useState2[0],
      setUids = _useState2[1];

  var _useRequest = useRequest({
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
  return /*#__PURE__*/React.createElement(Table, {
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
      title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Checkbox, {
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
                    message.success(t('Saved successfully'));

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
        return /*#__PURE__*/React.createElement(Checkbox, {
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
                      message.success(t('Saved successfully'));

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