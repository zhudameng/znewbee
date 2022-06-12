function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import { useField, useFieldSchema, useForm } from '@formily/react';
import { message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useCollection } from '../../collection-manager';
import { useRecord } from '../../record-provider';
import { useActionContext, useCompile } from '../../schema-component';
import { useCurrentUserContext } from '../../user';
import { useBlockRequestContext, useFilterByTk } from '../BlockProvider';
import { useDetailsBlockContext } from '../DetailsBlockProvider';
import { TableFieldResource } from '../TableFieldProvider';
export var usePickActionProps = function usePickActionProps() {
  var form = useForm();
  return {
    onClick: function onClick() {
      console.log('usePickActionProps', form.values);
    }
  };
};

function isURL(string) {
  var url;

  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

var filterValue = function filterValue(value) {
  if (_typeof(value) !== 'object') {
    return value;
  }

  if (!value) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(function (v) {
      return filterValue(value);
    });
  }

  var obj = {};

  for (var key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      var val = value[key];

      if (Array.isArray(val) || val && _typeof(val) === 'object') {
        continue;
      }

      obj[key] = val;
    }
  }

  return obj;
};

export var useCreateActionProps = function useCreateActionProps() {
  var form = useForm();

  var _useBlockRequestConte = useBlockRequestContext(),
      field = _useBlockRequestConte.field,
      resource = _useBlockRequestConte.resource,
      __parent = _useBlockRequestConte.__parent;

  var _useActionContext = useActionContext(),
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  var history = useHistory();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var actionSchema = useFieldSchema();
  var actionField = useField();

  var _useCollection = useCollection(),
      fields = _useCollection.fields,
      getField = _useCollection.getField;

  var compile = useCompile();
  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _actionSchema$xActio, _parent$service, _parent$service$refre;

        var fieldNames, _ref, assignedValues, onSuccess, overwriteValues, skipValidator, values, key, items, collectionField;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fieldNames = fields.map(function (field) {
                  return field.name;
                });
                _ref = (_actionSchema$xActio = actionSchema === null || actionSchema === void 0 ? void 0 : actionSchema['x-action-settings']) !== null && _actionSchema$xActio !== void 0 ? _actionSchema$xActio : {}, assignedValues = _ref.assignedValues, onSuccess = _ref.onSuccess, overwriteValues = _ref.overwriteValues, skipValidator = _ref.skipValidator;

                if (skipValidator) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 5;
                return form.submit();

              case 5:
                values = {};

                for (key in form.values) {
                  if (fieldNames.includes(key)) {
                    items = form.values[key];
                    collectionField = getField(key);

                    if (collectionField.interface === 'linkTo') {
                      (function () {
                        var targetKey = collectionField.targetKey || 'id';

                        if (resource instanceof TableFieldResource) {
                          if (Array.isArray(items)) {
                            values[key] = filterValue(items);
                          } else if (items && _typeof(items) === 'object') {
                            values[key] = filterValue(items);
                          } else {
                            values[key] = items;
                          }
                        } else {
                          if (Array.isArray(items)) {
                            values[key] = items.map(function (item) {
                              return item[targetKey];
                            });
                          } else if (items && _typeof(items) === 'object') {
                            values[key] = items[targetKey];
                          } else {
                            values[key] = items;
                          }
                        }
                      })();
                    } else {
                      values[key] = form.values[key];
                    }
                  } else {
                    values[key] = form.values[key];
                  }
                }

                actionField.data = field.data || {};
                actionField.data.loading = true;
                _context2.next = 11;
                return resource.create({
                  values: _objectSpread(_objectSpread(_objectSpread({}, values), overwriteValues), assignedValues)
                });

              case 11:
                actionField.data.loading = false;
                __parent === null || __parent === void 0 ? void 0 : (_parent$service = __parent.service) === null || _parent$service === void 0 ? void 0 : (_parent$service$refre = _parent$service.refresh) === null || _parent$service$refre === void 0 ? void 0 : _parent$service$refre.call(_parent$service);
                setVisible === null || setVisible === void 0 ? void 0 : setVisible(false);

                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return");

              case 16:
                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.manualClose) {
                  Modal.success({
                    title: compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage),
                    onOk: function () {
                      var _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return form.reset();

                              case 2:
                                if ((onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirecting) && (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirectTo)) {
                                  if (isURL(onSuccess.redirectTo)) {
                                    window.location.href = onSuccess.redirectTo;
                                  } else {
                                    history.push(onSuccess.redirectTo);
                                  }
                                }

                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      function onOk() {
                        return _onOk.apply(this, arguments);
                      }

                      return onOk;
                    }()
                  });
                } else {
                  message.success(compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage));
                }

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};
export var useCustomizeUpdateActionProps = function useCustomizeUpdateActionProps() {
  var _useBlockRequestConte2 = useBlockRequestContext(),
      resource = _useBlockRequestConte2.resource,
      __parent = _useBlockRequestConte2.__parent,
      service = _useBlockRequestConte2.service;

  var filterByTk = useFilterByTk();
  var actionSchema = useFieldSchema();
  var currentRecord = useRecord();
  var ctx = useCurrentUserContext();
  var history = useHistory();
  var compile = useCompile();
  var form = useForm();
  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _actionSchema$xActio2, _service$refresh;

        var _ref2, assignedValues, onSuccess, skipValidator, _parent$service2, _parent$service2$refr;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref2 = (_actionSchema$xActio2 = actionSchema === null || actionSchema === void 0 ? void 0 : actionSchema['x-action-settings']) !== null && _actionSchema$xActio2 !== void 0 ? _actionSchema$xActio2 : {}, assignedValues = _ref2.assignedValues, onSuccess = _ref2.onSuccess, skipValidator = _ref2.skipValidator;

                if (!(skipValidator === false)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 4;
                return form.submit();

              case 4:
                _context4.next = 6;
                return resource.update({
                  filterByTk: filterByTk,
                  values: _objectSpread({}, assignedValues)
                });

              case 6:
                service === null || service === void 0 ? void 0 : (_service$refresh = service.refresh) === null || _service$refresh === void 0 ? void 0 : _service$refresh.call(service);

                if (!(resource instanceof TableFieldResource)) {
                  __parent === null || __parent === void 0 ? void 0 : (_parent$service2 = __parent.service) === null || _parent$service2 === void 0 ? void 0 : (_parent$service2$refr = _parent$service2.refresh) === null || _parent$service2$refr === void 0 ? void 0 : _parent$service2$refr.call(_parent$service2);
                }

                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return");

              case 10:
                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.manualClose) {
                  Modal.success({
                    title: compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage),
                    onOk: function () {
                      var _onOk2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                if ((onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirecting) && (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirectTo)) {
                                  if (isURL(onSuccess.redirectTo)) {
                                    window.location.href = onSuccess.redirectTo;
                                  } else {
                                    history.push(onSuccess.redirectTo);
                                  }
                                }

                              case 1:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));

                      function onOk() {
                        return _onOk2.apply(this, arguments);
                      }

                      return onOk;
                    }()
                  });
                } else {
                  message.success(compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage));
                }

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  };
};
export var useUpdateActionProps = function useUpdateActionProps() {
  var form = useForm();
  var filterByTk = useFilterByTk();

  var _useBlockRequestConte3 = useBlockRequestContext(),
      field = _useBlockRequestConte3.field,
      resource = _useBlockRequestConte3.resource,
      __parent = _useBlockRequestConte3.__parent;

  var _useActionContext2 = useActionContext(),
      setVisible = _useActionContext2.setVisible;

  var actionSchema = useFieldSchema();
  var history = useHistory();

  var _useCollection2 = useCollection(),
      fields = _useCollection2.fields,
      getField = _useCollection2.getField;

  var compile = useCompile();
  var actionField = useField();
  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _actionSchema$xActio3, _parent$service3, _parent$service3$refr;

        var _ref3, assignedValues, onSuccess, overwriteValues, skipValidator, fieldNames, values, key, collectionField, items, _parent$__parent, _parent$__parent$serv, _parent$__parent$serv2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref3 = (_actionSchema$xActio3 = actionSchema === null || actionSchema === void 0 ? void 0 : actionSchema['x-action-settings']) !== null && _actionSchema$xActio3 !== void 0 ? _actionSchema$xActio3 : {}, assignedValues = _ref3.assignedValues, onSuccess = _ref3.onSuccess, overwriteValues = _ref3.overwriteValues, skipValidator = _ref3.skipValidator;

                if (skipValidator) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 4;
                return form.submit();

              case 4:
                fieldNames = fields.map(function (field) {
                  return field.name;
                });
                values = {};
                _context6.t0 = regeneratorRuntime.keys(form.values);

              case 7:
                if ((_context6.t1 = _context6.t0()).done) {
                  _context6.next = 23;
                  break;
                }

                key = _context6.t1.value;

                if (!fieldNames.includes(key)) {
                  _context6.next = 20;
                  break;
                }

                collectionField = getField(key);

                if (!(collectionField.interface === 'subTable')) {
                  _context6.next = 14;
                  break;
                }

                values[key] = form.values[key];
                return _context6.abrupt("continue", 7);

              case 14:
                if (!(field.added && !field.added.has(key))) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("continue", 7);

              case 16:
                items = form.values[key];

                if (collectionField.interface === 'linkTo') {
                  (function () {
                    var targetKey = collectionField.targetKey || 'id';

                    if (resource instanceof TableFieldResource) {
                      if (Array.isArray(items)) {
                        values[key] = filterValue(items);
                      } else if (items && _typeof(items) === 'object') {
                        values[key] = filterValue(items);
                      } else {
                        values[key] = items;
                      }
                    } else {
                      if (Array.isArray(items)) {
                        values[key] = items.map(function (item) {
                          return item[targetKey];
                        });
                      } else if (items && _typeof(items) === 'object') {
                        values[key] = items[targetKey];
                      } else {
                        values[key] = items;
                      }
                    }
                  })();
                } else {
                  values[key] = form.values[key];
                }

                _context6.next = 21;
                break;

              case 20:
                values[key] = form.values[key];

              case 21:
                _context6.next = 7;
                break;

              case 23:
                actionField.data = field.data || {};
                actionField.data.loading = true;
                _context6.next = 27;
                return resource.update({
                  filterByTk: filterByTk,
                  values: _objectSpread(_objectSpread(_objectSpread({}, values), overwriteValues), assignedValues)
                });

              case 27:
                actionField.data.loading = false;
                __parent === null || __parent === void 0 ? void 0 : (_parent$service3 = __parent.service) === null || _parent$service3 === void 0 ? void 0 : (_parent$service3$refr = _parent$service3.refresh) === null || _parent$service3$refr === void 0 ? void 0 : _parent$service3$refr.call(_parent$service3);

                if (!(resource instanceof TableFieldResource)) {
                  __parent === null || __parent === void 0 ? void 0 : (_parent$__parent = __parent.__parent) === null || _parent$__parent === void 0 ? void 0 : (_parent$__parent$serv = _parent$__parent.service) === null || _parent$__parent$serv === void 0 ? void 0 : (_parent$__parent$serv2 = _parent$__parent$serv.refresh) === null || _parent$__parent$serv2 === void 0 ? void 0 : _parent$__parent$serv2.call(_parent$__parent$serv);
                }

                setVisible === null || setVisible === void 0 ? void 0 : setVisible(false);

                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage) {
                  _context6.next = 33;
                  break;
                }

                return _context6.abrupt("return");

              case 33:
                if (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.manualClose) {
                  Modal.success({
                    title: compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage),
                    onOk: function () {
                      var _onOk3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                _context5.next = 2;
                                return form.reset();

                              case 2:
                                if ((onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirecting) && (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.redirectTo)) {
                                  if (isURL(onSuccess.redirectTo)) {
                                    window.location.href = onSuccess.redirectTo;
                                  } else {
                                    history.push(onSuccess.redirectTo);
                                  }
                                }

                              case 3:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, _callee5);
                      }));

                      function onOk() {
                        return _onOk3.apply(this, arguments);
                      }

                      return onOk;
                    }()
                  });
                } else {
                  message.success(compile(onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess.successMessage));
                }

              case 34:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  };
};
export var useDestroyActionProps = function useDestroyActionProps() {
  var filterByTk = useFilterByTk();

  var _useBlockRequestConte4 = useBlockRequestContext(),
      resource = _useBlockRequestConte4.resource,
      service = _useBlockRequestConte4.service;

  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _service$refresh2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return resource.destroy({
                  filterByTk: filterByTk
                });

              case 2:
                service === null || service === void 0 ? void 0 : (_service$refresh2 = service.refresh) === null || _service$refresh2 === void 0 ? void 0 : _service$refresh2.call(service);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  };
};
export var useBulkDestroyActionProps = function useBulkDestroyActionProps() {
  var _useBlockRequestConte5 = useBlockRequestContext(),
      field = _useBlockRequestConte5.field;

  var _useBlockRequestConte6 = useBlockRequestContext(),
      resource = _useBlockRequestConte6.resource,
      service = _useBlockRequestConte6.service;

  return {
    onClick: function onClick() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _field$data, _field$data$selectedR, _field$data2, _service$refresh3;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (field === null || field === void 0 ? void 0 : (_field$data = field.data) === null || _field$data === void 0 ? void 0 : (_field$data$selectedR = _field$data.selectedRowKeys) === null || _field$data$selectedR === void 0 ? void 0 : _field$data$selectedR.length) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                _context8.next = 4;
                return resource.destroy({
                  filterByTk: (_field$data2 = field.data) === null || _field$data2 === void 0 ? void 0 : _field$data2.selectedRowKeys
                });

              case 4:
                field.data.selectedRowKeys = [];
                service === null || service === void 0 ? void 0 : (_service$refresh3 = service.refresh) === null || _service$refresh3 === void 0 ? void 0 : _service$refresh3.call(service);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  };
};
export var useDetailsPaginationProps = function useDetailsPaginationProps() {
  var _ctx$service, _ctx$service$data, _ctx$service$data$met, _ctx$service2, _ctx$service2$data, _ctx$service2$data$me;

  var ctx = useDetailsBlockContext();
  var count = ((_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : (_ctx$service$data = _ctx$service.data) === null || _ctx$service$data === void 0 ? void 0 : (_ctx$service$data$met = _ctx$service$data.meta) === null || _ctx$service$data$met === void 0 ? void 0 : _ctx$service$data$met.count) || 0;
  return {
    simple: true,
    hidden: count <= 1,
    current: ((_ctx$service2 = ctx.service) === null || _ctx$service2 === void 0 ? void 0 : (_ctx$service2$data = _ctx$service2.data) === null || _ctx$service2$data === void 0 ? void 0 : (_ctx$service2$data$me = _ctx$service2$data.meta) === null || _ctx$service2$data$me === void 0 ? void 0 : _ctx$service2$data$me.page) || 1,
    total: count,
    pageSize: 1,
    onChange: function onChange(page) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _ctx$service3, _ctx$service3$params;

        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = (_ctx$service3 = ctx.service) === null || _ctx$service3 === void 0 ? void 0 : (_ctx$service3$params = _ctx$service3.params) === null || _ctx$service3$params === void 0 ? void 0 : _ctx$service3$params[0];
                ctx.service.run(_objectSpread(_objectSpread({}, params), {}, {
                  page: page
                }));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    style: {
      marginTop: 24,
      textAlign: 'center'
    }
  };
};