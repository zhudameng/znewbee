"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _2 = require("./");

var actions = _interopRequireWildcard(require("./actions/users"));

var _jwtService = require("./jwt-service");

var _locale = require("./locale");

var middlewares = _interopRequireWildcard(require("./middlewares"));

var _UserModel = require("./models/UserModel");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UsersPlugin extends _server().Plugin {
  constructor(app, options) {
    super(app, options);
    this.jwtService = void 0;
    this.jwtService = new _jwtService.JwtService((options === null || options === void 0 ? void 0 : options.jwt) || {});
  }

  beforeLoad() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.app.i18n.addResources('zh-CN', _2.namespace, _locale.zhCN);

      _this.app.i18n.addResources('en-US', _2.namespace, _locale.enUS);

      const cmd = _this.app.findCommand('install');

      if (cmd) {
        cmd.requiredOption('-e, --root-email <rootEmail>', '', process.env.INIT_ROOT_EMAIL);
        cmd.requiredOption('-p, --root-password <rootPassword>', '', process.env.INIT_ROOT_PASSWORD);
        cmd.option('-n, --root-nickname [rootNickname]');
      }

      _this.db.registerOperators({
        $isCurrentUser(_, ctx) {
          var _ctx$app, _ctx$app$ctx, _ctx$app$ctx$state, _ctx$app$ctx$state$cu;

          return {
            [_database().Op.eq]: (ctx === null || ctx === void 0 ? void 0 : (_ctx$app = ctx.app) === null || _ctx$app === void 0 ? void 0 : (_ctx$app$ctx = _ctx$app.ctx) === null || _ctx$app$ctx === void 0 ? void 0 : (_ctx$app$ctx$state = _ctx$app$ctx.state) === null || _ctx$app$ctx$state === void 0 ? void 0 : (_ctx$app$ctx$state$cu = _ctx$app$ctx$state.currentUser) === null || _ctx$app$ctx$state$cu === void 0 ? void 0 : _ctx$app$ctx$state$cu.id) || -1
          };
        }

      });

      _this.db.registerModels({
        UserModel: _UserModel.UserModel
      });

      _this.db.on('users.afterCreateWithAssociations', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;

          const repository = _this.app.db.getRepository('roles');

          if (!repository) {
            return;
          }

          const defaultRole = yield repository.findOne({
            filter: {
              default: true
            },
            transaction
          });

          if (defaultRole && (yield model.countRoles({
            transaction
          })) == 0) {
            yield model.addRoles(defaultRole, {
              transaction
            });
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      _this.db.on('afterDefineCollection', collection => {
        let _collection$options = collection.options,
            createdBy = _collection$options.createdBy,
            updatedBy = _collection$options.updatedBy;

        if (createdBy === true) {
          collection.setField('createdById', {
            type: 'context',
            dataType: 'integer',
            dataIndex: 'state.currentUser.id',
            createOnly: true,
            visible: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          });
          collection.setField('createdBy', {
            type: 'belongsTo',
            target: 'users',
            foreignKey: 'createdById',
            targetKey: 'id'
          });
        }

        if (updatedBy === true) {
          collection.setField('updatedById', {
            type: 'context',
            dataType: 'integer',
            dataIndex: 'state.currentUser.id',
            visible: true,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          });
          collection.setField('updatedBy', {
            type: 'belongsTo',
            target: 'users',
            foreignKey: 'updatedById',
            targetKey: 'id'
          });
        }
      });

      for (var _i = 0, _Object$entries = Object.entries(actions); _i < _Object$entries.length; _i++) {
        const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              action = _Object$entries$_i[1];

        _this.app.resourcer.registerActionHandler(`users:${key}`, action);
      }

      _this.app.resourcer.use(middlewares.parseToken({
        plugin: _this
      }));

      const publicActions = ['check', 'signin', 'signup', 'lostpassword', 'resetpassword', 'getUserByResetToken'];
      const loggedInActions = ['signout', 'updateProfile', 'changePassword', 'setDefaultRole'];
      publicActions.forEach(action => _this.app.acl.allow('users', action));
      loggedInActions.forEach(action => _this.app.acl.allow('users', action, 'loggedIn'));
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });
    })();
  }

  getInstallingData(options = {}) {
    var _options$cliArgs;

    const _process$env = process.env,
          INIT_ROOT_NICKNAME = _process$env.INIT_ROOT_NICKNAME,
          INIT_ROOT_PASSWORD = _process$env.INIT_ROOT_PASSWORD,
          INIT_ROOT_EMAIL = _process$env.INIT_ROOT_EMAIL;

    const _ref2 = options.users || (options === null || options === void 0 ? void 0 : (_options$cliArgs = options.cliArgs) === null || _options$cliArgs === void 0 ? void 0 : _options$cliArgs[0]) || {},
          _ref2$rootEmail = _ref2.rootEmail,
          rootEmail = _ref2$rootEmail === void 0 ? INIT_ROOT_EMAIL : _ref2$rootEmail,
          _ref2$rootPassword = _ref2.rootPassword,
          rootPassword = _ref2$rootPassword === void 0 ? INIT_ROOT_PASSWORD : _ref2$rootPassword,
          _ref2$rootNickname = _ref2.rootNickname,
          rootNickname = _ref2$rootNickname === void 0 ? INIT_ROOT_NICKNAME || 'Super Admin' : _ref2$rootNickname;

    return {
      rootEmail,
      rootPassword,
      rootNickname
    };
  }

  install(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const _this3$getInstallingD = _this3.getInstallingData(options),
            rootNickname = _this3$getInstallingD.rootNickname,
            rootPassword = _this3$getInstallingD.rootPassword,
            rootEmail = _this3$getInstallingD.rootEmail;

      const User = _this3.db.getCollection('users');

      const user = yield User.repository.create({
        values: {
          email: rootEmail,
          password: rootPassword,
          nickname: rootNickname,
          roles: ['root', 'admin', 'member']
        }
      });
      yield user.setDefaultRole('root');

      const repo = _this3.db.getRepository('collections');

      if (repo) {
        yield repo.db2cm('users');
      }
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.default = UsersPlugin;
