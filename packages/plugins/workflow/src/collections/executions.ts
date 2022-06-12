import { CollectionOptions } from '@znewbee/database';

export default {
  name: 'executions',
  model: 'ExecutionModel',
  title: '执行流程',
  fields: [
    {
      interface: 'linkTo',
      type: 'belongsTo',
      name: 'workflow',
      title: '所属工作流'
    },
    {
      type: 'boolean',
      name: 'useTransaction',
      title: '使用事务',
      defaultValue: false
    },
    {
      type: 'uuid',
      name: 'transaction',
      defaultValue: null
    },
    {
      interface: 'linkTo',
      type: 'hasMany',
      name: 'jobs',
      title: '流程记录'
    },
    {
      interface: 'json',
      type: 'jsonb',
      name: 'context',
      title: '上下文数据'
    },
    {
      interface: 'select',
      type: 'integer',
      name: 'status',
      title: '状态'
    }
  ]
} as CollectionOptions;
