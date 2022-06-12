function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { FormButtonGroup, FormDialog, FormDrawer, FormItem, FormLayout, Reset, Submit } from '@formily/antd';
import { createForm, onFormValuesChange } from '@formily/core';
import { FieldContext, FormContext, observer, RecursionField, Schema, SchemaOptionsContext, useField, useFieldSchema, useForm } from '@formily/react';
import { Dropdown, Menu, Modal, Select, Switch } from 'antd';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { SchemaComponentOptions, useAttach, useDesignable } from '..';
export var SettingsFormContext = /*#__PURE__*/createContext(null);
export var useSettingsFormContext = function useSettingsFormContext() {
  return useContext(SettingsFormContext);
};
export var SettingsForm = observer(function (props) {
  var dn = useDesignable();
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      dropdownVisible = _useState2[0],
      setDropdownVisible = _useState2[1];

  var settingsFormSchema = useMemo(function () {
    return new Schema(props.schema);
  }, []);
  var form = useMemo(function () {
    return createForm({
      initialValues: fieldSchema.toJSON(),
      effects: function effects(form) {
        onFormValuesChange(function (form) {
          dn.patch(form.values);
          console.log('form.values', form.values);
        });
      }
    });
  }, []);
  var f = useAttach(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  return /*#__PURE__*/React.createElement(SettingsFormContext.Provider, {
    value: {
      dn: dn,
      field: field,
      fieldSchema: fieldSchema,
      dropdownVisible: dropdownVisible,
      setDropdownVisible: setDropdownVisible
    }
  }, /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: {
      SettingsForm: SettingsForm
    }
  }, /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: null
  }, /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: f
  }, /*#__PURE__*/React.createElement(Dropdown, {
    visible: dropdownVisible,
    onVisibleChange: function onVisibleChange(visible) {
      return setDropdownVisible(visible);
    },
    overlayStyle: {
      width: 200
    },
    overlay: /*#__PURE__*/React.createElement(Menu, null, settingsFormSchema.mapProperties(function (s, key) {
      return /*#__PURE__*/React.createElement(RecursionField, {
        name: key,
        schema: s
      });
    }))
  }, /*#__PURE__*/React.createElement("a", null, "\u914D\u7F6E")))))));
});

SettingsForm.Divider = function () {
  return /*#__PURE__*/React.createElement(Menu.Divider, null);
};

SettingsForm.Remove = function (props) {
  var field = useField();

  var _useSettingsFormConte = useSettingsFormContext(),
      dn = _useSettingsFormConte.dn,
      setDropdownVisible = _useSettingsFormConte.setDropdownVisible;

  return /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: function onClick() {
      setDropdownVisible(false);
      Modal.confirm(_objectSpread(_objectSpread({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No'
      }, props.confirm), {}, {
        onOk: function onOk() {
          dn.remove();
          console.log('OK');
        },
        onCancel: function onCancel() {
          console.log('Cancel');
        }
      }));
    }
  }, field.title);
};

SettingsForm.Switch = observer(function () {
  var field = useField();
  return /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: function onClick() {
      field.value = !field.value;
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, field.title, " ", /*#__PURE__*/React.createElement(Switch, {
    checked: !!field.value
  })));
});
SettingsForm.Select = observer(function (props) {
  var field = useField();

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  return /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: function onClick() {
      return !open && setOpen(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, field.title, /*#__PURE__*/React.createElement(Select, {
    open: open,
    onDropdownVisibleChange: function onDropdownVisibleChange(open) {
      return setOpen(open);
    },
    onSelect: function onSelect() {
      setOpen(false);
    },
    onChange: function onChange(value) {
      field.value = value;
    },
    value: field.value,
    options: field.dataSource,
    style: {
      width: '60%'
    },
    size: 'small',
    bordered: false
  })));
});

SettingsForm.Modal = function () {
  var form = useForm();
  var field = useField();
  var fieldSchema = useFieldSchema();
  var options = useContext(SchemaOptionsContext);

  var _useSettingsFormConte2 = useSettingsFormContext(),
      setDropdownVisible = _useSettingsFormConte2.setDropdownVisible;

  return /*#__PURE__*/React.createElement(Menu.Item, {
    style: {
      width: 200
    },
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var values;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setDropdownVisible(false);
                _context.next = 3;
                return FormDialog('Title', function () {
                  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread(_objectSpread({}, options.components), {}, {
                      FormItem: FormItem
                    })
                  }, /*#__PURE__*/React.createElement(FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/React.createElement(RecursionField, {
                    schema: fieldSchema,
                    onlyRenderProperties: true
                  })));
                }).open({
                  initialValues: fieldSchema.type !== 'void' ? field.value : form.values
                });

              case 3:
                values = _context.sent;

                if (fieldSchema.type !== 'void') {
                  form.setValues(_defineProperty({}, fieldSchema.name, values), 'deepMerge');
                } else {
                  form.setValues(values);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onClick() {
        return _onClick.apply(this, arguments);
      }

      return onClick;
    }()
  }, field.title);
};

SettingsForm.Drawer = function () {
  var form = useForm();
  var field = useField();
  var fieldSchema = useFieldSchema();
  var options = useContext(SchemaOptionsContext);

  var _useSettingsFormConte3 = useSettingsFormContext(),
      setDropdownVisible = _useSettingsFormConte3.setDropdownVisible;

  return /*#__PURE__*/React.createElement(Menu.Item, {
    style: {
      width: 200
    },
    onClick: function () {
      var _onClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var values;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setDropdownVisible(false);
                _context2.next = 3;
                return FormDrawer('Popup form', function () {
                  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread(_objectSpread({}, options.components), {}, {
                      FormItem: FormItem
                    })
                  }, /*#__PURE__*/React.createElement(FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/React.createElement(RecursionField, {
                    schema: fieldSchema,
                    onlyRenderProperties: true
                  }), /*#__PURE__*/React.createElement(FormDrawer.Footer, null, /*#__PURE__*/React.createElement(FormButtonGroup, {
                    align: "right"
                  }, /*#__PURE__*/React.createElement(Reset, null, "Reset"), /*#__PURE__*/React.createElement(Submit, {
                    onSubmit: function onSubmit() {
                      return new Promise(function (resolve) {
                        setTimeout(resolve, 1000);
                      });
                    }
                  }, "Submit")))));
                }).open({
                  initialValues: fieldSchema.type !== 'void' ? field.value : form.values
                });

              case 3:
                values = _context2.sent;

                if (fieldSchema.type !== 'void') {
                  form.setValues(_defineProperty({}, fieldSchema.name, values), 'deepMerge');
                } else {
                  form.setValues(values);
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onClick() {
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }()
  }, field.title);
};

SettingsForm.SubMenu = function () {
  var field = useField();
  var fieldSchema = useFieldSchema();
  return /*#__PURE__*/React.createElement(Menu.SubMenu, {
    title: field.title
  }, fieldSchema.mapProperties(function (schema, key) {
    return /*#__PURE__*/React.createElement(RecursionField, {
      name: key,
      schema: schema
    });
  }));
};

SettingsForm.ItemGroup = function () {
  var field = useField();
  var fieldSchema = useFieldSchema();
  return /*#__PURE__*/React.createElement(Menu.ItemGroup, {
    title: field.title
  }, fieldSchema.mapProperties(function (schema, key) {
    return /*#__PURE__*/React.createElement(RecursionField, {
      name: key,
      schema: schema
    });
  }));
};