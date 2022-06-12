"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSchemaSettings = exports.SchemaSettingsProvider = exports.SchemaSettings = void 0;

var _css = require("@emotion/css");

var _antd = require("@formily/antd");

var _core = require("@formily/core");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd2 = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("..");

var _schemaTemplates = require("../schema-templates");

var _BlockTemplate = require("../schema-templates/BlockTemplate");

var _templateObject;

var _excluded = ["children", "fieldSchema"],
    _excluded2 = ["title", "dn"],
    _excluded3 = ["title", "options", "value", "onChange"],
    _excluded4 = ["title", "onChange"],
    _excluded5 = ["schema"],
    _excluded6 = ["title", "onSubmit", "initialValues", "initialSchema", "modalTip"],
    _excluded7 = ["hidden", "title", "components", "scope", "effects", "schema", "onSubmit", "initialValues"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SchemaSettingsContext = /*#__PURE__*/(0, _react2.createContext)(null);

var useSchemaSettings = function useSchemaSettings() {
  return (0, _react2.useContext)(SchemaSettingsContext);
};

exports.useSchemaSettings = useSchemaSettings;

var SchemaSettingsProvider = function SchemaSettingsProvider(props) {
  var children = props.children,
      fieldSchema = props.fieldSchema,
      others = _objectWithoutProperties(props, _excluded);

  var _useSchemaTemplateMan = (0, _schemaTemplates.useSchemaTemplateManager)(),
      getTemplateBySchema = _useSchemaTemplateMan.getTemplateBySchema;

  var _useCollection = (0, _.useCollection)(),
      name = _useCollection.name;

  var template = getTemplateBySchema(fieldSchema);
  return /*#__PURE__*/_react2.default.createElement(SchemaSettingsContext.Provider, {
    value: _objectSpread({
      collectionName: name,
      template: template,
      fieldSchema: fieldSchema
    }, others)
  }, children);
};

exports.SchemaSettingsProvider = SchemaSettingsProvider;

var SchemaSettings = function SchemaSettings(props) {
  var title = props.title,
      dn = props.dn,
      others = _objectWithoutProperties(props, _excluded2);

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var DropdownMenu = /*#__PURE__*/_react2.default.createElement(_antd2.Dropdown, {
    visible: visible,
    onVisibleChange: function onVisibleChange(visible) {
      setVisible(visible);
    },
    overlay: /*#__PURE__*/_react2.default.createElement(_antd2.Menu, null, props.children),
    overlayClassName: (0, _classnames.default)('nb-schema-initializer-button-overlay', (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          .ant-dropdown-menu-item-group-list {\n            max-height: 40vh;\n            overflow: auto;\n          }\n        "]))))
  }, typeof title === 'string' ? /*#__PURE__*/_react2.default.createElement("span", null, title) : title);

  if (dn) {
    return /*#__PURE__*/_react2.default.createElement(SchemaSettingsProvider, _objectSpread({
      visible: visible,
      setVisible: setVisible,
      dn: dn
    }, others), DropdownMenu);
  }

  return DropdownMenu;
};

exports.SchemaSettings = SchemaSettings;

SchemaSettings.Template = function (props) {
  var componentName = props.componentName,
      collectionName = props.collectionName;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useSchemaSettings = useSchemaSettings(),
      dn = _useSchemaSettings.dn,
      setVisible = _useSchemaSettings.setVisible,
      template = _useSchemaSettings.template,
      fieldSchema = _useSchemaSettings.fieldSchema;

  var api = (0, _.useAPIClient)();

  var _useBlockTemplateCont = (0, _BlockTemplate.useBlockTemplateContext)(),
      tdn = _useBlockTemplateCont.dn;

  var _useSchemaTemplateMan2 = (0, _schemaTemplates.useSchemaTemplateManager)(),
      saveAsTemplate = _useSchemaTemplateMan2.saveAsTemplate,
      copyTemplateSchema = _useSchemaTemplateMan2.copyTemplateSchema;

  if (!collectionName) {
    return null;
  }

  if (template) {
    return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, {
      onClick: function () {
        var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var schema, removed;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return copyTemplateSchema(template);

                case 2:
                  schema = _context2.sent;
                  removed = tdn.removeWithoutEmit();
                  tdn.insertAfterEnd(schema, {
                    onSuccess: function onSuccess() {
                      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.next = 2;
                                return api.request({
                                  url: "/uiSchemas:remove/".concat(removed['x-uid'])
                                });

                              case 2:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }))();
                    }
                  });

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function onClick() {
          return _onClick.apply(this, arguments);
        }

        return onClick;
      }()
    }, t('Convert reference to duplicate'));
  }

  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, {
    onClick: function () {
      var _onClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var values, sdn, _yield$saveAsTemplate, key;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setVisible(false);
                _context3.next = 3;
                return (0, _antd.FormDialog)(t('Save as template'), function () {
                  return /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
                    components: {
                      Input: _antd.Input,
                      FormItem: _antd.FormItem
                    },
                    schema: {
                      type: 'object',
                      properties: {
                        name: {
                          title: t('Template name'),
                          required: true,
                          'x-decorator': 'FormItem',
                          'x-component': 'Input'
                        }
                      }
                    }
                  }));
                }).open({});

              case 3:
                values = _context3.sent;
                sdn = (0, _.createDesignable)({
                  t: t,
                  api: api,
                  refresh: dn.refresh.bind(dn),
                  current: fieldSchema.parent
                });
                sdn.loadAPIClientEvents();
                _context3.next = 8;
                return saveAsTemplate({
                  collectionName: collectionName,
                  componentName: componentName,
                  name: values.name,
                  uid: fieldSchema['x-uid']
                });

              case 8:
                _yield$saveAsTemplate = _context3.sent;
                key = _yield$saveAsTemplate.key;
                sdn.removeWithoutEmit(fieldSchema);
                sdn.insertBeforeEnd({
                  type: 'void',
                  'x-component': 'BlockTemplate',
                  'x-component-props': {
                    templateId: key
                  }
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function onClick() {
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }()
  }, t('Save as template'));
};

