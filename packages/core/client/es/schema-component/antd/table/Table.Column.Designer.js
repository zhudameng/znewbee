function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { useField, useFieldSchema, useForm } from '@formily/react';
import React from 'react';
import { useCollectionManager } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useCompile, useDesignable } from '../../hooks';
import { useActionContext } from '../action';

var useLabelFields = function useLabelFields(collectionName) {
  var _targetFields$filter, _targetFields$filter$, _targetFields$filter$2;

  if (!collectionName) {
    return [];
  }

  var compile = useCompile();

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var targetFields = getCollectionFields(collectionName);
  return targetFields === null || targetFields === void 0 ? void 0 : (_targetFields$filter = targetFields.filter) === null || _targetFields$filter === void 0 ? void 0 : (_targetFields$filter$ = _targetFields$filter.call(targetFields, function (field) {
    return !(field === null || field === void 0 ? void 0 : field.target) && field.type !== 'boolean';
  })) === null || _targetFields$filter$ === void 0 ? void 0 : (_targetFields$filter$2 = _targetFields$filter$.map) === null || _targetFields$filter$2 === void 0 ? void 0 : _targetFields$filter$2.call(_targetFields$filter$, function (field) {
    var _field$uiSchema;

    return {
      value: field.name,
      label: compile((field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name)
    };
  });
};

export var TableColumnDesigner = function TableColumnDesigner(props) {
  var _collectionField$uiSc, _fieldSchema$xCompon, _fieldSchema$xCompon$;

  var uiSchema = props.uiSchema,
      fieldSchema = props.fieldSchema,
      collectionField = props.collectionField;
  var field = useField();
  var columnSchema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var initialValue = {
    title: columnSchema === null || columnSchema === void 0 ? void 0 : columnSchema.title
  };
  var options = useLabelFields(collectionField === null || collectionField === void 0 ? void 0 : collectionField.target);
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, null, /*#__PURE__*/React.createElement(SchemaSettings.PopupItem, {
    title: '编辑',
    schema: {
      title: '编辑字段',
      'x-component': 'Action.Modal',
      'x-component-props': {
        width: 520
      },
      'x-decorator': 'Form',
      'x-decorator-props': {
        initialValue: initialValue
      },
      type: 'void',
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: '字段标题',
          'x-component-props': {},
          description: "\u539F\u5B57\u6BB5\u6807\u9898\uFF1A".concat(collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc = collectionField.uiSchema) === null || _collectionField$uiSc === void 0 ? void 0 : _collectionField$uiSc.title)
        },
        footer: {
          type: 'void',
          'x-component': 'Action.Modal.Footer',
          properties: {
            cancel: {
              type: 'void',
              title: '{{t("Cancel")}}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: function useAction() {
                  var ctx = useActionContext();
                  return {
                    run: function run() {
                      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                ctx.setVisible(false);

                              case 1:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }))();
                    }
                  };
                }
              }
            },
            submit: {
              type: 'void',
              title: 'Submit',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
                useAction: function useAction() {
                  var form = useForm();
                  var ctx = useActionContext();
                  return {
                    run: function run() {
                      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        var title;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                title = form.values.title;

                                if (title) {
                                  field.title = title;
                                  columnSchema.title = title;
                                  dn.emit('patch', {
                                    schema: {
                                      'x-uid': columnSchema['x-uid'],
                                      title: columnSchema.title
                                    }
                                  });
                                }

                                ctx.setVisible(false);
                                dn.refresh();

                              case 4:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }))();
                    }
                  };
                }
              }
            }
          }
        }
      }
    }
  }), (collectionField === null || collectionField === void 0 ? void 0 : collectionField.target) && /*#__PURE__*/React.createElement(SchemaSettings.SelectItem, {
    title: '标题字段',
    options: options,
    value: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : (_fieldSchema$xCompon$ = _fieldSchema$xCompon['fieldNames']) === null || _fieldSchema$xCompon$ === void 0 ? void 0 : _fieldSchema$xCompon$['label'],
    onChange: function onChange(label) {
      var fieldNames = _objectSpread(_objectSpread({}, fieldSchema['x-component-props']['fieldNames']), {}, {
        label: label
      });

      fieldSchema['x-component-props']['fieldNames'] = fieldNames;
      field.query(".*.".concat(fieldSchema.name)).take(function (f) {
        f.componentProps.fieldNames = fieldNames;
      });
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          'x-component-props': {
            fieldNames: fieldNames
          }
        }
      });
      dn.refresh();
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};