"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calculators = _interopRequireWildcard(require("../calculators"));

var _constants = require("../constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// @calculation: {
//   not: false,
//   group: {
//     type: 'and',
//     calculations: [
//       {
//         calculator: 'time.equal',
//         operands: [{ value: '{{$context.time}}' }, { value: '{{$fn.now}}' }]
//       },
//       {
//         calculator: 'value.equal',
//         operands: [{ value: '{{$jobsMapByNodeId.213}}' }, { value: 1 }]
//       },
//       {
//         group: {
//           type: 'or',
//           calculations: [
//             {
//               calculator: 'value.equal',
//               operands: [{ value: '{{$jobsMapByNodeId.213}}' }, { value: 1 }]
//             }
//           ]
//         }
//       }
//     ]
//   }
// }
function logicCalculate(calculation, input, execution) {
  if (!calculation) {
    return true;
  }

  const not = calculation.not,
        group = calculation.group;
  let result;

  if (group) {
    const method = group.type === 'and' ? 'every' : 'some';
    result = group.calculations[method](item => logicCalculate(item, input, execution));
  } else {
    const args = calculation.operands.map(operand => (0, _calculators.calculate)(operand, input, execution));

    const fn = _calculators.default.get(calculation.calculator);

    if (!fn) {
      throw new Error(`no calculator function registered for "${calculation.calculator}"`);
    }

    result = fn(...args);
  }

  return not ? !result : result;
}

var _default = {
  run(prevJob, execution) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // TODO(optimize): loading of jobs could be reduced and turned into incrementally in execution
      // const jobs = await execution.getJobs();
      const _ref = _this.config || {},
            calculation = _ref.calculation,
            rejectOnFalse = _ref.rejectOnFalse;

      const result = logicCalculate(calculation, prevJob, execution);

      if (!result && rejectOnFalse) {
        return {
          status: _constants.JOB_STATUS.REJECTED,
          result
        };
      }

      const job = {
        status: _constants.JOB_STATUS.RESOLVED,
        result,
        // TODO(optimize): try unify the building of job
        nodeId: _this.id,
        upstreamId: prevJob && prevJob.id || null
      };
      const branchNode = execution.nodes.find(item => item.upstream === _this && Boolean(item.branchIndex) === result);

      if (!branchNode) {
        return job;
      }

      const savedJob = yield execution.saveJob(job);
      return execution.run(branchNode, savedJob);
    })();
  },

  resume(branchJob, execution) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (branchJob.status === _constants.JOB_STATUS.RESOLVED) {
        // return to continue this.downstream
        return branchJob;
      } // pass control to upper scope by ending current scope


      return execution.end(_this2, branchJob);
    })();
  }

};
exports.default = _default;