"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _Table = require("./Table.Array");

var _TableArray = require("./Table.Array.Designer");

var _Table2 = require("./Table.Column");

var _TableColumn = require("./Table.Column.ActionBar");

var _TableColumn2 = require("./Table.Column.Decorator");

var _TableColumn3 = require("./Table.Column.Designer");

var _Table3 = require("./Table.Designer");

var _Table4 = require("./Table.RowActionDesigner");

var _Table5 = require("./Table.RowSelection");

var _Table6 = require("./Table.Void");

var _TableVoid = require("./Table.Void.Designer");

var Table = function Table() {
  return null;
};

exports.Table = Table;
Table.Array = _Table.TableArray;
Table.Void = _Table6.TableVoid;
Table.Void.Designer = _TableVoid.TableVoidDesigner;
Table.RowSelection = _Table5.TableRowSelection;
Table.Column = _Table2.TableColumn;
Table.Column.ActionBar = _TableColumn.TableColumnActionBar;
Table.Column.Decorator = _TableColumn2.TableColumnDecorator;
Table.Column.Designer = _TableColumn3.TableColumnDesigner;
Table.RowActionDesigner = _Table4.TableRowActionDesigner;
Table.Designer = _Table3.TableDesigner;
Table.Array.Designer = _TableArray.TableArrayDesigner;