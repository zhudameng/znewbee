"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate = calculate;
exports.default = exports.calculators = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

const calculators = new (_utils().Registry)();
exports.calculators = calculators;
var _default = calculators; // @deprecated
// HACK: if no path provided, return self
// @see https://github.com/lodash/lodash/pull/1270
// TODO(question): should add default value as lodash?

exports.default = _default;

function get(object, path) {
  return path == null || !path.length ? object : (0, _lodash().get)(object, path);
} // NOTE:
//  this method could only be used in executing nodes.
//  because type of 'job' need loaded jobs in runtime execution.
//  or the execution should be prepared first.


function calculate(operand, lastJob, execution) {
  switch (operand.type) {
    // @Deprecated
    // from execution context
    case '$context':
      return get(execution.context, operand.options.path);
    // @Deprecated
    // from last job (or input job)

    case '$input':
      return lastJob !== null && lastJob !== void 0 ? lastJob : get(lastJob.result, operand.options.path);
    // @Deprecated
    // from job in execution

    case '$jobsMapByNodeId':
      // assume jobs have been fetched from execution before
      const job = execution.jobsMapByNodeId[operand.options.nodeId];
      return job && get(job, operand.options.path);

    case '$calculation':
      const fn = calculators.get(operand.options.calculator);

      if (!fn) {
        throw new Error(`no calculator function registered for "${operand.options.calculator}"`);
      }

      return fn(...operand.options.operands.map(item => calculate(item, lastJob, execution)));
    // constant

    default:
      return operand.value;
  }
} // built-in functions


function equal(a, b) {
  return a === b;
}

function notEqual(a, b) {
  return a !== b;
}

function gt(a, b) {
  return a > b;
}

function gte(a, b) {
  return a >= b;
}

function lt(a, b) {
  return a < b;
}

function lte(a, b) {
  return a <= b;
}

calculators.register('equal', equal);
calculators.register('notEqual', notEqual);
calculators.register('gt', gt);
calculators.register('gte', gte);
calculators.register('lt', lt);
calculators.register('lte', lte);
calculators.register('===', equal);
calculators.register('!==', notEqual);
calculators.register('>', gt);
calculators.register('>=', gte);
calculators.register('<', lt);
calculators.register('<=', lte);

function add(...args) {
  return args.reduce((sum, a) => sum + a, 0);
}

function minus(a, b) {
  return a - b;
}

function multiple(...args) {
  return args.reduce((result, a) => result * a, 1);
}

function divide(a, b) {
  return a / b;
}

function mod(a, b) {
  return a % b;
}

calculators.register('add', add);
calculators.register('minus', minus);
calculators.register('multiple', multiple);
calculators.register('divide', divide);
calculators.register('mod', mod);
calculators.register('+', add);
calculators.register('-', minus);
calculators.register('*', multiple);
calculators.register('/', divide);
calculators.register('%', mod);

function includes(a, b) {
  return a.includes(b);
}

function notIncludes(a, b) {
  return !a.includes(b);
}

function startsWith(a, b) {
  return a.startsWith(b);
}

function notStartsWith(a, b) {
  return !a.startsWith(b);
}

function endsWith(a, b) {
  return a.endsWith(b);
}

function notEndsWith(a, b) {
  return !a.endsWith(b);
}

calculators.register('includes', includes);
calculators.register('notIncludes', notIncludes);
calculators.register('startsWith', startsWith);
calculators.register('notStartsWith', notStartsWith);
calculators.register('endsWith', endsWith);
calculators.register('notEndsWith', notEndsWith);

function before(a, b) {
  return a < b;
}

calculators.register('now', () => new Date()); // TODO: add more common calculators
