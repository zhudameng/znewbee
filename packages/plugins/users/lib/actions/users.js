"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = changePassword;
exports.check = check;
exports.getUserByResetToken = getUserByResetToken;
exports.lostpassword = lostpassword;
exports.resetpassword = resetpassword;
exports.setDefaultRole = setDefaultRole;
exports.signin = signin;
exports.signout = signout;
exports.signup = signup;
exports.updateProfile = updateProfile;

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function _crypto() {
    return data;
  };

  return data;
}

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function check(_x, _x2) {
  return _check.apply(this, arguments);
}

function _check() {
  _check = _asyncToGenerator(function* (ctx, next) {
    if (ctx.state.currentUser) {
      const user = ctx.state.currentUser.toJSON();
      ctx.body = user;
    } else {
      ctx.body = {};
    }

    yield next();
  });
  return _check.apply(this, arguments);
}

function signin(_x3, _x4) {
  return _signin.apply(this, arguments);
}

function _signin() {
  _signin = _asyncToGenerator(function* (ctx, next) {
    const _ctx$action$params = ctx.action.params,
          _ctx$action$params$un = _ctx$action$params.uniqueField,
          uniqueField = _ctx$action$params$un === void 0 ? 'email' : _ctx$action$params$un,
          values = _ctx$action$params.values;

    if (!values[uniqueField]) {
      ctx.throw(401, ctx.t('Please fill in your email address', {
        ns: _.namespace
      }));
    }

    const User = ctx.db.getCollection('users');
    const user = yield User.model.findOne({
      where: {
        [uniqueField]: values[uniqueField]
      }
    });

    if (!user) {
      ctx.throw(401, ctx.t('The email is incorrect, please re-enter', {
        ns: _.namespace
      }));
    }

    const pwd = User.getField('password');
    const isValid = yield pwd.verify(values.password, user.password);

    if (!isValid) {
      ctx.throw(401, ctx.t('The password is incorrect, please re-enter', {
        ns: _.namespace
      }));
    }

    const pluginUser = ctx.app.getPlugin('@znewbee/plugin-users');
    ctx.body = _objectSpread(_objectSpread({}, user.toJSON()), {}, {
      token: pluginUser.jwtService.sign({
        userId: user.get('id')
      })
    });
    yield next();
  });
  return _signin.apply(this, arguments);
}

function signout(_x5, _x6) {
  return _signout.apply(this, arguments);
}

function _signout() {
  _signout = _asyncToGenerator(function* (ctx, next) {
    ctx.body = ctx.state.currentUser;
    yield next();
  });
  return _signout.apply(this, arguments);
}

function signup(_x7, _x8) {
  return _signup.apply(this, arguments);
}

function _signup() {
  _signup = _asyncToGenerator(function* (ctx, next) {
    const User = ctx.db.getRepository('users');
    const values = ctx.action.params.values;
    const user = yield User.create({
      values
    });
    ctx.body = user;
    yield next();
  });
  return _signup.apply(this, arguments);
}

function lostpassword(_x9, _x10) {
  return _lostpassword.apply(this, arguments);
}

function _lostpassword() {
  _lostpassword = _asyncToGenerator(function* (ctx, next) {
    const email = ctx.action.params.values.email;

    if (!email) {
      ctx.throw(401, ctx.t('Please fill in your email address', {
        ns: _.namespace
      }));
    }

    const User = ctx.db.getCollection('users');
    const user = yield User.model.findOne({
      where: {
        email
      }
    });

    if (!user) {
      ctx.throw(401, ctx.t('The email is incorrect, please re-enter', {
        ns: _.namespace
      }));
    }

    user.resetToken = _crypto().default.randomBytes(20).toString('hex');
    yield user.save();
    ctx.body = user;
    yield next();
  });
  return _lostpassword.apply(this, arguments);
}

function resetpassword(_x11, _x12) {
  return _resetpassword.apply(this, arguments);
}

function _resetpassword() {
  _resetpassword = _asyncToGenerator(function* (ctx, next) {
    const _ctx$action$params$va = ctx.action.params.values,
          email = _ctx$action$params$va.email,
          password = _ctx$action$params$va.password,
          resetToken = _ctx$action$params$va.resetToken;
    const User = ctx.db.getCollection('users');
    const user = yield User.model.findOne({
      where: {
        email,
        resetToken
      }
    });

    if (!user) {
      ctx.throw(401, 'Unauthorized');
    }

    user.token = null;
    user.resetToken = null;
    user.password = password;
    yield user.save();
    ctx.body = user;
    yield next();
  });
  return _resetpassword.apply(this, arguments);
}

function getUserByResetToken(_x13, _x14) {
  return _getUserByResetToken.apply(this, arguments);
}

function _getUserByResetToken() {
  _getUserByResetToken = _asyncToGenerator(function* (ctx, next) {
    const token = ctx.action.params.token;
    const User = ctx.db.getCollection('users');
    const user = yield User.model.findOne({
      where: {
        resetToken: token
      }
    });

    if (!user) {
      ctx.throw(401, 'Unauthorized');
    }

    ctx.body = user;
    yield next();
  });
  return _getUserByResetToken.apply(this, arguments);
}

function updateProfile(_x15, _x16) {
  return _updateProfile.apply(this, arguments);
}

function _updateProfile() {
  _updateProfile = _asyncToGenerator(function* (ctx, next) {
    const values = ctx.action.params.values;

    if (!ctx.state.currentUser) {
      ctx.throw(401, 'Unauthorized');
    }

    yield ctx.state.currentUser.update(values);
    ctx.body = ctx.state.currentUser;
    yield next();
  });
  return _updateProfile.apply(this, arguments);
}

function changePassword(_x17, _x18) {
  return _changePassword.apply(this, arguments);
}

function _changePassword() {
  _changePassword = _asyncToGenerator(function* (ctx, next) {
    const _ctx$action$params$va2 = ctx.action.params.values,
          oldPassword = _ctx$action$params$va2.oldPassword,
          newPassword = _ctx$action$params$va2.newPassword;

    if (!ctx.state.currentUser) {
      ctx.throw(401, 'Unauthorized');
    }

    const User = ctx.db.getCollection('users');
    const user = yield User.model.findOne({
      where: {
        email: ctx.state.currentUser.email
      }
    });
    const pwd = User.getField('password');
    const isValid = yield pwd.verify(oldPassword, user.password);

    if (!isValid) {
      ctx.throw(401, ctx.t('The password is incorrect, please re-enter', {
        ns: _.namespace
      }));
    }

    user.password = newPassword;
    user.save();
    ctx.body = ctx.state.currentUser.toJSON();
    yield next();
  });
  return _changePassword.apply(this, arguments);
}

function setDefaultRole(_x19, _x20) {
  return _setDefaultRole.apply(this, arguments);
}

function _setDefaultRole() {
  _setDefaultRole = _asyncToGenerator(function* (ctx, next) {
    const roleName = ctx.action.params.values.roleName;
    yield ctx.state.currentUser.setDefaultRole(roleName);
    ctx.body = 'ok';
    yield next();
  });
  return _setDefaultRole.apply(this, arguments);
}
