var _excluded = ["routes"];

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import { Spin } from 'antd';
import { cloneDeep } from 'lodash';
import React, { createContext, useContext, useMemo } from 'react';
import { useAPIClient, useRequest } from '../api-client';
import { RouteSwitchContext } from '../route-switch';
import { SchemaComponentOptions } from '../schema-component';
import { BlockTemplate } from './BlockTemplate';
export var SchemaTemplateManagerContext = /*#__PURE__*/createContext({});

var SchemaTemplateRouteProvider = function SchemaTemplateRouteProvider(props) {
  var _useContext = useContext(RouteSwitchContext),
      routes = _useContext.routes,
      others = _objectWithoutProperties(_useContext, _excluded);

  routes[1].routes.unshift({
    type: 'route',
    path: '/admin/plugins/block-templates/:key',
    component: 'BlockTemplateDetails'
  }, {
    type: 'route',
    path: '/admin/plugins/block-templates',
    component: 'BlockTemplatePage'
  });
  return /*#__PURE__*/React.createElement(RouteSwitchContext.Provider, {
    value: _objectSpread(_objectSpread({}, others), {}, {
      routes: routes
    })
  }, props.children);
};

export var SchemaTemplateManagerProvider = function SchemaTemplateManagerProvider(props) {
  var templates = props.templates,
      refresh = props.refresh;
  return /*#__PURE__*/React.createElement(SchemaTemplateManagerContext.Provider, {
    value: {
      templates: templates,
      refresh: refresh
    }
  }, /*#__PURE__*/React.createElement(SchemaTemplateRouteProvider, null, /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: {
      BlockTemplate: BlockTemplate
    }
  }, props.children)));
};

var regenerateUid = function regenerateUid(s) {
  s['x-uid'] = uid();
  Object.keys(s.properties || {}).forEach(function (key) {
    regenerateUid(s.properties[key]);
  });
};

export var useSchemaTemplate = function useSchemaTemplate() {
  var _useSchemaTemplateMan = useSchemaTemplateManager(),
      getTemplateBySchema = _useSchemaTemplateMan.getTemplateBySchema,
      templates = _useSchemaTemplateMan.templates;

  var fieldSchema = useFieldSchema();
  var schemaId = fieldSchema['x-uid'];
  var templateKey = fieldSchema['x-template-key'];
  console.log('templateKey', {
    schemaId: schemaId,
    templateKey: templateKey
  });
  return useMemo(function () {
    return getTemplateBySchema(fieldSchema);
  }, [schemaId, templateKey]);
};
export var useSchemaTemplateManager = function useSchemaTemplateManager() {
  var _useContext2 = useContext(SchemaTemplateManagerContext),
      refresh = _useContext2.refresh,
      _useContext2$template = _useContext2.templates,
      templates = _useContext2$template === void 0 ? [] : _useContext2$template;

  var api = useAPIClient();
  return {
    templates: templates,
    refresh: refresh,
    getTemplateSchemaByMode: function getTemplateSchemaByMode(options) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var mode, template, _yield$api$request, data, s;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mode = options.mode, template = options.template;

                if (!(mode === 'copy')) {
                  _context.next = 11;
                  break;
                }

                _context.next = 4;
                return api.request({
                  url: "/uiSchemas:getJsonSchema/".concat(template.uid, "?includeAsyncNode=true")
                });

              case 4:
                _yield$api$request = _context.sent;
                data = _yield$api$request.data;
                s = (data === null || data === void 0 ? void 0 : data.data) || {};
                regenerateUid(s);
                return _context.abrupt("return", cloneDeep(s));

              case 11:
                if (!(mode === 'reference')) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  type: 'void',
                  'x-component': 'BlockTemplate',
                  'x-component-props': {
                    templateId: template.key
                  }
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    copyTemplateSchema: function copyTemplateSchema(template) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$api$request2, data, s;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return api.request({
                  url: "/uiSchemas:getJsonSchema/".concat(template.uid, "?includeAsyncNode=true")
                });

              case 2:
                _yield$api$request2 = _context2.sent;
                data = _yield$api$request2.data;
                s = (data === null || data === void 0 ? void 0 : data.data) || {};
                regenerateUid(s);
                return _context2.abrupt("return", cloneDeep(s));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    saveAsTemplate: function saveAsTemplate(values) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var schemaId, key;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                schemaId = values.uid;
                key = uid();
                _context3.next = 4;
                return api.resource('uiSchemas').saveAsTemplate({
                  filterByTk: schemaId,
                  values: _objectSpread({
                    key: key
                  }, values)
                });

              case 4:
                _context3.next = 6;
                return refresh();

              case 6:
                return _context3.abrupt("return", {
                  key: key
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getTemplateBySchema: function getTemplateBySchema(schema) {
      var templateKey = schema['x-template-key'];

      if (templateKey) {
        return templates === null || templates === void 0 ? void 0 : templates.find(function (template) {
          return template.key === templateKey;
        });
      }

      var schemaId = schema['x-uid'];

      if (schemaId) {
        return templates === null || templates === void 0 ? void 0 : templates.find(function (template) {
          return template.uid === schemaId;
        });
      }
    },
    getTemplateBySchemaId: function getTemplateBySchemaId(schemaId) {
      if (!schemaId) {
        return null;
      }

      return templates === null || templates === void 0 ? void 0 : templates.find(function (template) {
        return template.uid === schemaId;
      });
    },
    getTemplateById: function getTemplateById(key) {
      return templates === null || templates === void 0 ? void 0 : templates.find(function (template) {
        return template.key === key;
      });
    },
    getTemplatesByCollection: function getTemplatesByCollection(collectionName) {
      var _templates$filter;

      var items = templates === null || templates === void 0 ? void 0 : (_templates$filter = templates.filter) === null || _templates$filter === void 0 ? void 0 : _templates$filter.call(templates, function (template) {
        return template.collectionName === collectionName;
      });
      return items || [];
    }
  };
};
export var RemoteSchemaTemplateManagerProvider = function RemoteSchemaTemplateManagerProvider(props) {
  var _service$data;

  var api = useAPIClient();
  var options = {
    resource: 'uiSchemaTemplates',
    action: 'list',
    params: {
      appends: ['collection'],
      paginate: false
    }
  };
  var service = useRequest(options);

  if (service.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(SchemaTemplateManagerProvider, {
    refresh: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _yield$api$request3, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return api.request(options);

              case 2:
                _yield$api$request3 = _context4.sent;
                data = _yield$api$request3.data;
                service.mutate(data);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function refresh() {
        return _refresh.apply(this, arguments);
      }

      return refresh;
    }(),
    templates: service === null || service === void 0 ? void 0 : (_service$data = service.data) === null || _service$data === void 0 ? void 0 : _service$data.data
  }, props.children);
};