function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useForm } from '@formily/react';
import { message } from 'antd';
import { useEffect } from 'react';
import { useCollection, useCollectionManager } from '.';
import { useRequest } from '../api-client';
import { useRecord } from '../record-provider';
import { useActionContext } from '../schema-component';
import { useResourceActionContext, useResourceContext } from './ResourceActionProvider';
export var useCancelAction = function useCancelAction() {
  var form = useForm();
  var ctx = useActionContext();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ctx.setVisible(false);
                form.reset();

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
export var useResetFilterAction = function useResetFilterAction() {
  var _useResourceActionCon = useResourceActionContext(),
      _run = _useResourceActionCon.run;

  var form = useForm();
  var ctx = useActionContext();
  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                form.reset();

                _run();

                ctx.setVisible(false);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
};
export var useKanbanEvents = function useKanbanEvents() {
  var _useCollection = useCollection(),
      resource = _useCollection.resource;

  return {
    onCardDragEnd: function onCardDragEnd(_ref, _ref2, _ref3) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _sourceColumn$cards, _destinationColumn$ca;

        var columns, groupField, fromColumnId, fromPosition, toColumnId, toPosition, sourceColumn, destinationColumn, sourceCard, targetCard, values;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                columns = _ref.columns, groupField = _ref.groupField;
                fromColumnId = _ref2.fromColumnId, fromPosition = _ref2.fromPosition;
                toColumnId = _ref3.toColumnId, toPosition = _ref3.toPosition;
                sourceColumn = columns.find(function (column) {
                  return column.id === fromColumnId;
                });
                destinationColumn = columns.find(function (column) {
                  return column.id === toColumnId;
                });
                sourceCard = sourceColumn === null || sourceColumn === void 0 ? void 0 : (_sourceColumn$cards = sourceColumn.cards) === null || _sourceColumn$cards === void 0 ? void 0 : _sourceColumn$cards[fromPosition];
                targetCard = destinationColumn === null || destinationColumn === void 0 ? void 0 : (_destinationColumn$ca = destinationColumn.cards) === null || _destinationColumn$ca === void 0 ? void 0 : _destinationColumn$ca[toPosition];
                values = {
                  sourceId: sourceCard.id,
                  sortField: "".concat(groupField.name, "_sort")
                };

                if (targetCard) {
                  values['targetId'] = targetCard.id;
                } else {
                  values['targetScope'] = _defineProperty({}, groupField.name, toColumnId);
                }

                _context3.next = 11;
                return resource.move(values);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
};
export var useSortFields = function useSortFields(collectionName) {
  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields,
      getInterface = _useCollectionManager.getInterface;

  var fields = getCollectionFields(collectionName);
  return fields.filter(function (field) {
    if (!field.interface) {
      return false;
    }

    var fieldInterface = getInterface(field.interface);

    if (fieldInterface.sortable) {
      return true;
    }

    return false;
  }).map(function (field) {
    var _field$uiSchema;

    return {
      value: field.name,
      label: (field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name
    };
  });
};
export var useCollectionFilterOptions = function useCollectionFilterOptions(collectionName) {
  var _useCollectionManager2 = useCollectionManager(),
      getCollectionFields = _useCollectionManager2.getCollectionFields,
      getInterface = _useCollectionManager2.getInterface;

  var fields = getCollectionFields(collectionName);

  var field2option = function field2option(field, depth) {
    var _field$uiSchema2, _operators$filter;

    if (!field.interface) {
      return;
    }

    var fieldInterface = getInterface(field.interface);

    if (!fieldInterface.filterable) {
      return;
    }

    var _fieldInterface$filte = fieldInterface.filterable,
        nested = _fieldInterface$filte.nested,
        children = _fieldInterface$filte.children,
        operators = _fieldInterface$filte.operators;
    var option = {
      name: field.name,
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema2 = field.uiSchema) === null || _field$uiSchema2 === void 0 ? void 0 : _field$uiSchema2.title) || field.name,
      schema: field === null || field === void 0 ? void 0 : field.uiSchema,
      operators: (operators === null || operators === void 0 ? void 0 : (_operators$filter = operators.filter) === null || _operators$filter === void 0 ? void 0 : _operators$filter.call(operators, function (operator) {
        return !(operator === null || operator === void 0 ? void 0 : operator.visible) || operator.visible(field);
      })) || []
    };

    if (field.target && depth > 2) {
      return;
    }

    if (depth > 2) {
      return option;
    }

    if (children === null || children === void 0 ? void 0 : children.length) {
      option['children'] = children;
    }

    if (nested) {
      var _option$children;

      var targetFields = getCollectionFields(field.target);
      var options = getOptions(targetFields, depth + 1).filter(Boolean);
      option['children'] = option['children'] || [];

      (_option$children = option['children']).push.apply(_option$children, _toConsumableArray(options));
    }

    return option;
  };

  var getOptions = function getOptions(fields, depth) {
    var options = [];
    fields.forEach(function (field) {
      var option = field2option(field, depth);

      if (option) {
        options.push(option);
      }
    });
    return options;
  };

  return getOptions(fields, 1);
};
export var useFilterDataSource = function useFilterDataSource(options) {
  var _useCollection2 = useCollection(),
      name = _useCollection2.name;

  var data = useCollectionFilterOptions(name);
  return useRequest(function () {
    return Promise.resolve({
      data: data
    });
  }, options);
};
export var useFilterAction = function useFilterAction() {
  var _useResourceActionCon2 = useResourceActionContext(),
      _run2 = _useResourceActionCon2.run,
      params = _useResourceActionCon2.params,
      defaultRequest = _useResourceActionCon2.defaultRequest;

  var form = useForm();
  var ctx = useActionContext();

  var _params = _toArray(params),
      first = _params[0],
      others = _params.slice(1);

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _defaultRequest$param;

        var prevFilter, filter;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                prevFilter = defaultRequest === null || defaultRequest === void 0 ? void 0 : (_defaultRequest$param = defaultRequest.params) === null || _defaultRequest$param === void 0 ? void 0 : _defaultRequest$param.filter;
                filter = prevFilter ? {
                  $and: [prevFilter, form.values.filter]
                } : form.values.filter;

                _run2.apply(void 0, [_objectSpread(_objectSpread({}, first), {}, {
                  filter: filter
                })].concat(_toConsumableArray(others)));

                ctx.setVisible(false);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    }
  };
};
export var useCreateAction = function useCreateAction() {
  var form = useForm();
  var ctx = useActionContext();

  var _useResourceActionCon3 = useResourceActionContext(),
      refresh = _useResourceActionCon3.refresh;

  var _useResourceContext = useResourceContext(),
      resource = _useResourceContext.resource;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return form.submit();

              case 2:
                _context5.next = 4;
                return resource.create({
                  values: form.values
                });

              case 4:
                ctx.setVisible(false);
                _context5.next = 7;
                return form.reset();

              case 7:
                refresh();

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  };
};
export var useCreateActionWithoutRefresh = function useCreateActionWithoutRefresh() {
  var form = useForm();

  var _useResourceContext2 = useResourceContext(),
      resource = _useResourceContext2.resource;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return form.submit();

              case 2:
                _context6.next = 4;
                return resource.create({
                  values: form.values
                });

              case 4:
                _context6.next = 6;
                return form.reset();

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  };
};
export var useUpdateViewAction = function useUpdateViewAction() {
  var form = useForm();
  var ctx = useActionContext(); // const { refresh } = useResourceActionContext();

  var _useResourceContext3 = useResourceContext(),
      resource = _useResourceContext3.resource,
      targetKey = _useResourceContext3.targetKey;

  var _useRecord = useRecord(),
      filterByTk = _useRecord[targetKey];

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return form.submit();

              case 2:
                _context7.next = 4;
                return resource.update({
                  filterByTk: filterByTk,
                  values: form.values
                });

              case 4:
                // refresh();
                message.success('保存成功');

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  };
};
export var useMoveAction = function useMoveAction() {
  var _useResourceContext4 = useResourceContext(),
      resource = _useResourceContext4.resource;

  var _useResourceActionCon4 = useResourceActionContext(),
      refresh = _useResourceActionCon4.refresh;

  return {
    move: function move(from, to) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return resource.move({
                  sourceId: from.id,
                  targetId: to.id
                });

              case 2:
                refresh();

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  };
};
export var useUpdateAction = function useUpdateAction() {
  var form = useForm();
  var ctx = useActionContext();

  var _useResourceActionCon5 = useResourceActionContext(),
      refresh = _useResourceActionCon5.refresh;

  var _useResourceContext5 = useResourceContext(),
      resource = _useResourceContext5.resource,
      targetKey = _useResourceContext5.targetKey;

  var _useRecord2 = useRecord(),
      filterByTk = _useRecord2[targetKey];

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return form.submit();

              case 2:
                _context9.next = 4;
                return resource.update({
                  filterByTk: filterByTk,
                  values: form.values
                });

              case 4:
                ctx.setVisible(false);
                _context9.next = 7;
                return form.reset();

              case 7:
                refresh();

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    }
  };
};
export var useDestroyAction = function useDestroyAction() {
  var _useResourceActionCon6 = useResourceActionContext(),
      refresh = _useResourceActionCon6.refresh;

  var _useResourceContext6 = useResourceContext(),
      resource = _useResourceContext6.resource,
      targetKey = _useResourceContext6.targetKey;

  var _useRecord3 = useRecord(),
      filterByTk = _useRecord3[targetKey];

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return resource.destroy({
                  filterByTk: filterByTk
                });

              case 2:
                refresh();

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    }
  };
};
export var useBulkDestroyAction = function useBulkDestroyAction() {
  var _useResourceActionCon7 = useResourceActionContext(),
      state = _useResourceActionCon7.state,
      setState = _useResourceActionCon7.setState,
      refresh = _useResourceActionCon7.refresh;

  var _useResourceContext7 = useResourceContext(),
      resource = _useResourceContext7.resource,
      targetKey = _useResourceContext7.targetKey;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return resource.destroy({
                  filterByTk: (state === null || state === void 0 ? void 0 : state.selectedRowKeys) || []
                });

              case 2:
                setState === null || setState === void 0 ? void 0 : setState({
                  selectedRowKeys: []
                });
                refresh();

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    }
  };
};
export var useValuesFromRecord = function useValuesFromRecord(options) {
  var record = useRecord();
  var result = useRequest(function () {
    return Promise.resolve({
      data: record
    });
  }, _objectSpread(_objectSpread({}, options), {}, {
    manual: true
  }));
  var ctx = useActionContext();
  useEffect(function () {
    if (ctx.visible) {
      result.run();
    }
  }, [ctx.visible]);
  return result;
};
export var useValuesFromRA = function useValuesFromRA(options) {
  var ctx = useResourceActionContext();
  return useRequest(function () {
    return Promise.resolve(ctx.data);
  }, _objectSpread(_objectSpread({}, options), {}, {
    refreshDeps: [ctx.data]
  }));
};
export var useCreateActionAndRefreshCM = function useCreateActionAndRefreshCM() {
  var _useCreateAction = useCreateAction(),
      _run3 = _useCreateAction.run;

  var _useCollectionManager3 = useCollectionManager(),
      refreshCM = _useCollectionManager3.refreshCM;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _run3();

              case 2:
                _context12.next = 4;
                return refreshCM();

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    }
  };
};
export var useUpdateActionAndRefreshCM = function useUpdateActionAndRefreshCM() {
  var _useUpdateAction = useUpdateAction(),
      _run4 = _useUpdateAction.run;

  var _useCollectionManager4 = useCollectionManager(),
      refreshCM = _useCollectionManager4.refreshCM;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _run4();

              case 2:
                _context13.next = 4;
                return refreshCM();

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    }
  };
};
export var useDestroyActionAndRefreshCM = function useDestroyActionAndRefreshCM() {
  var _useDestroyAction = useDestroyAction(),
      _run5 = _useDestroyAction.run;

  var _useCollectionManager5 = useCollectionManager(),
      refreshCM = _useCollectionManager5.refreshCM;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _run5();

              case 2:
                _context14.next = 4;
                return refreshCM();

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    }
  };
};
export var useBulkDestroyActionAndRefreshCM = function useBulkDestroyActionAndRefreshCM() {
  var _useBulkDestroyAction = useBulkDestroyAction(),
      _run6 = _useBulkDestroyAction.run;

  var _useCollectionManager6 = useCollectionManager(),
      refreshCM = _useCollectionManager6.refreshCM;

  return {
    run: function run() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return _run6();

              case 2:
                _context15.next = 4;
                return refreshCM();

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }))();
    }
  };
};