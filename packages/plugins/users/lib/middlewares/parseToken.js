"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToken = parseToken;
exports.setCurrentRole = setCurrentRole;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseToken(options) {
  return /*#__PURE__*/function () {
    var _parseToken = _asyncToGenerator(function* (ctx, next) {
      const user = yield findUserByToken(ctx, options.plugin);

      if (user) {
        ctx.state.currentUser = user;
        setCurrentRole(ctx);
      }

      return next();
    });

    function parseToken(_x, _x2) {
      return _parseToken.apply(this, arguments);
    }

    return parseToken;
  }();
}

function setCurrentRole(ctx) {
  let currentRole = ctx.get('X-Role');

  if (currentRole === 'anonymous') {
    ctx.state.currentRole = currentRole;
    return;
  }

  const userRoles = ctx.state.currentUser.roles;

  if (userRoles.length == 1) {
    currentRole = userRoles[0].name;
  } else if (userRoles.length > 1) {
    const role = userRoles.find(role => role.name === currentRole);

    if (!role) {
      var _ref;

      const defaultRole = userRoles.find(role => {
        var _role$rolesUsers;

        return role === null || role === void 0 ? void 0 : (_role$rolesUsers = role.rolesUsers) === null || _role$rolesUsers === void 0 ? void 0 : _role$rolesUsers.default;
      });
      currentRole = (_ref = defaultRole || userRoles[0]) === null || _ref === void 0 ? void 0 : _ref.name;
    }
  }

  if (currentRole) {
    ctx.state.currentRole = currentRole;
  }
}

function findUserByToken(_x3, _x4) {
  return _findUserByToken.apply(this, arguments);
}

function _findUserByToken() {
  _findUserByToken = _asyncToGenerator(function* (ctx, plugin) {
    const token = ctx.getBearerToken();

    if (!token) {
      return null;
    }

    try {
      const _yield$plugin$jwtServ = yield plugin.jwtService.decode(token),
            userId = _yield$plugin$jwtServ.userId;

      return yield ctx.db.getRepository('users').findOne({
        filter: {
          id: userId
        },
        appends: ['roles']
      });
    } catch (error) {
      return null;
    }
  });
  return _findUserByToken.apply(this, arguments);
}