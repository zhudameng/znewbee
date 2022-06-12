function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Schema, SchemaOptionsContext, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import { message } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient } from '../../api-client';
import { SchemaComponentContext } from '../context';
export function createDesignable(options) {
  return new Designable(options);
}

var generateUid = function generateUid(s) {
  if (!s['x-uid']) {
    s['x-uid'] = uid();
  }

  Object.keys(s.properties || {}).forEach(function (key) {
    generateUid(s.properties[key]);
  });
};

var defaultWrap = function defaultWrap(s) {
  return s;
};

var matchSchema = function matchSchema(source, target) {
  if (!source || !target) {
    return;
  }

  for (var key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      var value = target[key];

      if (value !== (source === null || source === void 0 ? void 0 : source[key])) {
        return false;
      }
    }
  }

  return true;
};

export var splitWrapSchema = function splitWrapSchema(wrapped, schema) {
  if (wrapped['x-uid'] && wrapped['x-uid'] === schema['x-uid']) {
    return [null, wrapped.toJSON()];
  }

  var wrappedJson = wrapped.toJSON();

  var schema1 = _objectSpread(_objectSpread({}, wrappedJson), {}, {
    properties: {}
  });

  var schema2 = null;

  var findSchema = function findSchema(properties, parent) {
    Object.keys(properties || {}).forEach(function (key) {
      var current = properties[key];

      if (current['x-uid'] === schema['x-uid']) {
        schema2 = properties[key];
        return;
      } else {
        parent.properties[key] = _objectSpread(_objectSpread({}, current), {}, {
          properties: {}
        });
        findSchema(current === null || current === void 0 ? void 0 : current.properties, parent.properties[key]);
      }
    });
  };

  findSchema(wrappedJson.properties, schema1);
  return [schema1, schema2];
};

var translate = function translate(v) {
  return v;
};

