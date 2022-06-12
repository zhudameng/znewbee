"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarV2 = void 0;

var _action = require("../action");

var _Calendar = require("./Calendar");

var _Calendar2 = require("./Calendar.Designer");

var _Event = require("./Event");

var _Nav = require("./Nav");

require("./style.less");

var _Title = require("./Title");

var _Today = require("./Today");

var _ViewSelect = require("./ViewSelect");

_Calendar.Calendar.ActionBar = _action.ActionBar;
_Calendar.Calendar.Event = _Event.Event;
_Calendar.Calendar.Title = _Title.Title;
_Calendar.Calendar.Today = _Today.Today;
_Calendar.Calendar.Nav = _Nav.Nav;
_Calendar.Calendar.ViewSelect = _ViewSelect.ViewSelect;
_Calendar.Calendar.Designer = _Calendar2.CalendarDesigner;
var CalendarV2 = _Calendar.Calendar;
exports.CalendarV2 = CalendarV2;