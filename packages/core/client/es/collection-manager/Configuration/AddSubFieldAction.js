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

import { PlusOutlined } from '@ant-design/icons';
import { ArrayTable } from '@formily/antd';
import { uid } from '@formily/shared';
import { Button, Dropdown, Menu } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRequest } from '../../api-client';
import { RecordProvider } from '../../record-provider';
import { ActionContext, SchemaComponent, useActionContext, useCompile } from '../../schema-component';
import { useCollectionManager } from '../hooks';
import { options } from './interfaces';

var getSchema = function getSchema(schema) {
  if (!schema) {
    return;
  }

  var properties = cloneDeep(schema.properties);

  var initialValue = _objectSpread(_objectSpread({
    name: "f_".concat(uid())
  }, cloneDeep(schema.default)), {}, {
    interface: schema.name
  }); // initialValue.uiSchema.title = schema.title;


  return {
    type: 'object',
    properties: _defineProperty({}, uid(), {
      type: 'void',
      'x-component': 'Action.Drawer',
      'x-decorator': 'Form',
      'x-decorator-props': {
        useValues: function useValues(options) {
          return useRequest(function () {
            return Promise.resolve({
              data: initialValue
            });
          }, options);
        }
      },
      title: '{{ t("Add field") }}',
      properties: _objectSpread(_objectSpread({}, properties), {}, {
        footer: {
          type: 'void',
          'x-component': 'Action.Drawer.Footer',
          properties: {
            action1: {
              title: '{{ t("Cancel") }}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ cm.useCancelAction }}'
              }
            },
            action2: {
              title: '{{ t("Submit") }}',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
                useAction: '{{ ds.useCreateAction }}'
              }
            }
          }
        }
      })
    })
  };
};

var useCreateSubField = function useCreateSubField() {
  var ctx = useActionContext();
  return {
    run: function run() {// const options = form?.values?.uiSchema?.enum?.slice() || [];
      // form.setValuesIn(
      //   'uiSchema.enum',
      //   options.map((option) => {
      //     return {
      //       value: uid(),
      //       ...option,
      //     };
      //   }),
      // );
      // await run();
      // await refreshCM();

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

export var AddSubFieldAction = function AddSubFieldAction() {
  var _useCollectionManager = useCollectionManager(),
      getInterface = _useCollectionManager.getInterface;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      schema = _useState4[0],
      setSchema = _useState4[1];

  var compile = useCompile();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/React.createElement(Dropdown, {
    overlay: /*#__PURE__*/React.createElement(Menu, {
      style: {
        maxHeight: '60vh',
        overflow: 'auto'
      },
      onClick: function onClick(info) {
        var schema = getSchema(getInterface(info.key));
        setSchema(schema);
        setVisible(true);
      }
    }, options.map(function (option) {
      return option.children.length > 0 && /*#__PURE__*/React.createElement(Menu.ItemGroup, {
        title: compile(option.label)
      }, option.children.map(function (child) {
        return /*#__PURE__*/React.createElement(Menu.Item, {
          key: child.name
        }, compile(child.title));
      }));
    }))
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
    type: 'primary'
  }, t('Add field'))), /*#__PURE__*/React.createElement(RecordProvider, {
    record: {}
  }, /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: schema,
    components: {
      ArrayTable: ArrayTable
    },
    scope: {
      createOnly: true,
      useCreateSubField: useCreateSubField
    }
  })));
};