export var Designable = /*#__PURE__*/function () {
  function Designable(options) {
    _classCallCheck(this, Designable);

    this.current = void 0;
    this.options = void 0;
    this.events = {};
    this.options = options;
    this.current = options.current;
  }

  _createClass(Designable, [{
    key: "loadAPIClientEvents",
    value: function loadAPIClientEvents() {
      var _this$options = this.options,
          refresh = _this$options.refresh,
          api = _this$options.api,
          _this$options$t = _this$options.t,
          t = _this$options$t === void 0 ? translate : _this$options$t;

      if (!api) {
        return;
      }

      this.on('insertAdjacent', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
          var onSuccess, current, position, schema, wrap, removed;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  onSuccess = _ref.onSuccess, current = _ref.current, position = _ref.position, schema = _ref.schema, wrap = _ref.wrap, removed = _ref.removed;
                  refresh();

                  if (current['x-uid']) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  _context.next = 6;
                  return api.request({
                    url: "/uiSchemas:insertAdjacent/".concat(current['x-uid'], "?position=").concat(position),
                    method: 'post',
                    data: {
                      schema: schema,
                      wrap: wrap
                    }
                  });

                case 6:
                  if (!(removed === null || removed === void 0 ? void 0 : removed['x-uid'])) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 9;
                  return api.request({
                    url: "/uiSchemas:remove/".concat(removed['x-uid']),
                    method: 'post'
                  });

                case 9:
                  onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                  message.success(t('Saved successfully'), 0.2);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      this.on('patch', /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
          var schema;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  schema = _ref3.schema;
                  refresh();

                  if (schema === null || schema === void 0 ? void 0 : schema['x-uid']) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt("return");

                case 4:
                  _context2.next = 6;
                  return api.request({
                    url: "/uiSchemas:patch",
                    method: 'post',
                    data: _objectSpread({}, schema)
                  });

                case 6:
                  message.success(t('Saved successfully'), 0.2);

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }());
      this.on('remove', /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
          var removed;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  removed = _ref5.removed;
                  refresh();

                  if (removed === null || removed === void 0 ? void 0 : removed['x-uid']) {
                    _context3.next = 4;
                    break;
                  }

                  return _context3.abrupt("return");

                case 4:
                  _context3.next = 6;
                  return api.request({
                    url: "/uiSchemas:remove/".concat(removed['x-uid']),
                    method: 'post'
                  });

                case 6:
                  message.success(t('Saved successfully'), 0.2);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "prepareProperty",
    value: function prepareProperty(schema) {
      if (!schema.type) {
        schema.type = 'void';
      }

      if (!schema.name) {
        schema.name = uid();
      } // x-uid 仅用于后端查询 schema，如果 current 没有 x-uid 不处理


      if (!this.current['x-uid']) {
        return;
      } // if (Schema.isSchemaInstance(schema)) {
      //   return;
      // }


      generateUid(schema);
    }
  }, {
    key: "on",
    value: function on(name, listener) {
      if (!this.events[name]) {
        this.events[name] = [];
      }

      this.events[name].push(listener);
    }
  }, {
    key: "emit",
    value: function emit(name) {
      var _this = this;

      if (!this.events[name]) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var opts = args[0],
          others = args.slice(1);
      this.events[name].forEach(function (fn) {
        return fn.bind(_this).apply(void 0, [_objectSpread({
          current: _this.current
        }, opts)].concat(_toConsumableArray(others)));
      });
    }
  }, {
    key: "parentsIn",
    value: function parentsIn(schema) {
      if (!schema) {
        return false;
      }

      if (!Schema.isSchemaInstance(schema)) {
        return false;
      }

      var s = this.current;

      while ((_s = s) === null || _s === void 0 ? void 0 : _s.parent) {
        var _s;

        if (s.parent === schema) {
          return true;
        }

        s = s.parent;
      }

      return false;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var refresh = this.options.refresh;
      return refresh === null || refresh === void 0 ? void 0 : refresh();
    }
  }, {
    key: "insertAdjacent",
    value: function insertAdjacent(position, schema) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      switch (position) {
        case 'beforeBegin':
          return this.insertBeforeBegin(schema, options);

        case 'afterBegin':
          return this.insertAfterBegin(schema, options);

        case 'beforeEnd':
          return this.insertBeforeEnd(schema, options);

        case 'afterEnd':
          return this.insertAfterEnd(schema, options);
      }
    }
  }, {
    key: "recursiveRemoveIfNoChildren",
    value: function recursiveRemoveIfNoChildren(schema, options) {
      if (!schema) {
        return;
      }

      var s = schema;
      var removed;
      var breakRemoveOn = options === null || options === void 0 ? void 0 : options.breakRemoveOn;

      while (s) {
        if (typeof breakRemoveOn === 'function') {
          if (breakRemoveOn(s)) {
            break;
          }
        } else {
          if (matchSchema(s, breakRemoveOn)) {
            break;
          }
        }

        var count = Object.keys(s.properties || {}).length;

        if (count > 0) {
          break;
        }

        if (s.parent) {
          removed = s.parent.removeProperty(s.name);
        }

        s = s.parent;
      }

      return removed;
    }
  }, {
    key: "remove",
    value: function remove(schema) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;
      var s = schema || this.current;
      var removed = s.parent.removeProperty(s.name);

      if (removeParentsIfNoChildren) {
        var parent = this.recursiveRemoveIfNoChildren(s.parent, {
          breakRemoveOn: breakRemoveOn
        });

        if (parent) {
          removed = parent;
        }
      }

      this.emit('remove', {
        removed: removed
      });
    }
  }, {
    key: "removeWithoutEmit",
    value: function removeWithoutEmit(schema) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;
      var s = schema || this.current;
      var removed = s.parent.removeProperty(s.name);

      if (removeParentsIfNoChildren) {
        var parent = this.recursiveRemoveIfNoChildren(s.parent, {
          breakRemoveOn: breakRemoveOn
        });

        if (parent) {
          removed = parent;
        }
      }

      return removed;
    }
  }, {
    key: "insertBeforeBeginOrAfterEnd",
    value: function insertBeforeBeginOrAfterEnd(schema) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Schema.isSchemaInstance(this.current)) {
        return;
      }

      if (!Schema.isSchemaInstance(schema)) {
        return;
      }

      if (this.current.parent !== schema.parent) {
        return;
      }

      var fromIndex = 0;
      var toIndex = 0;
      this.current.parent.mapProperties(function (property, key, index) {
        if (_this2.current.name === key) {
          toIndex = index;
        }

        if (schema.name === key) {
          fromIndex = index;
        }
      });
      return fromIndex > toIndex ? this.insertBeforeBegin(schema, options) : this.insertAfterEnd(schema, options);
    }
    /**
     * Before the current schema itself.
     */

  }, {
    key: "insertBeforeBegin",
    value: function insertBeforeBegin(schema) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Schema.isSchemaInstance(this.current)) {
        return;
      }

      var opts = {
        onSuccess: options.onSuccess
      };
      var _options$wrap = options.wrap,
          wrap = _options$wrap === void 0 ? defaultWrap : _options$wrap,
          breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;

      if (Schema.isSchemaInstance(schema)) {
        if (this.parentsIn(schema)) {
          this.emit('error', {
            code: 'parent_is_not_allowed',
            schema: schema
          });
          return;
        }

        schema.parent.removeProperty(schema.name);

        if (removeParentsIfNoChildren) {
          opts['removed'] = this.recursiveRemoveIfNoChildren(schema.parent, {
            breakRemoveOn: breakRemoveOn
          });
        }
      } else if (schema) {
        schema = cloneDeep(schema);
      }

      var properties = {};
      var start = false;
      var order = 0;
      var newOrder = 0;
      this.current.parent.mapProperties(function (property, key) {
        if (key === _this3.current.name) {
          newOrder = order;
          start = true;
          ++order;
        }

        property['x-index'] = order;
        ++order;

        if (start) {
          properties[key] = property;

          _this3.current.parent.removeProperty(key);
        }
      });
      this.prepareProperty(schema);
      var wrapped = wrap(schema);
      var s = this.current.parent.addProperty(wrapped.name || uid(), wrapped);
      s['x-index'] = newOrder;
      s.parent = this.current.parent;
      this.current.parent.setProperties(properties);

      var _splitWrapSchema = splitWrapSchema(s, schema),
          _splitWrapSchema2 = _slicedToArray(_splitWrapSchema, 2),
          schema1 = _splitWrapSchema2[0],
          schema2 = _splitWrapSchema2[1];

      this.emit('insertAdjacent', _objectSpread({
        position: 'beforeBegin',
        schema: schema2,
        wrap: schema1
      }, opts));
    }
    /**
     * Just inside the current schema, before its first child.
     *
     * @param schema
     * @returns
     */

  }, {
    key: "insertAfterBegin",
    value: function insertAfterBegin(schema) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Schema.isSchemaInstance(this.current)) {
        return;
      }

      var opts = {
        onSuccess: options.onSuccess
      };
      var _options$wrap2 = options.wrap,
          wrap = _options$wrap2 === void 0 ? defaultWrap : _options$wrap2,
          breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;

      if (Schema.isSchemaInstance(schema)) {
        if (this.parentsIn(schema)) {
          this.emit('error', {
            code: 'parent_is_not_allowed',
            schema: schema
          });
          return;
        }

        schema.parent.removeProperty(schema.name);

        if (removeParentsIfNoChildren) {
          opts['removed'] = this.recursiveRemoveIfNoChildren(schema.parent, {
            breakRemoveOn: breakRemoveOn
          });
        }
      } else if (schema) {
        schema = cloneDeep(schema);
      }

      var properties = {};
      var order = 1;
      this.current.mapProperties(function (s, key) {
        s['x-index'] = order;
        ++order;
        properties[key] = s;
      });
      this.current.properties = {};
      this.prepareProperty(schema);
      var wrapped = wrap(schema);
      var s = this.current.addProperty(wrapped.name || uid(), wrapped);
      s['x-index'] = 0;
      s.parent = this.current;
      this.current.setProperties(properties);

      var _splitWrapSchema3 = splitWrapSchema(s, schema),
          _splitWrapSchema4 = _slicedToArray(_splitWrapSchema3, 2),
          schema1 = _splitWrapSchema4[0],
          schema2 = _splitWrapSchema4[1];

      this.emit('insertAdjacent', _objectSpread({
        position: 'afterBegin',
        schema: schema2,
        wrap: schema1
      }, opts));
    }
    /**
     * Just inside the targetElement, after its last child.
     *
     * @param schema
     * @returns
     */

  }, {
    key: "insertBeforeEnd",
    value: function insertBeforeEnd(schema) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Schema.isSchemaInstance(this.current)) {
        return;
      }

      var opts = {
        onSuccess: options.onSuccess
      };
      var _options$wrap3 = options.wrap,
          wrap = _options$wrap3 === void 0 ? defaultWrap : _options$wrap3,
          breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;

      if (Schema.isSchemaInstance(schema)) {
        if (this.parentsIn(schema)) {
          this.emit('error', {
            code: 'parent_is_not_allowed',
            schema: schema
          });
          return;
        }

        schema.parent.removeProperty(schema.name);

        if (removeParentsIfNoChildren) {
          opts['removed'] = this.recursiveRemoveIfNoChildren(schema.parent, {
            breakRemoveOn: breakRemoveOn
          });
        }
      } else if (schema) {
        schema = cloneDeep(schema);
      }

      this.prepareProperty(schema);
      var wrapped = wrap(schema);
      var s = this.current.addProperty(wrapped.name || uid(), wrapped);
      s.parent = this.current;

      var _splitWrapSchema5 = splitWrapSchema(s, schema),
          _splitWrapSchema6 = _slicedToArray(_splitWrapSchema5, 2),
          schema1 = _splitWrapSchema6[0],
          schema2 = _splitWrapSchema6[1];

      this.emit('insertAdjacent', _objectSpread({
        position: 'beforeEnd',
        schema: schema2,
        wrap: schema1
      }, opts));
    }
    /**
     * After the current schema itself.
     */

  }, {
    key: "insertAfterEnd",
    value: function insertAfterEnd(schema) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Schema.isSchemaInstance(this.current)) {
        return;
      }

      var opts = {
        onSuccess: options === null || options === void 0 ? void 0 : options.onSuccess
      };
      var _options$wrap4 = options.wrap,
          wrap = _options$wrap4 === void 0 ? defaultWrap : _options$wrap4,
          breakRemoveOn = options.breakRemoveOn,
          removeParentsIfNoChildren = options.removeParentsIfNoChildren;

      if (Schema.isSchemaInstance(schema)) {
        if (this.parentsIn(schema)) {
          this.emit('error', {
            code: 'parent_is_not_allowed',
            schema: schema
          });
          return;
        }

        schema.parent.removeProperty(schema.name);

        if (removeParentsIfNoChildren) {
          opts['removed'] = this.recursiveRemoveIfNoChildren(schema.parent, {
            breakRemoveOn: breakRemoveOn
          });
        }

        schema.parent = null;
      } else if (schema) {
        schema = cloneDeep(schema);
      }

      var order = 0;
      var newOrder = 0;
      var start = false;
      var properties = {};
      this.current.parent.mapProperties(function (property, key) {
        property['x-index'] = order;

        if (key === _this4.current.name) {
          ++order;
          newOrder = order;
          start = true;
        }

        ++order;

        if (start && key !== _this4.current.name) {
          properties[key] = property;

          _this4.current.parent.removeProperty(key);
        }
      });
      this.prepareProperty(schema);
      var wrapped = wrap(schema);
      var s = this.current.parent.addProperty(wrapped.name || uid(), wrapped);
      s.parent = this.current.parent;
      s['x-index'] = newOrder;
      this.current.parent.setProperties(properties);

      var _splitWrapSchema7 = splitWrapSchema(s, schema),
          _splitWrapSchema8 = _slicedToArray(_splitWrapSchema7, 2),
          schema1 = _splitWrapSchema8[0],
          schema2 = _splitWrapSchema8[1];

      this.emit('insertAdjacent', _objectSpread({
        position: 'afterEnd',
        schema: schema2,
        wrap: schema1
      }, opts));
    }
  }]);

  return Designable;
}(); // TODO

