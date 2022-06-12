"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessible = void 0;

function _flatToNested() {
  const data = _interopRequireDefault(require("flat-to-nested"));

  _flatToNested = function _flatToNested() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const flatToNested = new (_flatToNested().default)({
  id: 'key',
  parent: 'parentKey',
  children: 'routes'
});

const getAccessible = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const repository = ctx.db.getRepository('uiRoutes');
    const routes = yield repository.find({
      sort: ['sort']
    });
    const data = flatToNested.convert(routes.map(route => route.toJSON()));
    ctx.body = (data === null || data === void 0 ? void 0 : data.routes) || [];
    yield next();
  });

  return function getAccessible(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAccessible = getAccessible;