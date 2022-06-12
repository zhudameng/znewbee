"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiSchemaActions = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getRepositoryFromCtx = ctx => {
  return ctx.db.getCollection('uiSchemas').repository;
};

const callRepositoryMethod = (method, paramsKey, optionsBuilder) => {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      const params = _lodash().default.get(ctx.action.params, paramsKey);

      const options = optionsBuilder ? optionsBuilder(ctx.action.params) : {};
      const repository = getRepositoryFromCtx(ctx);
      const returnValue = yield repository[method](params, options);
      ctx.body = returnValue || {
        result: 'ok'
      };
      yield next();
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

function parseInsertAdjacentValues(values) {
  if (_lodash().default.has(values, 'schema')) {
    return values;
  }

  return {
    schema: values,
    wrap: null
  };
}

const uiSchemaActions = {
  getJsonSchema: callRepositoryMethod('getJsonSchema', 'resourceIndex', params => {
    return {
      includeAsyncNode: params === null || params === void 0 ? void 0 : params.includeAsyncNode
    };
  }),
  getProperties: callRepositoryMethod('getProperties', 'resourceIndex'),
  insert: callRepositoryMethod('insert', 'values'),
  insertNewSchema: callRepositoryMethod('insertNewSchema', 'values'),
  remove: callRepositoryMethod('remove', 'resourceIndex'),
  patch: callRepositoryMethod('patch', 'values'),
  clearAncestor: callRepositoryMethod('clearAncestor', 'resourceIndex'),

  insertAdjacent(ctx, next) {
    return _asyncToGenerator(function* () {
      const _ctx$action$params = ctx.action.params,
            resourceIndex = _ctx$action$params.resourceIndex,
            position = _ctx$action$params.position,
            values = _ctx$action$params.values,
            removeParentsIfNoChildren = _ctx$action$params.removeParentsIfNoChildren,
            breakRemoveOn = _ctx$action$params.breakRemoveOn;
      const repository = getRepositoryFromCtx(ctx);

      const _parseInsertAdjacentV = parseInsertAdjacentValues(values),
            schema = _parseInsertAdjacentV.schema,
            wrap = _parseInsertAdjacentV.wrap;

      ctx.body = yield repository.insertAdjacent(position, resourceIndex, schema, {
        removeParentsIfNoChildren,
        breakRemoveOn,
        wrap
      });
      yield next();
    })();
  },

  insertBeforeBegin: insertPositionActionBuilder('beforeBegin'),
  insertAfterBegin: insertPositionActionBuilder('afterBegin'),
  insertBeforeEnd: insertPositionActionBuilder('beforeEnd'),
  insertAfterEnd: insertPositionActionBuilder('afterEnd'),

  saveAsTemplate(ctx, next) {
    return _asyncToGenerator(function* () {
      const _ctx$action$params2 = ctx.action.params,
            filterByTk = _ctx$action$params2.filterByTk,
            values = _ctx$action$params2.values;
      const db = ctx.db;
      const transaction = yield db.sequelize.transaction();

      try {
        yield db.getRepository('uiSchemaTemplates').create({
          values: _objectSpread(_objectSpread({}, values), {}, {
            uid: filterByTk
          }),
          transaction
        });
        yield db.getRepository('uiSchemas').clearAncestor(filterByTk, {
          transaction
        });
        ctx.body = {
          result: 'ok'
        };
        yield transaction.commit();
      } catch (error) {
        yield transaction.rollback();
        throw error;
      }

      yield next();
    })();
  }

};
exports.uiSchemaActions = uiSchemaActions;

function insertPositionActionBuilder(position) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (ctx, next) {
      const _ctx$action$params3 = ctx.action.params,
            resourceIndex = _ctx$action$params3.resourceIndex,
            values = _ctx$action$params3.values,
            removeParentsIfNoChildren = _ctx$action$params3.removeParentsIfNoChildren,
            breakRemoveOn = _ctx$action$params3.breakRemoveOn;
      const repository = getRepositoryFromCtx(ctx);

      const _parseInsertAdjacentV2 = parseInsertAdjacentValues(values),
            schema = _parseInsertAdjacentV2.schema,
            wrap = _parseInsertAdjacentV2.wrap;

      ctx.body = yield repository.insertAdjacent(position, resourceIndex, schema, {
        removeParentsIfNoChildren,
        breakRemoveOn,
        wrap
      });
      yield next();
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
}