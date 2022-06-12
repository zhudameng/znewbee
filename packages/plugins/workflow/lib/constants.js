"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JOB_STATUS = exports.EXECUTION_STATUS = exports.BRANCH_INDEX = void 0;
const EXECUTION_STATUS = {
  STARTED: 0,
  RESOLVED: 1,
  REJECTED: -1,
  CANCELLED: -2
};
exports.EXECUTION_STATUS = EXECUTION_STATUS;
const JOB_STATUS = {
  PENDING: 0,
  RESOLVED: 1,
  REJECTED: -1,
  CANCELLED: -2
};
exports.JOB_STATUS = JOB_STATUS;
const BRANCH_INDEX = {
  DEFAULT: null,
  ON_TRUE: 1,
  ON_FALSE: 0
};
exports.BRANCH_INDEX = BRANCH_INDEX;