function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { FormItem, FormLayout } from '@formily/antd';
import { connect, useField, useForm } from '@formily/react';
import { Checkbox, Table, Tag } from 'antd';
import { isEmpty } from 'lodash';
import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCollectionManager, useCompile, useRecord } from '../..';
import { useAvailableActions } from './RoleTable';
import { ScopeSelect } from './ScopeSelect';

var toActionMap = function toActionMap(arr) {
  var _arr$forEach;

  var obj = {};
  arr === null || arr === void 0 ? void 0 : (_arr$forEach = arr.forEach) === null || _arr$forEach === void 0 ? void 0 : _arr$forEach.call(arr, function (action) {
    if (action.name) {
      obj[action.name] = action;
      obj[action.name]['scope'] = isEmpty(action.scope) ? null : action.scope;
    }
  });
  return obj;
};

export var RoleResourceCollectionContext = /*#__PURE__*/createContext({});
export var RolesResourcesActions = connect(function (props) {
  var _collection$fields, _collection$fields$fi;

  // const { onChange } = props;
  var _onChange = function onChange(values) {
    var items = values.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        scope: isEmpty(item.scope) ? null : item.scope
      });
    });
    props.onChange(items);
  };

  var form = useForm();
  var roleCollection = useRecord();
  var availableActions = useAvailableActions();

  var _useCollectionManager = useCollectionManager(),
      getCollection = _useCollectionManager.getCollection;

  var collection = getCollection(roleCollection.name);
  var compile = useCompile();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var field = useField();
  var actionMap = toActionMap(field.value || []);

  var inAction = function inAction(actionName, fieldName) {
    var _action$fields;

    var action = actionMap === null || actionMap === void 0 ? void 0 : actionMap[actionName];

    if (!action) {
      return false;
    }

    return action === null || action === void 0 ? void 0 : (_action$fields = action.fields) === null || _action$fields === void 0 ? void 0 : _action$fields.includes(fieldName);
  };

  var availableActionsWithFields = availableActions.filter(function (action) {
    return action.allowConfigureFields;
  });
  var fieldPermissions = collection === null || collection === void 0 ? void 0 : (_collection$fields = collection.fields) === null || _collection$fields === void 0 ? void 0 : (_collection$fields$fi = _collection$fields.filter(function (field) {
    return field.interface;
  })) === null || _collection$fields$fi === void 0 ? void 0 : _collection$fields$fi.map(function (field) {
    var permission = _objectSpread({}, field);

    var _iterator = _createForOfIteratorHelper(availableActionsWithFields),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var action = _step.value;
        permission[action.name] = inAction(action.name, field.name);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return permission;
  });

  var toggleAction = function toggleAction(actionName) {
    if (actionMap[actionName]) {
      delete actionMap[actionName];
    } else {
      var _collection$fields2, _collection$fields2$f, _collection$fields2$f2;

      actionMap[actionName] = {
        name: actionName,
        fields: collection === null || collection === void 0 ? void 0 : (_collection$fields2 = collection.fields) === null || _collection$fields2 === void 0 ? void 0 : (_collection$fields2$f = _collection$fields2.filter(function (field) {
          return field.interface;
        })) === null || _collection$fields2$f === void 0 ? void 0 : (_collection$fields2$f2 = _collection$fields2$f.map) === null || _collection$fields2$f2 === void 0 ? void 0 : _collection$fields2$f2.call(_collection$fields2$f, function (item) {
          return item.name;
        })
      };
    }

    _onChange(Object.values(actionMap));
  };

  var setScope = function setScope(actionName, scope) {
    if (!actionMap[actionName]) {
      toggleAction(actionName);
      actionMap[actionName]['scope'] = scope;
    } else {
      actionMap[actionName]['scope'] = scope;

      _onChange(Object.values(actionMap));
    }
  };

  var allChecked = {};

  var _iterator2 = _createForOfIteratorHelper(availableActionsWithFields),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _collection$fields4, _collection$fields4$f, _actionMap$action$nam, _actionMap$action$nam2;

      var action = _step2.value;
      allChecked[action.name] = (collection === null || collection === void 0 ? void 0 : (_collection$fields4 = collection.fields) === null || _collection$fields4 === void 0 ? void 0 : (_collection$fields4$f = _collection$fields4.filter(function (field) {
        return field.interface;
      })) === null || _collection$fields4$f === void 0 ? void 0 : _collection$fields4$f.length) === (actionMap === null || actionMap === void 0 ? void 0 : (_actionMap$action$nam = actionMap[action.name]) === null || _actionMap$action$nam === void 0 ? void 0 : (_actionMap$action$nam2 = _actionMap$action$nam.fields) === null || _actionMap$action$nam2 === void 0 ? void 0 : _actionMap$action$nam2.length);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RoleResourceCollectionContext.Provider, {
    value: collection
  }, /*#__PURE__*/React.createElement(FormLayout, {
    layout: 'vertical'
  }, /*#__PURE__*/React.createElement(FormItem, {
    label: t('Action permission')
  }, /*#__PURE__*/React.createElement(Table, {
    size: 'small',
    pagination: false,
    columns: [{
      dataIndex: 'displayName',
      title: t('Action display name'),
      render: function render(value) {
        return compile(value);
      }
    }, {
      dataIndex: 'onNewRecord',
      title: t('Action type'),
      render: function render(onNewRecord) {
        return onNewRecord ? /*#__PURE__*/React.createElement(Tag, {
          color: 'green'
        }, t('Action on new records')) : /*#__PURE__*/React.createElement(Tag, {
          color: 'geekblue'
        }, t('Action on existing records'));
      }
    }, {
      dataIndex: 'enabled',
      title: t("Allow"),
      render: function render(enabled, action) {
        return /*#__PURE__*/React.createElement(Checkbox, {
          checked: enabled,
          onChange: function onChange() {
            toggleAction(action.name);
          }
        });
      }
    }, {
      dataIndex: 'scope',
      title: t("Data scope"),
      render: function render(value, action) {
        return !action.onNewRecord && /*#__PURE__*/React.createElement(ScopeSelect, {
          value: value,
          onChange: function onChange(scope) {
            setScope(action.name, scope);
          }
        });
      }
    }],
    dataSource: availableActions === null || availableActions === void 0 ? void 0 : availableActions.map(function (item) {
      var enabled = false;
      var scope = null;

      if (actionMap[item.name]) {
        enabled = true;

        if (!item.onNewRecord) {
          scope = actionMap[item.name]['scope'];
        }
      }

      return _objectSpread(_objectSpread({}, item), {}, {
        enabled: enabled,
        scope: scope
      });
    })
  })), /*#__PURE__*/React.createElement(FormItem, {
    label: t('Field permission')
  }, /*#__PURE__*/React.createElement(Table, {
    pagination: false,
    dataSource: fieldPermissions,
    columns: [{
      dataIndex: ['uiSchema', 'title'],
      title: t('Field display name'),
      render: function render(value) {
        return compile(value);
      }
    }].concat(_toConsumableArray(availableActionsWithFields.map(function (action) {
      var checked = allChecked === null || allChecked === void 0 ? void 0 : allChecked[action.name];
      return {
        dataIndex: action.name,
        title: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Checkbox, {
          checked: checked,
          onChange: function onChange() {
            var item = actionMap[action.name] || {
              name: action.name
            };

            if (checked) {
              item.fields = [];
            } else {
              var _collection$fields3, _collection$fields3$m;

              item.fields = collection === null || collection === void 0 ? void 0 : (_collection$fields3 = collection.fields) === null || _collection$fields3 === void 0 ? void 0 : (_collection$fields3$m = _collection$fields3.map) === null || _collection$fields3$m === void 0 ? void 0 : _collection$fields3$m.call(_collection$fields3, function (item) {
                return item.name;
              });
            }

            actionMap[action.name] = item;

            _onChange(Object.values(actionMap));
          }
        }), ' ', compile(action.displayName)),
        render: function render(checked, field) {
          return /*#__PURE__*/React.createElement(Checkbox, {
            checked: checked,
            onChange: function onChange() {
              var item = actionMap[action.name] || {
                name: action.name
              };
              var fields = item.fields || [];

              if (checked) {
                var index = fields.indexOf(field.name);
                fields.splice(index, 1);
              } else {
                fields.push(field.name);
              }

              item.fields = fields;
              actionMap[action.name] = item;

              _onChange(Object.values(actionMap));
            }
          });
        }
      };
    })))
  })))));
});