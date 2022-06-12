"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PARALLEL_MODE = void 0;

var _constants = require("../constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const PARALLEL_MODE = {
  ALL: 'all',
  ANY: 'any',
  RACE: 'race'
};
exports.PARALLEL_MODE = PARALLEL_MODE;
const StatusGetters = {
  [PARALLEL_MODE.ALL](result) {
    if (result.some(j => j && j.status === _constants.JOB_STATUS.REJECTED)) {
      return _constants.JOB_STATUS.REJECTED;
    }

    if (result.every(j => j && j.status === _constants.JOB_STATUS.RESOLVED)) {
      return _constants.JOB_STATUS.RESOLVED;
    }

    return _constants.JOB_STATUS.PENDING;
  },

  [PARALLEL_MODE.ANY](result) {
    return result.some(j => j && j.status === _constants.JOB_STATUS.RESOLVED) ? _constants.JOB_STATUS.RESOLVED : result.some(j => j && j.status === _constants.JOB_STATUS.PENDING) ? _constants.JOB_STATUS.PENDING : _constants.JOB_STATUS.REJECTED;
  },

  [PARALLEL_MODE.RACE](result) {
    return result.some(j => j && j.status === _constants.JOB_STATUS.RESOLVED) ? _constants.JOB_STATUS.RESOLVED : result.some(j => j && j.status === _constants.JOB_STATUS.REJECTED) ? _constants.JOB_STATUS.REJECTED : _constants.JOB_STATUS.PENDING;
  }

};
var _default = {
  run(prevJob, execution) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var _prevJob$id;

      const branches = execution.nodes.filter(item => item.upstream === _this && item.branchIndex !== null).sort((a, b) => a.branchIndex - b.branchIndex);
      const job = yield execution.saveJob({
        status: _constants.JOB_STATUS.PENDING,
        result: Array(branches.length).fill(null),
        nodeId: _this.id,
        upstreamId: (_prevJob$id = prevJob === null || prevJob === void 0 ? void 0 : prevJob.id) !== null && _prevJob$id !== void 0 ? _prevJob$id : null
      }); // NOTE:
      // use `reduce` but not `Promise.all` here to avoid racing manupulating db.
      // for users, this is almost equivalent to `Promise.all`,
      // because of the delay is not significant sensible.
      // another better aspect of this is, it could handle sequenced branches in future.

      yield branches.reduce((promise, branch) => promise.then(() => execution.run(branch, job)), Promise.resolve());
      return execution.end(_this, job);
    })();
  },

  resume(branchJob, execution) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const job = execution.findBranchParentJob(branchJob, _this2);
      const result = job.result,
            status = job.status; // if parallel has been done (resolved / rejected), do not care newly executed branch jobs.

      if (status !== _constants.JOB_STATUS.PENDING) {
        return null;
      } // find the index of the node which start the branch


      const jobNode = execution.nodesMap.get(branchJob.nodeId);

      const _execution$findBranch = execution.findBranchStartNode(jobNode),
            branchIndex = _execution$findBranch.branchIndex;

      const _ref = _this2.config || {},
            _ref$mode = _ref.mode,
            mode = _ref$mode === void 0 ? PARALLEL_MODE.ALL : _ref$mode;

      const newResult = [...result.slice(0, branchIndex), branchJob.get(), ...result.slice(branchIndex + 1)];
      job.set({
        result: newResult,
        status: StatusGetters[mode](newResult)
      });

      if (job.status === _constants.JOB_STATUS.PENDING) {
        yield job.save({
          transaction: execution.tx
        });
        return execution.end(_this2, job);
      }

      return job;
    })();
  }

};
exports.default = _default;