var findGridSchema = function findGridSchema(fieldSchema) {
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'FormV2') {
      var f = s.reduceProperties(function (buf, s) {
        if (s['x-component'] === 'Grid') {
          return s;
        }

        return buf;
      }, null);

      if (f) {
        return f;
      }
    }

    return buf;
  }, null);
};

var findBlockTemplateSchema = function findBlockTemplateSchema(fieldSchema) {
  return fieldSchema.reduceProperties(function (buf, s) {
    if (s['x-component'] === 'FormV2') {
      var f = s.reduceProperties(function (buf, s) {
        if (s['x-component'] === 'BlockTemplate') {
          return s;
        }

        return buf;
      }, null);

      if (f) {
        return f;
      }
    }

    return buf;
  }, null);
};

SchemaSettings.FormItemTemplate = function (props) {
  var _props$insertAdjacent = props.insertAdjacentPosition,
      insertAdjacentPosition = _props$insertAdjacent === void 0 ? 'afterBegin' : _props$insertAdjacent,
      componentName = props.componentName,
      collectionName = props.collectionName;

  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var _useSchemaSettings2 = useSchemaSettings(),
      dn = _useSchemaSettings2.dn,
      setVisible = _useSchemaSettings2.setVisible,
      template = _useSchemaSettings2.template,
      fieldSchema = _useSchemaSettings2.fieldSchema;

  var api = (0, _.useAPIClient)();

  var _useSchemaTemplateMan3 = (0, _schemaTemplates.useSchemaTemplateManager)(),
      saveAsTemplate = _useSchemaTemplateMan3.saveAsTemplate,
      copyTemplateSchema = _useSchemaTemplateMan3.copyTemplateSchema;

  if (!collectionName) {
    return null;
  }

  if (template) {
    return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, {
      onClick: function () {
        var _onClick3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var schema, templateSchema, sdn;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return copyTemplateSchema(template);

                case 2:
                  schema = _context5.sent;
                  templateSchema = findBlockTemplateSchema(fieldSchema);
                  sdn = (0, _.createDesignable)({
                    t: t,
                    api: api,
                    refresh: dn.refresh.bind(dn),
                    current: templateSchema.parent
                  });
                  sdn.loadAPIClientEvents();
                  sdn.removeWithoutEmit(templateSchema);
                  sdn.insertAdjacent(insertAdjacentPosition, schema, {
                    onSuccess: function onSuccess() {
                      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _context4.next = 2;
                                return api.request({
                                  url: "/uiSchemas:remove/".concat(templateSchema['x-uid'])
                                });

                              case 2:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _callee4);
                      }))();
                    }
                  });
                  fieldSchema['x-template-key'] = null;
                  _context5.next = 11;
                  return api.request({
                    url: "uiSchemas:patch",
                    method: 'post',
                    data: {
                      'x-uid': fieldSchema['x-uid'],
                      'x-template-key': null
                    }
                  });

                case 11:
                  dn.refresh();

                case 12:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function onClick() {
          return _onClick3.apply(this, arguments);
        }

        return onClick;
      }()
    }, t('Convert reference to duplicate'));
  }

  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, {
    onClick: function () {
      var _onClick4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var gridSchema, values, sdn, _yield$saveAsTemplate2, key;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                setVisible(false);
                gridSchema = findGridSchema(fieldSchema);
                console.log('gridSchema', gridSchema);
                _context6.next = 5;
                return (0, _antd.FormDialog)(t('Save as template'), function () {
                  return /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
                    components: {
                      Input: _antd.Input,
                      FormItem: _antd.FormItem
                    },
                    schema: {
                      type: 'object',
                      properties: {
                        name: {
                          title: t('Template name'),
                          required: true,
                          'x-decorator': 'FormItem',
                          'x-component': 'Input'
                        }
                      }
                    }
                  }));
                }).open({});

              case 5:
                values = _context6.sent;
                sdn = (0, _.createDesignable)({
                  t: t,
                  api: api,
                  refresh: dn.refresh.bind(dn),
                  current: gridSchema.parent
                });
                sdn.loadAPIClientEvents();
                _context6.next = 10;
                return saveAsTemplate({
                  collectionName: collectionName,
                  componentName: componentName,
                  name: values.name,
                  uid: gridSchema['x-uid']
                });

              case 10:
                _yield$saveAsTemplate2 = _context6.sent;
                key = _yield$saveAsTemplate2.key;
                sdn.removeWithoutEmit(gridSchema);
                sdn.insertAdjacent(insertAdjacentPosition, {
                  type: 'void',
                  'x-component': 'BlockTemplate',
                  'x-component-props': {
                    templateId: key
                  }
                });
                fieldSchema['x-template-key'] = key;
                _context6.next = 17;
                return api.request({
                  url: "uiSchemas:patch",
                  method: 'post',
                  data: {
                    'x-uid': fieldSchema['x-uid'],
                    'x-template-key': key
                  }
                });

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function onClick() {
        return _onClick4.apply(this, arguments);
      }

      return onClick;
    }()
  }, t('Save as template'));
};

