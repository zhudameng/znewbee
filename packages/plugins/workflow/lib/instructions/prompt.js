"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _default = {
  run(input, execution) {
    return {
      status: _constants.JOB_STATUS.PENDING
    };
  },

  resume(job, execution) {
    job.set('status', _constants.JOB_STATUS.RESOLVED);
    return job;
  }

};
exports.default = _default;