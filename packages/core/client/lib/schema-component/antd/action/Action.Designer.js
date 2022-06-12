"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionDesigner = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _utils = require("@znewbee/utils");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../..");

var _schemaSettings = require("../../../schema-settings");

var _excluded = ["modalTip"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MenuGroup = function MenuGroup(props) {
  var fieldSchema = (0, _react.useFieldSchema)();
  var actionType = fieldSchema['x-action'] || '';

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var actionTitles = {
    'customize:popup': t('Popup'),
    'customize:update': t('Update record'),
    'customize:save': t('Save record')
  };

  if (!['customize:popup', 'customize:update', 'customize:save'].includes(actionType)) {
    return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, props.children);
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Menu.ItemGroup, {
    title: "".concat(t('Customize'), " > ").concat(actionTitles[actionType])
  }, props.children);
};

var ActionDesigner = function ActionDesigner(props) {
  var _fieldSchema$xCompon, _fieldSchema$xCompon2, _fieldSchema$xCompon3, _fieldSchema$xCompon4, _fieldSchema$xAction, _fieldSchema$xAction2, _fieldSchema$xAction3, _fieldSchema$xAction4, _fieldSchema$xAction5, _fieldSchema$xAction6, _fieldSchema$xAction7;

  var modalTip = props.modalTip,
      restProps = _objectWithoutProperties(props, _excluded);

  var field = (0, _react.useField)();
  var fieldSchema = (0, _react.useFieldSchema)();

  var _useDesignable = (0, _.useDesignable)(),
      dn = _useDesignable.dn;

  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var compile = (0, _.useCompile)();
  var isPopupAction = ['create', 'update', 'view', 'customize:popup'].includes(fieldSchema['x-action'] || '');
  var context = (0, _.useActionContext)();

  var _useState = (0, _react2.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      initialSchema = _useState2[0],
      setInitialSchema = _useState2[1];

  var actionType = fieldSchema['x-action'] || '';
  (0, _react2.useEffect)(function () {
    var schemaUid = (0, _utils.uid)();
    var schema = {
      type: 'void',
      'x-uid': schemaUid,
      'x-component': 'Grid',
      'x-initializer': 'CustomFormItemInitializers'
    };
    setInitialSchema(schema);
  }, [field.address]);
  var tips = {
    'customize:update': t('After clicking the custom button, the following fields of the current record will be saved according to the following form.'),
    'customize:save': t('After clicking the custom button, the following fields of the current record will be saved according to the following form.')
  };
  return /*#__PURE__*/_react2.default.createElement(_schemaSettings.GeneralSchemaDesigner, _objectSpread(_objectSpread({}, restProps), {}, {
    disableInitializer: true
  }), /*#__PURE__*/_react2.default.createElement(MenuGroup, null, /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: t('Edit button'),
    schema: {
      type: 'object',
      title: t('Edit button'),
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: t('Button title'),
          default: fieldSchema.title,
          'x-component-props': {} // description: `原字段标题：${collectionField?.uiSchema?.title}`,

        },
        icon: {
          'x-decorator': 'FormItem',
          'x-component': 'IconPicker',
          title: t('Button icon'),
          default: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon.icon,
          'x-component-props': {} // description: `原字段标题：${collectionField?.uiSchema?.title}`,

        },
        type: {
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          title: t('Button background color'),
          default: (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon2 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon2 === void 0 ? void 0 : _fieldSchema$xCompon2.danger) ? 'danger' : (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon3 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon3 === void 0 ? void 0 : _fieldSchema$xCompon3.type) === 'primary' ? 'primary' : 'default',
          enum: [{
            value: 'default',
            label: '{{t("Default")}}'
          }, {
            value: 'primary',
            label: '{{t("Highlight")}}'
          }, {
            value: 'danger',
            label: '{{t("Danger red")}}'
          }]
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title,
          icon = _ref.icon,
          type = _ref.type;

      if (title) {
        var _schema;

        fieldSchema.title = title;
        field.title = title;
        field.componentProps.icon = icon;
        field.componentProps.danger = type === 'danger';
        field.componentProps.type = type;
        fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
        fieldSchema['x-component-props'].icon = icon;
        fieldSchema['x-component-props'].danger = type === 'danger';
        fieldSchema['x-component-props'].type = type;
        dn.emit('patch', {
          schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, "title", title), _defineProperty(_schema, 'x-component-props', _objectSpread({}, fieldSchema['x-component-props'])), _schema)
        });
        dn.refresh();
      }
    }
  }), isPopupAction && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SelectItem, {
    title: t('Open mode'),
    options: [{
      label: t('Drawer'),
      value: 'drawer'
    }, {
      label: t('Dialog'),
      value: 'modal'
    }],
    value: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon4 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon4 === void 0 ? void 0 : _fieldSchema$xCompon4['openMode'],
    onChange: function onChange(value) {
      field.componentProps.openMode = value;
      fieldSchema['x-component-props']['openMode'] = value;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          'x-component-props': fieldSchema['x-component-props']
        }
      });
      dn.refresh();
    }
  }), (0, _shared.isValid)(fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction === void 0 ? void 0 : _fieldSchema$xAction.assignedValues) && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ActionModalItem, {
    title: t('Assign field values'),
    initialSchema: initialSchema,
    initialValues: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction2 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction2 === void 0 ? void 0 : _fieldSchema$xAction2.assignedValues,
    modalTip: tips[actionType],
    uid: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction3 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction3 === void 0 ? void 0 : _fieldSchema$xAction3.schemaUid,
    onSubmit: function onSubmit(assignedValues) {
      var _schema2;

      fieldSchema['x-action-settings']['assignedValues'] = assignedValues;
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-action-settings', fieldSchema['x-action-settings']), _schema2)
      });
      dn.refresh();
    }
  }), (0, _shared.isValid)(fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction4 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction4 === void 0 ? void 0 : _fieldSchema$xAction4.skipValidator) && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.SwitchItem, {
    title: t('Skip required validation'),
    checked: !!(fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction5 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction5 === void 0 ? void 0 : _fieldSchema$xAction5.skipValidator),
    onChange: function onChange(value) {
      var _schema3;

      fieldSchema['x-action-settings'].skipValidator = value;
      dn.emit('patch', {
        schema: (_schema3 = {}, _defineProperty(_schema3, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema3, 'x-action-settings', _objectSpread({}, fieldSchema['x-action-settings'])), _schema3)
      });
    }
  }), (0, _shared.isValid)(fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction6 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction6 === void 0 ? void 0 : _fieldSchema$xAction6['onSuccess']) && /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.ModalItem, {
    title: {
      'customize:save': t('After successful save'),
      'customize:update': t('After successful update')
    }[actionType],
    initialValues: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xAction7 = fieldSchema['x-action-settings']) === null || _fieldSchema$xAction7 === void 0 ? void 0 : _fieldSchema$xAction7['onSuccess'],
    schema: {
      type: 'object',
      title: {
        'customize:save': t('After successful save'),
        'customize:update': t('After successful update')
      }[actionType],
      properties: {
        successMessage: {
          title: t('Popup message'),
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {}
        },
        manualClose: {
          title: t('Popup close method'),
          default: false,
          enum: [{
            label: t('Automatic close'),
            value: false
          }, {
            label: t('Manually close'),
            value: true
          }],
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {}
        },
        redirecting: {
          title: t('Then'),
          default: false,
          enum: [{
            label: t('Stay on current page'),
            value: false
          }, {
            label: t('Redirect to'),
            value: true
          }],
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {},
          'x-reactions': {
            target: 'redirectTo',
            fulfill: {
              state: {
                visible: '{{!!$self.value}}'
              }
            }
          }
        },
        redirectTo: {
          title: t('Link'),
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(onSuccess) {
      var _schema4;

      fieldSchema['x-action-settings']['onSuccess'] = onSuccess;
      dn.emit('patch', {
        schema: (_schema4 = {}, _defineProperty(_schema4, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema4, 'x-action-settings', fieldSchema['x-action-settings']), _schema4)
      });
    }
  }), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Divider, null), /*#__PURE__*/_react2.default.createElement(_schemaSettings.SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: function breakRemoveOn(s) {
      return s['x-component'] === 'Space' || s['x-component'].endsWith('ActionBar');
    },
    confirm: {
      title: t('Delete action')
    }
  })));
};

exports.ActionDesigner = ActionDesigner;