SchemaSettings.Item = function (props) {
  var eventKey = props.eventKey;
  return /*#__PURE__*/_react2.default.createElement(_antd2.Menu.Item, _objectSpread(_objectSpread({
    key: eventKey,
    eventKey: eventKey
  }, props), {}, {
    onClick: function onClick(info) {
      var _props$onClick;

      info.domEvent.preventDefault();
      info.domEvent.stopPropagation();
      props === null || props === void 0 ? void 0 : (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props, info);
    },
    style: {
      minWidth: 120
    }
  }), props.children || props.title);
};

SchemaSettings.ItemGroup = function (props) {
  return /*#__PURE__*/_react2.default.createElement(_antd2.Menu.ItemGroup, _objectSpread({}, props));
};

SchemaSettings.SubMenu = function (props) {
  return /*#__PURE__*/_react2.default.createElement(_antd2.Menu.SubMenu, _objectSpread({}, props));
};

SchemaSettings.Divider = function (props) {
  return /*#__PURE__*/_react2.default.createElement(_antd2.Menu.Divider, _objectSpread({}, props));
};

SchemaSettings.Remove = function (props) {
  var confirm = props.confirm,
      removeParentsIfNoChildren = props.removeParentsIfNoChildren,
      breakRemoveOn = props.breakRemoveOn;

  var _useSchemaSettings3 = useSchemaSettings(),
      dn = _useSchemaSettings3.dn,
      template = _useSchemaSettings3.template;

  var _useTranslation3 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation3.t;

  var ctx = (0, _BlockTemplate.useBlockTemplateContext)();
  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, {
    onClick: function onClick() {
      _antd2.Modal.confirm(_objectSpread(_objectSpread({
        title: t('Delete block'),
        content: t('Are you sure you want to delete it?')
      }, confirm), {}, {
        onOk: function onOk() {
          var options = {
            removeParentsIfNoChildren: removeParentsIfNoChildren,
            breakRemoveOn: breakRemoveOn
          };

          if (template && (ctx === null || ctx === void 0 ? void 0 : ctx.dn)) {
            ctx === null || ctx === void 0 ? void 0 : ctx.dn.remove(null, options);
          } else {
            dn.remove(null, options);
          }
        }
      }));
    }
  }, t('Delete'));
};

