"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PluginACL = exports.GrantHelper = void 0;

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

var _availableActions = require("./actions/available-actions");

var _roleCheck = require("./actions/role-check");

var _roleCollections = require("./actions/role-collections");

var _RoleModel = require("./model/RoleModel");

var _RoleResourceActionModel = require("./model/RoleResourceActionModel");

var _RoleResourceModel = require("./model/RoleResourceModel");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class GrantHelper {
  constructor() {
    this.resourceTargetActionMap = new Map();
    this.targetActionResourceMap = new Map();
  }

}

exports.GrantHelper = GrantHelper;

class PluginACL extends _server().Plugin {
  constructor(...args) {
    super(...args);
    this.associationFieldsActions = {};
    this.grantHelper = new GrantHelper();
  }

  get acl() {
    return this.app.acl;
  }

  registerAssociationFieldAction(associationType, value) {
    this.associationFieldsActions[associationType] = value;
  }

  registerAssociationFieldsActions() {
    // if grant create action to role, it should
    // also grant add action and association target's view action
    this.registerAssociationFieldAction('linkTo', {
      view: {
        associationActions: ['list', 'get']
      },
      create: {
        associationActions: ['add'],
        targetActions: ['view']
      },
      update: {
        associationActions: ['add', 'remove', 'toggle'],
        targetActions: ['view']
      }
    });
    this.registerAssociationFieldAction('attachments', {
      view: {
        associationActions: ['list', 'get']
      },
      add: {
        associationActions: ['upload', 'add']
      },
      update: {
        associationActions: ['update', 'add', 'remove', 'toggle']
      }
    });
    this.registerAssociationFieldAction('subTable', {
      view: {
        associationActions: ['list', 'get']
      },
      create: {
        associationActions: ['create']
      },
      update: {
        associationActions: ['update', 'destroy']
      }
    });
  }

