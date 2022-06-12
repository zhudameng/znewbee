"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubTableActionInitializers = void 0;
// 表格操作配置
var SubTableActionInitializers = {
  title: "{{t('Configure actions')}}",
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8
  },
  // size: 'small',
  items: [{
    type: 'itemGroup',
    title: "{{t('Enable actions')}}",
    children: [{
      type: 'item',
      title: "{{t('Add new')}}",
      component: 'CreateActionInitializer',
      schema: {
        'x-align': 'right' // 'x-component-props': {
        //   size: 'small',
        // },

      }
    }, {
      type: 'item',
      title: "{{t('Delete')}}",
      component: 'BulkDestroyActionInitializer',
      schema: {
        'x-align': 'right' // 'x-component-props': {
        //   size: 'small',
        // },

      }
    }]
  }]
};
exports.SubTableActionInitializers = SubTableActionInitializers;