SchemaSettings.SelectItem = function (props) {
  var title = props.title,
      options = props.options,
      value = props.value,
      onChange = props.onChange,
      others = _objectWithoutProperties(props, _excluded3);

  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, _objectSpread({}, others), /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, title, /*#__PURE__*/_react2.default.createElement(_antd2.Select, {
    bordered: false,
    defaultValue: value,
    onChange: onChange,
    options: options,
    style: {
      textAlign: 'right',
      minWidth: 100
    }
  })));
};

SchemaSettings.SwitchItem = function (props) {
  var title = props.title,
      onChange = props.onChange,
      others = _objectWithoutProperties(props, _excluded4);

  var _useState3 = (0, _react2.useState)(!!props.checked),
      _useState4 = _slicedToArray(_useState3, 2),
      checked = _useState4[0],
      setChecked = _useState4[1];

  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, _objectSpread(_objectSpread({}, others), {}, {
    onClick: function onClick() {
      onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
      setChecked(!checked);
    }
  }), /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, title, /*#__PURE__*/_react2.default.createElement(_antd2.Switch, {
    size: 'small',
    checked: checked,
    style: {
      marginLeft: 32
    }
  })));
};

SchemaSettings.PopupItem = function (props) {
  var schema = props.schema,
      others = _objectWithoutProperties(props, _excluded5);

  var _useState5 = (0, _react2.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      visible = _useState6[0],
      setVisible = _useState6[1];

  var ctx = (0, _react2.useContext)(SchemaSettingsContext);
  var actx = (0, _.useActionContext)();
  return /*#__PURE__*/_react2.default.createElement(_.ActionContext.Provider, {
    value: {
      visible: visible,
      setVisible: setVisible
    }
  }, /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, _objectSpread(_objectSpread({}, others), {}, {
    onClick: function onClick() {
      // actx.setVisible(false);
      ctx.setVisible(false);
      setVisible(true);
    }
  }), props.children || props.title), /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
    schema: _objectSpread({
      name: (0, _shared.uid)()
    }, schema)
  }));
};

