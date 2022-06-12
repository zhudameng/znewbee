"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

var _Workflow = _interopRequireDefault(require("./models/Workflow"));

var _Execution = _interopRequireDefault(require("./models/Execution"));

var _actions = _interopRequireDefault(require("./actions"));

var _triggers = _interopRequireDefault(require("./triggers"));

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class _default extends _server().Plugin {
  constructor(...args) {
    super(...args);
    this.triggers = new (_utils().Registry)();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

  load(options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const db = _this.app.db;
      db.registerModels({
        WorkflowModel: _Workflow.default,
        ExecutionModel: _Execution.default
      });
      yield db.import({
        directory: _path().default.resolve(__dirname, 'collections')
      });
      (0, _actions.default)(_this);
      (0, _triggers.default)(_this); // [Life Cycle]:
      //   * load all workflows in db
      //   * add all hooks for enabled workflows
      //   * add hooks for create/update[enabled]/delete workflow to add/remove specific hooks

      _this.app.on('beforeStart', /*#__PURE__*/_asyncToGenerator(function* () {
        const collection = db.getCollection('workflows');
        const workflows = yield collection.repository.find({
          filter: {
            enabled: true
          }
        });
        workflows.forEach(workflow => {
          _this.toggle(workflow);
        });
        db.on('workflows.afterCreate', model => _this.toggle(model));
        db.on('workflows.afterUpdate', model => _this.toggle(model));
        db.on('workflows.afterDestroy', model => _this.toggle(model, false));
      })); // [Life Cycle]: initialize all necessary seed data
      // this.app.on('db.init', async () => {});

    })();
  }

  toggle(workflow, enable) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const type = workflow.get('type');

      const trigger = _this2.triggers.get(type);

      if (typeof enable !== 'undefined' ? enable : workflow.get('enabled')) {
        yield trigger.on(workflow);
      } else {
        yield trigger.off(workflow);
      }
    })();
  }

}

exports.default = _default;
