"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsActionInitializers = void 0;
// 表单的操作配置
var DetailsActionInitializers = {
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8
  },
  items: [{
    type: 'itemGroup',
    title: '{{t("Enable actions")}}',
    children: [{
      type: 'item',
      title: '{{t("Edit")}}',
      component: 'UpdateActionInitializer',
      schema: {
        'x-component': 'Action',
        'x-decorator': 'ACLActionProvider',
        'x-component-props': {
          type: 'primary'
        }
      }
    }, {
      type: 'item',
      title: '{{t("Delete")}}',
      component: 'DestroyActionInitializer',
      schema: {
        'x-component': 'Action',
        'x-decorator': 'ACLActionProvider'
      }
    }]
  }]
};
exports.DetailsActionInitializers = DetailsActionInitializers;