SchemaSettings.ActionModalItem = /*#__PURE__*/_react2.default.memo(function (props) {
  var title = props.title,
      onSubmit = props.onSubmit,
      initialValues = props.initialValues,
      initialSchema = props.initialSchema,
      modalTip = props.modalTip,
      others = _objectWithoutProperties(props, _excluded6);

  var _useState7 = (0, _react2.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      visible = _useState8[0],
      setVisible = _useState8[1];

  var _useState9 = (0, _react2.useState)(props.uid),
      _useState10 = _slicedToArray(_useState9, 2),
      schemaUid = _useState10[0],
      setSchemaUid = _useState10[1];

  var _useTranslation4 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation4.t;

  var fieldSchema = (0, _react.useFieldSchema)();
  var ctx = (0, _react2.useContext)(SchemaSettingsContext);

  var _useSchemaSettings4 = useSchemaSettings(),
      dn = _useSchemaSettings4.dn;

  var compile = (0, _.useCompile)();
  var api = (0, _.useAPIClient)();
  var form = (0, _react2.useMemo)(function () {
    return (0, _core.createForm)({
      initialValues: (0, _lodash.cloneDeep)(initialValues)
    });
  }, []);

  var cancelHandler = function cancelHandler() {
    setVisible(false);
  };

  var submitHandler = function submitHandler() {
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit((0, _lodash.cloneDeep)(form.values));
    setVisible(false);
  };

  var openAssignedFieldValueHandler = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!schemaUid && initialSchema['x-uid'])) {
                _context7.next = 6;
                break;
              }

              fieldSchema['x-action-settings'].schemaUid = initialSchema['x-uid'];
              dn.emit('patch', {
                schema: fieldSchema
              });
              _context7.next = 5;
              return api.resource('uiSchemas').insert({
                values: initialSchema
              });

            case 5:
              setSchemaUid(initialSchema['x-uid']);

            case 6:
              ctx.setVisible(false);
              setVisible(true);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function openAssignedFieldValueHandler() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, _objectSpread(_objectSpread({}, others), {}, {
    onClick: openAssignedFieldValueHandler
  }), props.children || props.title), /*#__PURE__*/_react2.default.createElement(_antd2.Modal, _objectSpread(_objectSpread({
    width: '50%',
    title: compile(title)
  }, others), {}, {
    destroyOnClose: true,
    visible: visible,
    onCancel: cancelHandler,
    footer: /*#__PURE__*/_react2.default.createElement(_antd2.Space, null, /*#__PURE__*/_react2.default.createElement(_antd2.Button, {
      onClick: cancelHandler
    }, t('Cancel')), /*#__PURE__*/_react2.default.createElement(_antd2.Button, {
      type: "primary",
      onClick: submitHandler
    }, t('Submit')))
  }), /*#__PURE__*/_react2.default.createElement(_.FormProvider, {
    form: form
  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
    layout: 'vertical'
  }, modalTip && /*#__PURE__*/_react2.default.createElement(_antd2.Alert, {
    message: modalTip
  }), modalTip && /*#__PURE__*/_react2.default.createElement("br", null), visible && /*#__PURE__*/_react2.default.createElement(_.RemoteSchemaComponent, {
    noForm: true,
    uid: schemaUid
  })))));
});

SchemaSettings.ModalItem = function (props) {
  var hidden = props.hidden,
      title = props.title,
      components = props.components,
      scope = props.scope,
      effects = props.effects,
      schema = props.schema,
      onSubmit = props.onSubmit,
      initialValues = props.initialValues,
      others = _objectWithoutProperties(props, _excluded7);

  var options = (0, _react2.useContext)(_react.SchemaOptionsContext);

  if (hidden) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(SchemaSettings.Item, _objectSpread(_objectSpread({}, others), {}, {
    onClick: function onClick() {
      (0, _antd.FormDialog)(schema.title || title, function () {
        return /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
          scope: options.scope,
          components: options.components
        }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
          layout: 'vertical'
        }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
          components: components,
          scope: scope,
          schema: schema
        })));
      }).open({
        initialValues: initialValues,
        effects: effects
      }).then(function (values) {
        onSubmit(values);
      });
    }
  }), props.children || props.title);
};