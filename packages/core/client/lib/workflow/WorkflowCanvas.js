"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddButton = AddButton;
exports.Branch = Branch;
exports.WorkflowCanvas = WorkflowCanvas;
exports.useFlowContext = useFlowContext;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _css = require("@emotion/css");

var _reactI18next = require("react-i18next");

var _ = require("..");

var _nodes = require("./nodes");

var _style = require("./style");

var _triggers = require("./triggers");

var _reactRouterDom = require("react-router-dom");

var _excluded = ["nodes", "revisions"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function makeNodes(nodes) {
  var nodesMap = new Map();
  nodes.forEach(function (item) {
    return nodesMap.set(item.id, item);
  });

  var _iterator = _createForOfIteratorHelper(nodesMap.values()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;

      if (node.upstreamId) {
        node.upstream = nodesMap.get(node.upstreamId);
      }

      if (node.downstreamId) {
        node.downstream = nodesMap.get(node.downstreamId);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var FlowContext = /*#__PURE__*/_react.default.createContext(null);

function useFlowContext() {
  return (0, _react.useContext)(FlowContext);
}

function WorkflowCanvas() {
  var _data$data2;

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var history = (0, _reactRouterDom.useHistory)();

  var _useResourceActionCon = (0, _.useResourceActionContext)(),
      data = _useResourceActionCon.data,
      refresh = _useResourceActionCon.refresh,
      loading = _useResourceActionCon.loading;

  var _useResourceContext = (0, _.useResourceContext)(),
      resource = _useResourceContext.resource,
      targetKey = _useResourceContext.targetKey;

  var _useDocumentTitle = (0, _.useDocumentTitle)(),
      setTitle = _useDocumentTitle.setTitle;

  (0, _react.useEffect)(function () {
    var _data$data;

    var _ref = (_data$data = data === null || data === void 0 ? void 0 : data.data) !== null && _data$data !== void 0 ? _data$data : {},
        title = _ref.title;

    setTitle("".concat(title ? "".concat(title, " - ") : '').concat(t('Workflow')));
  }, [data === null || data === void 0 ? void 0 : data.data]);

  if (!(data === null || data === void 0 ? void 0 : data.data) && !loading) {
    return /*#__PURE__*/_react.default.createElement("div", null, t('Load failed'));
  }

  var _ref2 = (_data$data2 = data === null || data === void 0 ? void 0 : data.data) !== null && _data$data2 !== void 0 ? _data$data2 : {},
      _ref2$nodes = _ref2.nodes,
      nodes = _ref2$nodes === void 0 ? [] : _ref2$nodes,
      _ref2$revisions = _ref2.revisions,
      revisions = _ref2$revisions === void 0 ? [] : _ref2$revisions,
      workflow = _objectWithoutProperties(_ref2, _excluded);

  makeNodes(nodes);
  var entry = nodes.find(function (item) {
    return !item.upstream;
  });

  function onSwitchVersion(_ref3) {
    var key = _ref3.key;

    if (key != workflow.id) {
      history.push(key);
    }
  }

  function onToggle(_x) {
    return _onToggle.apply(this, arguments);
  }

  function _onToggle() {
    _onToggle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return resource.update({
                filterByTk: workflow[targetKey],
                values: {
                  enabled: value,
                  // NOTE: keep `key` field to adapter for backend
                  key: workflow.key
                }
              });

            case 2:
              refresh();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _onToggle.apply(this, arguments);
  }

  function onDuplicate() {
    return _onDuplicate.apply(this, arguments);
  }

  function _onDuplicate() {
    _onDuplicate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$resource$dupli, duplicated;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return resource.duplicate({
                filterByTk: workflow[targetKey]
              });

            case 2:
              _yield$resource$dupli = _context2.sent;
              duplicated = _yield$resource$dupli.data.data;
              history.push(duplicated.id);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _onDuplicate.apply(this, arguments);
  }

  return /*#__PURE__*/_react.default.createElement(FlowContext.Provider, {
    value: {
      workflow: workflow,
      nodes: nodes,
      onNodeAdded: refresh,
      onNodeRemoved: refresh
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "workflow-toolbar"
  }, /*#__PURE__*/_react.default.createElement("header", null, /*#__PURE__*/_react.default.createElement("strong", null, workflow.title)), /*#__PURE__*/_react.default.createElement("aside", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "workflow-versions"
  }, /*#__PURE__*/_react.default.createElement("label", null, t('Version')), /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    trigger: ['click'],
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, {
      onClick: onSwitchVersion,
      defaultSelectedKeys: [workflow.id],
      className: (0, _css.cx)(_style.workflowVersionDropdownClass)
    }, revisions.sort(function (a, b) {
      return b.id - a.id;
    }).map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: item.id,
        icon: item.current ? /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, null) : null,
        className: item.executed ? 'executed' : 'unexecuted'
      }, /*#__PURE__*/_react.default.createElement("strong", null, "#".concat(item.id)), /*#__PURE__*/_react.default.createElement("time", null, new Date(item.createdAt).toLocaleString()));
    }))
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link"
  }, (workflow === null || workflow === void 0 ? void 0 : workflow.id) ? "#".concat(workflow.id) : null, /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)))), /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    checked: workflow.enabled,
    onChange: onToggle,
    checkedChildren: t('Started'),
    unCheckedChildren: t('Stopped')
  }), workflow.executed && !revisions.find(function (item) {
    return !item.executed && new Date(item.createdAt) > new Date(workflow.createdAt);
  }) ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: onDuplicate
  }, t('Copy to new version')) : null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "workflow-canvas"
  }, /*#__PURE__*/_react.default.createElement(_triggers.TriggerConfig, null), /*#__PURE__*/_react.default.createElement("div", {
    className: _style.branchBlockClass
  }, /*#__PURE__*/_react.default.createElement(Branch, {
    entry: entry
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeCardClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.nodeMetaClass)
  }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "#333"
  }, t('End'))))));
}

