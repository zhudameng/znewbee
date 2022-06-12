"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _calculators = require("../calculators");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// @calculation: {
//   calculator: 'concat',
//   operands: [
//     {
//       type: 'calculation',
//       options: {
//         calculator: 'add',
//         operands: [{ value: 1 }, { value: 2 }]
//       }
//     },
//     {
//       type: 'constant',
//       value: '{{$context.data.title}}'
//     },
//     {
//       type: 'context',
//       options: {
//         path: 'data.title'
//       }
//     },
//     {
//       type: 'constant',
//       value: 1
//     }
//   ]
// }
var _default = {
  run(prevJob, execution) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const _ref = _this.config || {},
            calculation = _ref.calculation;

      const result = calculation ? (0, _calculators.calculate)({
        type: '$calculation',
        options: execution.getParsedValue(calculation)
      }, prevJob, execution) : null;
      return {
        result,
        status: _constants.JOB_STATUS.RESOLVED
      };
    })();
  }

};
exports.default = _default;