  writeResourceToACL(resourceModel, transaction) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield resourceModel.writeToACL({
        acl: _this.acl,
        associationFieldsActions: _this.associationFieldsActions,
        transaction: transaction,
        grantHelper: _this.grantHelper
      });
    })();
  }

  writeActionToACL(actionModel, transaction) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const resource = actionModel.get('resource');

      const role = _this2.acl.getRole(resource.get('roleName'));

      yield actionModel.writeToACL({
        acl: _this2.acl,
        role,
        resourceName: resource.get('name'),
        associationFieldsActions: _this2.associationFieldsActions,
        grantHelper: _this2.grantHelper
      });
    })();
  }

  writeRolesToACL() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const roles = yield _this3.app.db.getRepository('roles').find({
        appends: ['resources', 'resources.actions']
      });

      var _iterator = _createForOfIteratorHelper(roles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const role = _step.value;
          role.writeToAcl({
            acl: _this3.acl
          });

          var _iterator2 = _createForOfIteratorHelper(role.get('resources')),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              const resource = _step2.value;
              yield _this3.writeResourceToACL(resource, null);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    })();
  }

  beforeLoad() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      _this4.app.db.registerModels({
        RoleResourceActionModel: _RoleResourceActionModel.RoleResourceActionModel,
        RoleResourceModel: _RoleResourceModel.RoleResourceModel,
        RoleModel: _RoleModel.RoleModel
      });

      _this4.registerAssociationFieldsActions();

      _this4.app.resourcer.define(_availableActions.availableActionResource);

      _this4.app.resourcer.define(_roleCollections.roleCollectionsResource);

      _this4.app.resourcer.registerActionHandler('roles:check', _roleCheck.checkAction);

      _this4.app.db.on('roles.afterSaveWithAssociations', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          model.writeToAcl({
            acl: _this4.acl
          });

          var _iterator3 = _createForOfIteratorHelper(yield model.getResources({
            transaction
          })),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              const resource = _step3.value;
              yield _this4.writeResourceToACL(resource, transaction);
            } // model is default

          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          if (model.get('default')) {
            yield _this4.app.db.getRepository('roles').update({
              values: {
                default: false
              },
              filter: {
                'name.$ne': model.get('name')
              },
              hooks: false,
              transaction
            });
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      _this4.app.db.on('roles.afterDestroy', model => {
        const roleName = model.get('name');

        _this4.acl.removeRole(roleName);
      });

      _this4.app.db.on('rolesResources.afterSaveWithAssociations', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (model, options) {
          yield _this4.writeResourceToACL(model, options.transaction);
        });

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());

      _this4.app.db.on('rolesResourcesActions.afterUpdateWithAssociations', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          const resource = yield model.getResource({
            transaction
          });
          yield _this4.writeResourceToACL(resource, transaction);
        });

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());

      _this4.app.db.on('rolesResources.afterDestroy', /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (model, options) {
          const role = _this4.acl.getRole(model.get('roleName'));

          role.revokeResource(model.get('name'));
        });

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());

      _this4.app.db.on('collections.afterDestroy', /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          yield _this4.app.db.getRepository('rolesResources').destroy({
            filter: {
              name: model.get('name')
            },
            transaction
          });
        });

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());

      _this4.app.db.on('fields.afterCreate', /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          const collectionName = model.get('collectionName');
          const fieldName = model.get('name');
          const resourceActions = yield _this4.app.db.getRepository('rolesResourcesActions').find({
            filter: {
              'resource.name': collectionName
            },
            transaction,
            appends: ['resource']
          });

          var _iterator4 = _createForOfIteratorHelper(resourceActions),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              const resourceAction = _step4.value;
              const fields = resourceAction.get('fields');
              const newFields = [...fields, fieldName];
              yield _this4.app.db.getRepository('rolesResourcesActions').update({
                filterByTk: resourceAction.get('id'),
                values: {
                  fields: newFields
                },
                transaction
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        });

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());

      _this4.app.db.on('fields.afterDestroy', /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(function* (model, options) {
          const collectionName = model.get('collectionName');
          const fieldName = model.get('name');
          const resourceActions = yield _this4.app.db.getRepository('rolesResourcesActions').find({
            filter: {
              'resource.name': collectionName,
              'fields.$anyOf': [fieldName]
            },
            transaction: options.transaction
          });

          var _iterator5 = _createForOfIteratorHelper(resourceActions),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              const resourceAction = _step5.value;
              const fields = resourceAction.get('fields');
              const newFields = fields.filter(field => field != fieldName);
              yield _this4.app.db.getRepository('rolesResourcesActions').update({
                filterByTk: resourceAction.get('id'),
                values: {
                  fields: newFields
                },
                transaction: options.transaction
              });
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        });

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }()); // sync database role data to acl


      _this4.app.on('beforeStart', /*#__PURE__*/_asyncToGenerator(function* () {
        yield _this4.writeRolesToACL();
      }));

      _this4.app.on('beforeInstallPlugin', /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(function* (plugin) {
          if (plugin.constructor.name !== 'UsersPlugin') {
            return;
          }

          const roles = _this4.app.db.getRepository('roles');

          yield roles.createMany({
            records: [{
              name: 'root',
              title: '{{t("Root")}}',
              hidden: true
            }, {
              name: 'admin',
              title: '{{t("Admin")}}',
              allowConfigure: true,
              allowNewMenu: true,
              strategy: {
                actions: ['create', 'export', 'view', 'update', 'destroy']
              }
            }, {
              name: 'member',
              title: '{{t("Member")}}',
              allowNewMenu: true,
              strategy: {
                actions: ['view', 'update:own', 'destroy:own', 'create']
              },
              default: true
            }]
          });

          const rolesResourcesScopes = _this4.app.db.getRepository('rolesResourcesScopes');

          yield rolesResourcesScopes.createMany({
            records: [{
              key: 'all',
              name: '{{t("All records")}}',
              scope: {}
            }, {
              key: 'own',
              name: '{{t("Own records")}}',
              scope: {
                createdById: '{{ ctx.state.currentUser.id }}'
              }
            }]
          });
        });

        return function (_x15) {
          return _ref9.apply(this, arguments);
        };
      }());

      _this4.app.acl.allow('roles', 'check', 'loggedIn');

      _this4.app.acl.allow('roles', ['create', 'update', 'destroy'], 'allowConfigure');

      _this4.app.acl.allow('roles.menuUiSchemas', ['set', 'toggle', 'list'], 'allowConfigure');

      _this4.app.acl.allow('*', '*', ctx => {
        return ctx.state.currentRole === 'root';
      });

      _this4.app.resourcer.use( /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(function* (ctx, next) {
          const _ctx$action = ctx.action,
                actionName = _ctx$action.actionName,
                resourceName = _ctx$action.resourceName,
                params = _ctx$action.params;

          const _ref11 = params || {},
                showAnonymous = _ref11.showAnonymous;

          if (actionName === 'list' && resourceName === 'roles') {
            if (!showAnonymous) {
              ctx.action.mergeParams({
                filter: {
                  'name.$ne': 'anonymous'
                }
              });
            }
          }

          yield next();
        });

        return function (_x16, _x17) {
          return _ref10.apply(this, arguments);
        };
      }());

      _this4.app.acl.use( /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(function* (ctx, next) {
          const _ctx$action2 = ctx.action,
                actionName = _ctx$action2.actionName,
                resourceName = _ctx$action2.resourceName;

          if (actionName === 'get' || actionName === 'list') {
            var _ctx$permission, _ctx$permission$can, _ctx$permission$can$p;

            if (!Array.isArray(ctx === null || ctx === void 0 ? void 0 : (_ctx$permission = ctx.permission) === null || _ctx$permission === void 0 ? void 0 : (_ctx$permission$can = _ctx$permission.can) === null || _ctx$permission$can === void 0 ? void 0 : (_ctx$permission$can$p = _ctx$permission$can.params) === null || _ctx$permission$can$p === void 0 ? void 0 : _ctx$permission$can$p.fields)) {
              return next();
            }

            let collection;

            if (resourceName.includes('.')) {
              var _ctx$db$getCollection, _ctx$db$getCollection2;

              const _resourceName$split = resourceName.split('.'),
                    _resourceName$split2 = _slicedToArray(_resourceName$split, 2),
                    collectionName = _resourceName$split2[0],
                    associationName = _resourceName$split2[1];

              const field = (_ctx$db$getCollection = ctx.db.getCollection(collectionName)) === null || _ctx$db$getCollection === void 0 ? void 0 : (_ctx$db$getCollection2 = _ctx$db$getCollection.getField) === null || _ctx$db$getCollection2 === void 0 ? void 0 : _ctx$db$getCollection2.call(_ctx$db$getCollection, associationName);

              if (field.target) {
                collection = ctx.db.getCollection(field.target);
              }
            } else {
              collection = ctx.db.getCollection(resourceName);
            }

            if (collection && collection.hasField('createdById')) {
              ctx.permission.can.params.fields.push('createdById');
            }
          }

          return next();
        });

        return function (_x18, _x19) {
          return _ref12.apply(this, arguments);
        };
      }());

      const parseJsonTemplate = _this4.app.acl.parseJsonTemplate;

      _this4.app.acl.use( /*#__PURE__*/function () {
        var _ref13 = _asyncToGenerator(function* (ctx, next) {
          const _ctx$action3 = ctx.action,
                actionName = _ctx$action3.actionName,
                resourceName = _ctx$action3.resourceName,
                resourceOf = _ctx$action3.resourceOf;

          if (resourceName.includes('.') && resourceOf) {
            var _ctx$permission2, _ctx$permission2$can, _availableAction$opti;

            if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$permission2 = ctx.permission) === null || _ctx$permission2 === void 0 ? void 0 : (_ctx$permission2$can = _ctx$permission2.can) === null || _ctx$permission2$can === void 0 ? void 0 : _ctx$permission2$can.params)) {
              return next();
            } // 关联数据去掉 filter


            delete ctx.permission.can.params.filter; // 关联数据能不能处理取决于 source 是否有权限

            const _resourceName$split3 = resourceName.split('.'),
                  _resourceName$split4 = _slicedToArray(_resourceName$split3, 1),
                  collectionName = _resourceName$split4[0];

            const action = ctx.can({
              resource: collectionName,
              action: actionName
            });

            const availableAction = _this4.app.acl.getAvailableAction(actionName);

            if (availableAction === null || availableAction === void 0 ? void 0 : (_availableAction$opti = availableAction.options) === null || _availableAction$opti === void 0 ? void 0 : _availableAction$opti.onNewRecord) {
              if (action) {
                ctx.permission.skip = true;
              } else {
                ctx.permission.can = false;
              }
            } else {
              var _action$params;

              const filter = parseJsonTemplate((action === null || action === void 0 ? void 0 : (_action$params = action.params) === null || _action$params === void 0 ? void 0 : _action$params.filter) || {}, ctx);
              const sourceInstance = yield ctx.db.getRepository(collectionName).findOne({
                filterByTk: resourceOf,
                filter
              });

              if (!sourceInstance) {
                ctx.permission.can = false;
              }
            }
          }

          yield next();
        });

        return function (_x20, _x21) {
          return _ref13.apply(this, arguments);
        };
      }());
    })();
  }

  install() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const repo = _this5.db.getRepository('collections');

      if (repo) {
        yield repo.db2cm('roles');
      }
    })();
  }

  load() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      yield _this6.app.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });

      _this6.app.resourcer.use(_this6.acl.middleware());
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.PluginACL = PluginACL;
var _default = PluginACL;
exports.default = _default;
