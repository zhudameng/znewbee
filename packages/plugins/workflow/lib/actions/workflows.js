"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicate = duplicate;
exports.update = update;

function _actions() {
  const data = require("@znewbee/actions");

  _actions = function _actions() {
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(value) { var ret = this.s.return; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, throw: function _throw(value) { var thr = this.s.return; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

function update(_x, _x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (context, next) {
    const db = context.db;

    const repository = _actions().utils.getRepositoryFromParams(context);

    const _context$action$param = context.action.params,
          filterByTk = _context$action$param.filterByTk,
          values = _context$action$param.values,
          whitelist = _context$action$param.whitelist,
          blacklist = _context$action$param.blacklist,
          filter = _context$action$param.filter,
          updateAssociationValues = _context$action$param.updateAssociationValues;
    context.body = yield db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (transaction) {
        const others = {};

        if (values.enabled) {
          values.current = true;
          others.enabled = false;
        }

        if (values.current) {
          others.current = false;
          yield repository.update({
            filter: {
              key: values.key,
              id: {
                [_database().Op.ne]: filterByTk
              }
            },
            values: others,
            context,
            transaction
          });
        }

        const instance = yield repository.update({
          filterByTk,
          values,
          whitelist,
          blacklist,
          filter,
          updateAssociationValues,
          context,
          transaction
        });
        return instance;
      });

      return function (_x5) {
        return _ref.apply(this, arguments);
      };
    }());
    yield next();
  });
  return _update.apply(this, arguments);
}

function typeOf(value) {
  if (Array.isArray(value)) {
    return 'array';
  } else if (value instanceof Date) {
    return 'date';
  } else if (value === null) {
    return 'null';
  }

  return typeof value;
}

function migrateConfig(config, oldToNew) {
  function migrate(value) {
    switch (typeOf(value)) {
      case 'object':
        return Object.keys(value).reduce((result, key) => _objectSpread(_objectSpread({}, result), {}, {
          [key]: migrate(value[key])
        }), {});

      case 'array':
        return value.map(item => migrate(item));

      case 'string':
        return value.replace(/(\{\{\$jobsMapByNodeId\.)(\d+)/, (_, prefix, id) => `${prefix}${oldToNew.get(Number.parseInt(id, 10)).id}`);

      default:
        return value;
    }
  }

  return migrate(config);
}

function duplicate(_x3, _x4) {
  return _duplicate.apply(this, arguments);
}

function _duplicate() {
  _duplicate = _asyncToGenerator(function* (context, next) {
    const db = context.db;

    const repository = _actions().utils.getRepositoryFromParams(context);

    const filterByTk = context.action.params.filterByTk;
    context.body = yield db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (transaction) {
        const origin = yield repository.findOne({
          filterByTk,
          appends: ['nodes'],
          context,
          transaction
        });
        const instance = yield repository.create({
          values: {
            key: origin.key,
            title: origin.title,
            description: origin.description,
            type: origin.type,
            config: origin.config
          },
          transaction
        });
        const originalNodesMap = new Map();
        origin.nodes.forEach(node => {
          originalNodesMap.set(node.id, node);
        });
        const oldToNew = new Map();
        const newToOld = new Map();
        var _iteratorAbruptCompletion = false;
        var _didIteratorError = false;

        var _iteratorError;

        try {
          for (var _iterator = _asyncIterator(origin.nodes), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
            const node = _step.value;
            const newNode = yield instance.createNode({
              type: node.type,
              config: node.config,
              title: node.title,
              branchIndex: node.branchIndex
            }, {
              transaction
            }); // NOTE: keep original node references for later replacement

            oldToNew.set(node.id, newNode);
            newToOld.set(newNode.id, node);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion && _iterator.return != null) {
              yield _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorAbruptCompletion2 = false;
        var _didIteratorError2 = false;

        var _iteratorError2;

        try {
          for (var _iterator2 = _asyncIterator(oldToNew.entries()), _step2; _iteratorAbruptCompletion2 = !(_step2 = yield _iterator2.next()).done; _iteratorAbruptCompletion2 = false) {
            var _newUpstream$id, _newDownstream$id;

            const _step2$value = _slicedToArray(_step2.value, 2),
                  oldId = _step2$value[0],
                  newNode = _step2$value[1];

            const oldNode = originalNodesMap.get(oldId);
            const newUpstream = oldNode.upstreamId ? oldToNew.get(oldNode.upstreamId) : null;
            const newDownstream = oldNode.downstreamId ? oldToNew.get(oldNode.downstreamId) : null;
            yield newNode.update({
              upstreamId: (_newUpstream$id = newUpstream === null || newUpstream === void 0 ? void 0 : newUpstream.id) !== null && _newUpstream$id !== void 0 ? _newUpstream$id : null,
              downstreamId: (_newDownstream$id = newDownstream === null || newDownstream === void 0 ? void 0 : newDownstream.id) !== null && _newDownstream$id !== void 0 ? _newDownstream$id : null,
              config: migrateConfig(oldNode.config, oldToNew)
            }, {
              transaction
            });
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion2 && _iterator2.return != null) {
              yield _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return instance;
      });

      return function (_x6) {
        return _ref2.apply(this, arguments);
      };
    }());
    yield next();
  });
  return _duplicate.apply(this, arguments);
}
