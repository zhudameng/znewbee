"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageMenuItem = exports.MenuItemInitializers = exports.LinkMenuItem = exports.GroupItem = void 0;

var _antd = require("@formily/antd");

var _react = require("@formily/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _ = require("../../..");

var _schemaInitializer = require("../../../../schema-initializer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuItemInitializers = function MenuItemInitializers(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react2.default.createElement(_schemaInitializer.SchemaInitializer.Button, _objectSpread(_objectSpread({
    insertPosition: 'beforeEnd',
    icon: 'PlusOutlined',
    insert: props.insert,
    style: props.style
  }, props), {}, {
    items: [{
      type: 'item',
      title: t('Group'),
      component: GroupItem
    }, {
      type: 'item',
      title: t('Page'),
      component: PageMenuItem
    }, {
      type: 'item',
      title: t('Link'),
      component: LinkMenuItem
    }]
  }), t('Add menu item'));
};

exports.MenuItemInitializers = MenuItemInitializers;
var itemWrap = _schemaInitializer.SchemaInitializer.itemWrap;
var GroupItem = itemWrap(function (props) {
  var insert = props.insert;

  var _useTranslation2 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation2.t;

  var options = (0, _react2.useContext)(_react.SchemaOptionsContext);
  return /*#__PURE__*/_react2.default.createElement(_schemaInitializer.SchemaInitializer.Item, _objectSpread(_objectSpread({
    style: {
      background: 'red'
    }
  }, props), {}, {
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var values, title, icon;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _antd.FormDialog)(t('Add group'), function () {
                  return /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread({}, options.components)
                  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
                    schema: {
                      properties: {
                        title: {
                          title: t('Menu item title'),
                          'x-component': 'Input',
                          'x-decorator': 'FormItem',
                          required: true
                        },
                        icon: {
                          title: t('Icon'),
                          'x-component': 'IconPicker',
                          'x-decorator': 'FormItem'
                        }
                      }
                    }
                  })));
                }).open({
                  initialValues: {}
                });

              case 2:
                values = _context.sent;
                title = values.title, icon = values.icon;
                insert({
                  type: 'void',
                  title: title,
                  'x-component': 'Menu.SubMenu',
                  'x-decorator': 'ACLMenuItemProvider',
                  'x-component-props': {
                    icon: icon
                  },
                  'x-server-hooks': [{
                    type: 'onSelfCreate',
                    method: 'bindMenuToRole'
                  }]
                });

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
  }));
});
exports.GroupItem = GroupItem;
var PageMenuItem = itemWrap(function (props) {
  var insert = props.insert;

  var _useTranslation3 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation3.t;

  var options = (0, _react2.useContext)(_react.SchemaOptionsContext);
  return /*#__PURE__*/_react2.default.createElement(_schemaInitializer.SchemaInitializer.Item, _objectSpread(_objectSpread({}, props), {}, {
    onClick: function () {
      var _onClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var values, title, icon;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _antd.FormDialog)(t('Add page'), function () {
                  return /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread({}, options.components)
                  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
                    layout: 'vertical',
                    style: {
                      background: "red"
                    }
                  }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
                    schema: {
                      properties: {
                        title: {
                          title: t('Menu item title'),
                          required: true,
                          'x-component': 'Input',
                          'x-decorator': 'FormItem'
                        },
                        icon: {
                          title: t('Icon'),
                          'x-component': 'IconPicker',
                          'x-decorator': 'FormItem'
                        }
                      }
                    }
                  })));
                }).open({
                  initialValues: {}
                });

              case 2:
                values = _context2.sent;
                title = values.title, icon = values.icon;
                insert({
                  type: 'void',
                  title: title,
                  'x-component': 'Menu.Item',
                  'x-decorator': 'ACLMenuItemProvider',
                  'x-component-props': {
                    icon: icon
                  },
                  'x-server-hooks': [{
                    type: 'onSelfCreate',
                    method: 'bindMenuToRole'
                  }],
                  properties: {
                    page: {
                      type: 'void',
                      'x-component': 'Page',
                      'x-async': true,
                      properties: {
                        grid: {
                          type: 'void',
                          'x-component': 'Grid',
                          'x-initializer': 'BlockInitializers',
                          properties: {}
                        }
                      }
                    }
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
        return _onClick2.apply(this, arguments);
      }

      return onClick;
    }()
  }));
});
exports.PageMenuItem = PageMenuItem;
var LinkMenuItem = itemWrap(function (props) {
  var insert = props.insert;

  var _useTranslation4 = (0, _reactI18next.useTranslation)(),
      t = _useTranslation4.t;

  var options = (0, _react2.useContext)(_react.SchemaOptionsContext);
  return /*#__PURE__*/_react2.default.createElement(_schemaInitializer.SchemaInitializer.Item, _objectSpread(_objectSpread({}, props), {}, {
    onClick: function () {
      var _onClick3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var values, title, href, icon;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _antd.FormDialog)(t('Add link'), function () {
                  return /*#__PURE__*/_react2.default.createElement(_.SchemaComponentOptions, {
                    scope: options.scope,
                    components: _objectSpread({}, options.components)
                  }, /*#__PURE__*/_react2.default.createElement(_antd.FormLayout, {
                    layout: 'vertical'
                  }, /*#__PURE__*/_react2.default.createElement(_.SchemaComponent, {
                    schema: {
                      properties: {
                        title: {
                          title: t('Menu item title'),
                          required: true,
                          'x-component': 'Input',
                          'x-decorator': 'FormItem'
                        },
                        icon: {
                          title: t('Icon'),
                          'x-component': 'IconPicker',
                          'x-decorator': 'FormItem'
                        },
                        href: {
                          title: t('Link'),
                          'x-component': 'Input',
                          'x-decorator': 'FormItem'
                        }
                      }
                    }
                  })));
                }).open({
                  initialValues: {}
                });

              case 2:
                values = _context3.sent;
                title = values.title, href = values.href, icon = values.icon;
                insert({
                  type: 'void',
                  title: title,
                  'x-component': 'Menu.URL',
                  'x-decorator': 'ACLMenuItemProvider',
                  'x-component-props': {
                    icon: icon,
                    href: href
                  },
                  'x-server-hooks': [{
                    type: 'onSelfCreate',
                    method: 'bindMenuToRole'
                  }]
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function onClick() {
        return _onClick3.apply(this, arguments);
      }

      return onClick;
    }()
  }));
});
exports.LinkMenuItem = LinkMenuItem;