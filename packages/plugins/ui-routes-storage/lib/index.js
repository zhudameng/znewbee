"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UiRoutesStoragePlugin = void 0;

function _acl() {
  const data = require("@znewbee/acl");

  _acl = function _acl() {
    return data;
  };

  return data;
}

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

var _getAccessible = require("./actions/getAccessible");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UiRoutesStoragePlugin extends _server().Plugin {
  getName() {
    return this.getPackageName(__dirname);
  }

  install() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const repository = _this.app.db.getRepository('uiRoutes');

      const routes = [{
        type: 'redirect',
        from: '/',
        to: '/admin',
        exact: true
      }, {
        type: 'route',
        uiSchema: {
          type: 'void',
          'x-component': 'Menu',
          'x-designer': 'Menu.Designer',
          'x-initializer': 'MenuItemInitializers',
          'x-component-props': {
            mode: 'mix',
            theme: 'dark',
            // defaultSelectedUid: 'u8',
            onSelect: '{{ onSelect }}',
            sideMenuRefScopeKey: 'sideMenuRef'
          },
          properties: {}
        },
        path: '/admin/:name(.+)?',
        component: 'AdminLayout',
        title: 'znewbee Admin',
        routes: [// test...
        // {
        //   type: 'route',
        //   path: '/admin/workflows/:id',
        //   component: 'WorkflowPage',
        // },
        // {
        //   type: 'route',
        //   path: '/admin/block-templates/:key',
        //   component: 'BlockTemplateDetails',
        // },
        // {
        //   type: 'route',
        //   path: '/admin/block-templates',
        //   component: 'BlockTemplatePage',
        // },
        {
          type: 'route',
          path: '/admin/:name(.+)?',
          component: 'RouteSchemaComponent'
        }]
      }, {
        type: 'route',
        component: 'AuthLayout',
        routes: [{
          type: 'route',
          path: '/signin',
          component: 'SigninPage'
        }, {
          type: 'route',
          path: '/signup',
          component: 'SignupPage'
        }]
      }];

      for (var _i = 0, _routes = routes; _i < _routes.length; _i++) {
        const values = _routes[_i];
        yield repository.create({
          values
        });
      }
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.app.resourcer.registerActionHandler('uiRoutes:getAccessible', _getAccessible.getAccessible);

      _this2.app.db.registerModels({
        MagicAttributeModel: _database().MagicAttributeModel
      });

      yield _this2.app.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });

      _this2.app.acl.use((0, _acl().skip)({
        resourceName: 'uiRoutes',
        actionName: 'getAccessible'
      }));
    })();
  }

}

exports.UiRoutesStoragePlugin = UiRoutesStoragePlugin;
var _default = UiRoutesStoragePlugin;
exports.default = _default;
