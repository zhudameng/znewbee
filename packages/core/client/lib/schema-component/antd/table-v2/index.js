"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TableV2: true
};
exports.TableV2 = void 0;

var _Table = require("./Table");

var _Table2 = require("./Table.ActionColumnDesigner");

var _Table3 = require("./Table.Column");

var _TableColumn = require("./Table.Column.ActionBar");

var _TableColumn2 = require("./Table.Column.Decorator");

var _TableColumn3 = require("./Table.Column.Designer");

var _TableSelector = require("./TableSelector");

var _TableBlockDesigner = require("./TableBlockDesigner");

Object.keys(_TableBlockDesigner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TableBlockDesigner[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TableBlockDesigner[key];
    }
  });
});

var _TableField = require("./TableField");

Object.keys(_TableField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TableField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TableField[key];
    }
  });
});

var _TableSelectorDesigner = require("./TableSelectorDesigner");

Object.keys(_TableSelectorDesigner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TableSelectorDesigner[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TableSelectorDesigner[key];
    }
  });
});
var TableV2 = _Table.Table;
exports.TableV2 = TableV2;
TableV2.Column = _Table3.TableColumn;
TableV2.Column.ActionBar = _TableColumn.TableColumnActionBar;
TableV2.Column.Decorator = _TableColumn2.TableColumnDecorator;
TableV2.Column.Designer = _TableColumn3.TableColumnDesigner;
TableV2.ActionColumnDesigner = _Table2.TableActionColumnDesigner;
TableV2.Selector = _TableSelector.TableSelector;