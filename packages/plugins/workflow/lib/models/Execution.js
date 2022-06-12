"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _jsonTemplates() {
  const data = _interopRequireDefault(require("json-templates"));

  _jsonTemplates = function _jsonTemplates() {
    return data;
  };

  return data;
}

var _constants = require("../constants");

var _instructions = _interopRequireDefault(require("../instructions"));

var _calculators = _interopRequireDefault(require("../calculators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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

class ExecutionModel extends _database().Model {
  constructor(...args) {
    super(...args);
    this.options = void 0;
    this.tx = void 0;
    this.nodes = [];
    this.nodesMap = new Map();
    this.jobsMap = new Map();
    this.jobsMapByNodeId = {};
  }

  // make dual linked nodes list then cache
  makeNodes(nodes = []) {
    this.nodes = nodes;
    nodes.forEach(node => {
      this.nodesMap.set(node.id, node);
    });
    nodes.forEach(node => {
      if (node.upstreamId) {
        node.upstream = this.nodesMap.get(node.upstreamId);
      }

      if (node.downstreamId) {
        node.downstream = this.nodesMap.get(node.downstreamId);
      }
    });
  }

  makeJobs(jobs) {
    jobs.forEach(job => {
      this.jobsMap.set(job.id, job); // TODO: should consider cycle, and from previous job

      this.jobsMapByNodeId[job.nodeId] = job.result;
    });
  }

  getTransaction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const sequelize = _this.constructor.database.sequelize;

      if (!_this.useTransaction) {
        return undefined;
      }

      const options = _this.options; // @ts-ignore

      const transaction = options.transaction && !options.transaction.finished ? options.transaction : sequelize.transaction(); // @ts-ignore

      if (_this.transaction !== transaction.id) {
        // @ts-ignore
        yield _this.update({
          transaction: transaction.id
        }, {
          transaction
        });
      }

      return transaction;
    })();
  }

  prepare(options, commit = false) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.options = options || {};
      const transaction = yield _this2.getTransaction();
      _this2.tx = transaction;

      if (!_this2.workflow) {
        _this2.workflow = yield _this2.getWorkflow({
          transaction
        });
      }

      const nodes = yield _this2.workflow.getNodes({
        transaction
      });

      _this2.makeNodes(nodes);

      const jobs = yield _this2.getJobs({
        order: [['id', 'ASC']],
        transaction
      });

      _this2.makeJobs(jobs);

      if (commit) {
        yield _this2.commit();
      }
    })();
  }

  start(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.status !== _constants.EXECUTION_STATUS.STARTED) {
        throw new Error(`execution was ended with status ${_this3.status}`);
      }

      yield _this3.prepare(options);

      if (_this3.nodes.length) {
        const head = _this3.nodes.find(item => !item.upstream);

        yield _this3.run(head, {
          result: _this3.context
        });
      } else {
        yield _this3.exit(null);
      }

      yield _this3.commit();
    })();
  }

  resume(job, options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (_this4.status !== _constants.EXECUTION_STATUS.STARTED) {
        throw new Error(`execution was ended with status ${_this4.status}`);
      }

      yield _this4.prepare(options);

      const node = _this4.nodesMap.get(job.nodeId);

      yield _this4.recall(node, job);
      yield _this4.commit();
    })();
  }

  commit() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      // @ts-ignore
      if (_this5.tx && (!_this5.options.transaction || _this5.options.transaction.finished)) {
        yield _this5.tx.commit();
      }
    })();
  }

  exec(instruction, node, prevJob) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      let job;

      try {
        // call instruction to get result and status
        job = yield instruction.call(node, prevJob, _this6);

        if (!job) {
          return null;
        }
      } catch (err) {
        // for uncaught error, set to rejected
        job = {
          result: err instanceof Error ? {
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? [] : err.stack
          } : err,
          status: _constants.JOB_STATUS.REJECTED
        }; // if previous job is from resuming

        if (prevJob && prevJob.nodeId === node.id) {
          prevJob.set(job);
          job = prevJob;
        }
      }

      let savedJob; // TODO(optimize): many checking of resuming or new could be improved
      // could be implemented separately in exec() / resume()

      if (job instanceof _database().Model) {
        savedJob = yield job.save({
          transaction: _this6.tx
        });
      } else {
        const upstreamId = prevJob instanceof _database().Model ? prevJob.get('id') : null;
        savedJob = yield _this6.saveJob(_objectSpread({
          nodeId: node.id,
          upstreamId
        }, job));
      }

      if (savedJob.status === _constants.JOB_STATUS.RESOLVED && node.downstream) {
        // run next node
        return _this6.run(node.downstream, savedJob);
      } // all nodes in scope have been executed


      return _this6.end(node, savedJob);
    })();
  }

  run(node, input) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const _instructions$get = _instructions.default.get(node.type),
            run = _instructions$get.run;

      if (typeof run !== 'function') {
        return Promise.reject(new Error('`run` should be implemented for customized execution of the node'));
      }

      return _this7.exec(run, node, input);
    })();
  } // parent node should take over the control


  end(node, job) {
    const parentNode = this.findBranchParentNode(node); // no parent, means on main flow

    if (parentNode) {
      return this.recall(parentNode, job);
    } // really done for all nodes
    // * should mark execution as done with last job status


    return this.exit(job);
  }

  recall(node, job) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const _instructions$get2 = _instructions.default.get(node.type),
            resume = _instructions$get2.resume;

      if (typeof resume !== 'function') {
        return Promise.reject(new Error('`resume` should be implemented because the node made branch'));
      }

      return _this8.exec(resume, node, job);
    })();
  }

  exit(job) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      const status = job ? ExecutionModel.StatusMap[job.status] : _constants.EXECUTION_STATUS.RESOLVED;
      yield _this9.update({
        status
      }, {
        transaction: _this9.tx
      });
      return null;
    })();
  } // TODO(optimize)


  saveJob(payload) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      const database = _this10.constructor.database;

      const _database$getCollecti = database.getCollection('jobs'),
            model = _database$getCollecti.model;

      const _yield$model$upsert = yield model.upsert(_objectSpread(_objectSpread({}, payload), {}, {
        executionId: _this10.id
      }), {
        transaction: _this10.tx
      }),
            _yield$model$upsert2 = _slicedToArray(_yield$model$upsert, 1),
            job = _yield$model$upsert2[0];

      _this10.jobsMap.set(job.id, job);

      _this10.jobsMapByNodeId[job.nodeId] = job.result;
      return job;
    })();
  } // find the first node in current branch


  findBranchStartNode(node) {
    for (let n = node; n; n = n.upstream) {
      if (n.branchIndex !== null) {
        return n;
      }
    }

    return null;
  } // find the node start current branch


  findBranchParentNode(node) {
    for (let n = node; n; n = n.upstream) {
      if (n.branchIndex !== null) {
        return n.upstream;
      }
    }

    return null;
  }

  findBranchParentJob(job, node) {
    for (let j = job; j; j = this.jobsMap.get(j.upstreamId)) {
      if (j.nodeId === node.id) {
        return j;
      }
    }

    return null;
  }

  getParsedValue(value, node) {
    const injectedFns = {};
    const scope = {
      execution: this,
      node
    };

    var _iterator = _createForOfIteratorHelper(_calculators.default.getEntities()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        let _step$value = _slicedToArray(_step.value, 2),
            name = _step$value[0],
            fn = _step$value[1];

        injectedFns[name] = fn.bind(scope);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return (0, _jsonTemplates().default)(value)({
      $context: this.context,
      $jobsMapByNodeId: this.jobsMapByNodeId,
      $fn: injectedFns
    });
  }

}

exports.default = ExecutionModel;
ExecutionModel.StatusMap = {
  [_constants.JOB_STATUS.PENDING]: _constants.EXECUTION_STATUS.STARTED,
  [_constants.JOB_STATUS.RESOLVED]: _constants.EXECUTION_STATUS.RESOLVED,
  [_constants.JOB_STATUS.REJECTED]: _constants.EXECUTION_STATUS.REJECTED,
  [_constants.JOB_STATUS.CANCELLED]: _constants.EXECUTION_STATUS.CANCELLED
};