export function useDesignable() {
  var _useContext = useContext(SchemaComponentContext),
      designable = _useContext.designable,
      setDesignable = _useContext.setDesignable,
      refresh = _useContext.refresh,
      reset = _useContext.reset;

  var _useContext2 = useContext(SchemaOptionsContext),
      components = _useContext2.components;

  var DesignableBar = function DesignableBar() {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  };

  var field = useField();
  var fieldSchema = useFieldSchema();
  var api = useAPIClient();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var dn = createDesignable({
    t: t,
    api: api,
    refresh: refresh,
    current: fieldSchema
  });
  dn.loadAPIClientEvents();
  return {
    dn: dn,
    designable: designable,
    reset: reset,
    refresh: refresh,
    setDesignable: setDesignable,
    DesignableBar: DesignableBar,
    findComponent: function findComponent(component) {
      if (!component) {
        return null;
      }

      if (typeof component !== 'string') {
        return component;
      }

      return get(components, component);
    },
    on: dn.on.bind(dn),
    // TODO
    patch: function patch(key, value) {
      var update = function update(obj) {
        Object.keys(obj).forEach(function (k) {
          var val = obj[k];

          if (k === 'title') {
            field.title = val;
            fieldSchema['title'] = val;
          }

          if (k === 'x-component-props') {
            Object.keys(val).forEach(function (i) {
              field.componentProps[i] = val[i];
              fieldSchema['x-component-props'][i] = val[i];
            });
          }
        });
      };

      if (typeof key === 'string') {
        var obj = {};
        set(obj, key, value);
        return update(obj);
      }

      update(key);
      refresh();
    },
    remove: function remove(schema, options) {
      dn.remove(schema, options);
    },
    insertAdjacent: function insertAdjacent(position, schema, options) {
      dn.insertAdjacent(position, schema, options);
    },
    insertBeforeBegin: function insertBeforeBegin(schema) {
      dn.insertBeforeBegin(schema);
    },
    insertAfterBegin: function insertAfterBegin(schema) {
      dn.insertAfterBegin(schema);
    },
    insertBeforeEnd: function insertBeforeEnd(schema) {
      dn.insertBeforeEnd(schema);
    },
    insertAfterEnd: function insertAfterEnd(schema) {
      dn.insertAfterEnd(schema);
    }
  };
}