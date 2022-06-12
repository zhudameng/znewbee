"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.destroy = destroy;
exports.update = update;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

function _actions() {
  const data = require("@znewbee/actions");

  _actions = function _actions() {
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(function* (context, next) {
    const db = context.db;

    const repository = _actions().utils.getRepositoryFromParams(context);

    const _context$action$param = context.action.params,
          whitelist = _context$action$param.whitelist,
          blacklist = _context$action$param.blacklist,
          updateAssociationValues = _context$action$param.updateAssociationValues,
          values = _context$action$param.values,
          workflowId = _context$action$param.associatedIndex;
    context.body = yield db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (transaction) {
        const workflow = yield repository.getSourceModel(transaction);

        if (workflow.executed) {
          context.throw(400, 'Node could not be created in executed workflow');
        }

        const instance = yield repository.create({
          values,
          whitelist,
          blacklist,
          updateAssociationValues,
          context,
          transaction
        });

        if (!instance.upstreamId) {
          const previousHead = yield repository.findOne({
            filter: {
              id: {
                $ne: instance.id
              },
              upstreamId: null
            },
            transaction
          });

          if (previousHead) {
            yield previousHead.setUpstream(instance, {
              transaction
            });
            yield instance.setDownstream(previousHead, {
              transaction
            });
            instance.set('downstream', previousHead);
          }

          return instance;
        }

        const upstream = yield instance.getUpstream({
          transaction
        });

        if (instance.branchIndex == null) {
          const downstream = yield upstream.getDownstream({
            transaction
          });

          if (downstream) {
            yield downstream.setUpstream(instance, {
              transaction
            });
            yield instance.setDownstream(downstream, {
              transaction
            });
            instance.set('downstream', downstream);
          }

          yield upstream.update({
            downstreamId: instance.id
          }, {
            transaction
          });
          upstream.set('downstream', instance);
        } else {
          const _yield$upstream$getBr = yield upstream.getBranches({
            where: {
              id: {
                [_sequelize().Op.ne]: instance.id
              },
              branchIndex: instance.branchIndex
            },
            transaction
          }),
                _yield$upstream$getBr2 = _slicedToArray(_yield$upstream$getBr, 1),
                downstream = _yield$upstream$getBr2[0];

          if (downstream) {
            yield downstream.update({
              upstreamId: instance.id,
              branchIndex: null
            }, {
              transaction
            });
            yield instance.setDownstream(downstream, {
              transaction
            });
            instance.set('downstream', downstream);
          }
        }

        instance.set('upstream', upstream);
      });

      return function (_x7) {
        return _ref.apply(this, arguments);
      };
    }());
    yield next();
  });
  return _create.apply(this, arguments);
}

function searchBranchNodes(nodes, from) {
  const branchHeads = nodes.filter(item => item.upstreamId === from.id && item.branchIndex != null);
  return branchHeads.reduce((flatten, head) => flatten.concat(searchBranchDownstreams(nodes, head)), []);
}

function searchBranchDownstreams(nodes, from) {
  let result = [];

  for (let search = from; search; search = search.downstream) {
    result = [...result, search, ...searchBranchNodes(nodes, search)];
  }

  return result;
}

function destroy(_x3, _x4) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = _asyncToGenerator(function* (context, next) {
    const db = context.db;

    const repository = _actions().utils.getRepositoryFromParams(context);

    const filterByTk = context.action.params.filterByTk;
    context.body = yield db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (transaction) {
        const workflow = yield repository.getSourceModel(transaction);

        if (workflow.executed) {
          context.throw(400, 'Nodes in executed workflow could not be deleted');
        }

        const fields = ['id', 'upstreamId', 'downstreamId', 'branchIndex'];
        const instance = yield repository.findOne({
          filterByTk,
          fields: [...fields, 'workflowId'],
          appends: ['upstream', 'downstream'],
          transaction
        });

        const _instance$get = instance.get(),
              upstream = _instance$get.upstream,
              downstream = _instance$get.downstream;

        if (upstream && upstream.downstreamId === instance.id) {
          yield upstream.update({
            downstreamId: instance.downstreamId
          }, {
            transaction
          });
        }

        if (downstream) {
          yield downstream.update({
            upstreamId: instance.upstreamId,
            branchIndex: instance.branchIndex
          }, {
            transaction
          });
        }

        const nodes = yield repository.find({
          filter: {
            workflowId: instance.workflowId
          },
          fields,
          transaction
        });
        const nodesMap = new Map(); // make map

        nodes.forEach(item => {
          nodesMap.set(item.id, item);
        }); // overwrite

        nodesMap.set(instance.id, instance); // make linked list

        nodes.forEach(item => {
          if (item.upstreamId) {
            item.upstream = nodesMap.get(item.upstreamId);
          }

          if (item.downstreamId) {
            item.downstream = nodesMap.get(item.downstreamId);
          }
        });
        const branchNodes = searchBranchNodes(nodes, instance);
        yield repository.destroy({
          filterByTk: [instance.id, ...branchNodes.map(item => item.id)],
          transaction
        });
        return instance;
      });

      return function (_x8) {
        return _ref2.apply(this, arguments);
      };
    }());
    yield next();
  });
  return _destroy.apply(this, arguments);
}

function update(_x5, _x6) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (context, next) {
    const db = context.db;

    const repository = _actions().utils.getRepositoryFromParams(context);

    const _context$action$param2 = context.action.params,
          filterByTk = _context$action$param2.filterByTk,
          values = _context$action$param2.values,
          whitelist = _context$action$param2.whitelist,
          blacklist = _context$action$param2.blacklist,
          filter = _context$action$param2.filter,
          updateAssociationValues = _context$action$param2.updateAssociationValues;
    context.body = yield db.sequelize.transaction( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (transaction) {
        // TODO(optimize): duplicated instance query
        const _yield$repository$fin = yield repository.findOne({
          filterByTk,
          appends: ['workflow.executed'],
          transaction
        }),
              workflow = _yield$repository$fin.workflow;

        if (workflow.executed) {
          context.throw(400, 'Nodes in executed workflow could not be reconfigured');
        }

        return repository.update({
          filterByTk,
          values,
          whitelist,
          blacklist,
          filter,
          updateAssociationValues,
          context,
          transaction
        });
      });

      return function (_x9) {
        return _ref3.apply(this, arguments);
      };
    }());
    yield next();
  });
  return _update.apply(this, arguments);
}