function Branch(_ref4) {
  var _ref4$from = _ref4.from,
      from = _ref4$from === void 0 ? null : _ref4$from,
      _ref4$entry = _ref4.entry,
      entry = _ref4$entry === void 0 ? null : _ref4$entry,
      _ref4$branchIndex = _ref4.branchIndex,
      branchIndex = _ref4$branchIndex === void 0 ? null : _ref4$branchIndex,
      _ref4$controller = _ref4.controller,
      controller = _ref4$controller === void 0 ? null : _ref4$controller;
  var list = [];

  for (var node = entry; node; node = node.downstream) {
    list.push(node);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.branchClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "workflow-branch-lines"
  }), controller, /*#__PURE__*/_react.default.createElement(AddButton, {
    upstream: from,
    branchIndex: branchIndex
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "workflow-node-list"
  }, list.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_nodes.Node, {
      data: item,
      key: item.id
    });
  })));
}

;

function AddButton(_ref5) {
  var upstream = _ref5.upstream,
      _ref5$branchIndex = _ref5.branchIndex,
      branchIndex = _ref5$branchIndex === void 0 ? null : _ref5$branchIndex;
  var compile = (0, _.useCompile)();
  var api = (0, _.useAPIClient)();

  var _useFlowContext = useFlowContext(),
      workflow = _useFlowContext.workflow,
      onNodeAdded = _useFlowContext.onNodeAdded;

  var resource = api.resource('workflows.nodes', workflow.id);

  function onCreate(_x2) {
    return _onCreate.apply(this, arguments);
  }

  function _onCreate() {
    _onCreate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
      var _upstream$id;

      var keyPath, type, config, _keyPath, optionKey, _instructions$get$opt, value, _yield$resource$creat, node;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              keyPath = _ref6.keyPath;
              type = keyPath.pop();
              config = {};
              _keyPath = _slicedToArray(keyPath, 1), optionKey = _keyPath[0];

              if (optionKey) {
                _instructions$get$opt = _nodes.instructions.get(type).options.find(function (item) {
                  return item.key === optionKey;
                }), value = _instructions$get$opt.value;
                Object.assign(config, value);
              }

              _context3.next = 7;
              return resource.create({
                values: {
                  type: type,
                  upstreamId: (_upstream$id = upstream === null || upstream === void 0 ? void 0 : upstream.id) !== null && _upstream$id !== void 0 ? _upstream$id : null,
                  branchIndex: branchIndex,
                  config: config
                }
              });

            case 7:
              _yield$resource$creat = _context3.sent;
              node = _yield$resource$creat.data.data;
              onNodeAdded(node);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _onCreate.apply(this, arguments);
  }

  var groups = [{
    value: 'control',
    name: '{{t("Control")}}'
  }, {
    value: 'collection',
    name: '{{t("Collection operations")}}'
  }];
  var instructionList = Array.from(_nodes.instructions.getValues());
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.cx)(_style.addButtonClass)
  }, /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    trigger: ['click'],
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, {
      onClick: function onClick(ev) {
        return onCreate(ev);
      }
    }, groups.map(function (group) {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.ItemGroup, {
        key: group.value,
        title: compile(group.name)
      }, instructionList.filter(function (item) {
        return item.group === group.value;
      }).map(function (item) {
        return item.options ? /*#__PURE__*/_react.default.createElement(_antd.Menu.SubMenu, {
          key: item.type,
          title: compile(item.title)
        }, item.options.map(function (option) {
          return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
            key: option.key
          }, compile(option.label));
        })) : /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
          key: item.type
        }, compile(item.title));
      }));
    })),
    disabled: workflow.executed
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null)
  })));
}

;