"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Kanban", {
  enumerable: true,
  get: function get() {
    return _Kanban.Kanban;
  }
});
exports.KanbanV2 = void 0;

var _action = require("../action");

var _Kanban = require("./Kanban");

var _Kanban2 = require("./Kanban.Card");

var _KanbanCard = require("./Kanban.Card.Designer");

var _Kanban3 = require("./Kanban.CardViewer");

var _Kanban4 = require("./Kanban.Designer");

_Kanban.Kanban.Card = _Kanban2.KanbanCard;
_Kanban.Kanban.CardAdder = _action.Action;
_Kanban.Kanban.CardViewer = _Kanban3.KanbanCardViewer;
_Kanban.Kanban.Card.Designer = _KanbanCard.KanbanCardDesigner;
_Kanban.Kanban.Designer = _Kanban4.KanbanDesigner;
var KanbanV2 = _Kanban.Kanban;
exports.KanbanV2 = KanbanV2;