"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockInitializers = void 0;

var _utils = require("../utils");

// 页面里添加区块
var BlockInitializers = {
  title: '{{t("Add block")}}',
  icon: 'PlusOutlined',
  wrap: _utils.gridRowColWrap,
  items: [{
    key: 'dataBlocks',
    type: 'itemGroup',
    title: '{{t("Data blocks")}}',
    children: [{
      key: 'table',
      type: 'item',
      title: '{{t("Table")}}',
      component: 'TableBlockInitializer'
    }, {
      key: 'form',
      type: 'item',
      title: '{{t("Form")}}',
      component: 'FormBlockInitializer'
    }, {
      key: 'details',
      type: 'item',
      title: '{{t("Details")}}',
      component: 'DetailsBlockInitializer'
    }, {
      key: 'calendar',
      type: 'item',
      title: '{{t("Calendar")}}',
      component: 'CalendarBlockInitializer'
    }, {
      key: 'kanban',
      type: 'item',
      title: '{{t("Kanban")}}',
      component: 'KanbanBlockInitializer'
    }]
  }, {
    key: 'media',
    type: 'itemGroup',
    title: '{{t("Media")}}',
    children: [{
      key: 'markdown',
      type: 'item',
      title: '{{t("Markdown")}}',
      component: 'MarkdownBlockInitializer'
    }]
  }]
};
exports.BlockInitializers = BlockInitializers;