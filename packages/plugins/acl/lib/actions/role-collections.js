"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleCollectionsResource = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function totalPage(total, pageSize) {
  return Math.ceil(total / pageSize);
}

const roleCollectionsResource = {
  name: 'roles.collections',
  actions: {
    list(ctx, next) {
      return _asyncToGenerator(function* () {
        const role = ctx.action.params.associatedIndex;
        const _ctx$action$params = ctx.action.params,
              _ctx$action$params$pa = _ctx$action$params.page,
              page = _ctx$action$params$pa === void 0 ? 1 : _ctx$action$params$pa,
              _ctx$action$params$pa2 = _ctx$action$params.pageSize,
              pageSize = _ctx$action$params$pa2 === void 0 ? 20 : _ctx$action$params$pa2;
        const db = ctx.db;
        const collectionRepository = db.getRepository('collections'); // all collections

        const _yield$collectionRepo = yield collectionRepository.findAndCount({
          filter: ctx.action.params.filter,
          sort: 'sort'
        }),
              _yield$collectionRepo2 = _slicedToArray(_yield$collectionRepo, 2),
              collections = _yield$collectionRepo2[0],
              count = _yield$collectionRepo2[1]; // role collections


        const roleResources = yield db.getRepository('rolesResources').find({
          filter: {
            roleName: role
          }
        }); // role collections

        const roleResourcesNames = roleResources.map(roleResource => roleResource.get('name'));
        const roleResourceActionResourceNames = roleResources.filter(roleResources => roleResources.get('usingActionsConfig')).map(roleResources => roleResources.get('name'));
        ctx.body = {
          count,
          rows: collections.map(collection => {
            const exists = roleResourcesNames.includes(collection.get('name'));
            const usingConfig = roleResourceActionResourceNames.includes(collection.get('name')) ? 'resourceAction' : 'strategy';
            return {
              name: collection.get('name'),
              title: collection.get('title'),
              roleName: role,
              usingConfig,
              exists
            };
          }),
          page: Number(page),
          pageSize: Number(pageSize),
          totalPage: totalPage(count, pageSize)
        };
        yield next();
      })();
    }

  }
};
exports.roleCollectionsResource = roleCollectionsResource;