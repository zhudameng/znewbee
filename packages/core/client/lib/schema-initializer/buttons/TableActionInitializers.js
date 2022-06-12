"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableActionInitializers = void 0;
// 表格操作配置
var TableActionInitializers = {
  title: "{{t('Configure actions')}}",
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8
  },
  items: [{
    type: 'itemGroup',
    title: "{{t('Enable actions')}}",
    children: [{
      type: 'item',
      title: "{{t('Filter')}}",
      component: 'FilterActionInitializer',
      schema: {
        'x-align': 'left'
      }
    }, {
      type: 'item',
      title: "{{t('Add new')}}",
      component: 'CreateActionInitializer',
      schema: {
        'background': 'red',
        'x-align': 'right',
        'x-decorator': 'ACLActionProvider',
        'x-acl-action-props': {
          skipScopeCheck: true
        }
      }
    }, {
      type: 'item',
      title: "{{t('Delete')}}",
      component: 'BulkDestroyActionInitializer',
      schema: {
        'x-align': 'right',
        'x-decorator': 'ACLActionProvider',
        'x-acl-action-props': {
          skipScopeCheck: true
        }
      }
    }]
  }]
};
exports.TableActionInitializers = TableActionInitializers;