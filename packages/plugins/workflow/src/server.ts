import path from 'path';

import { Plugin } from '@znewbee/server';

import WorkflowModel from './models/Workflow';
import ExecutionModel from './models/Execution';
import initActions from './actions';
import initTriggers, { Trigger } from './triggers';
import { Registry } from '@znewbee/utils';



export default class extends Plugin {
  triggers: Registry<Trigger> = new Registry<Trigger>();

  getName(): string {
    return this.getPackageName(__dirname);
  }

  async load(options = {}) {
    const { db } = this.app;

    db.registerModels({
      WorkflowModel,
      ExecutionModel,
    });

    await db.import({
      directory: path.resolve(__dirname, 'collections'),
    });

    initActions(this);

    initTriggers(this);

    // [Life Cycle]:
    //   * load all workflows in db
    //   * add all hooks for enabled workflows
    //   * add hooks for create/update[enabled]/delete workflow to add/remove specific hooks
    this.app.on('beforeStart', async () => {
      const collection = db.getCollection('workflows');
      const workflows = await collection.repository.find({
        filter: { enabled: true },
      });

      workflows.forEach((workflow: WorkflowModel) => {
        this.toggle(workflow);
      });

      db.on('workflows.afterCreate', (model: WorkflowModel) => this.toggle(model));
      db.on('workflows.afterUpdate', (model: WorkflowModel) => this.toggle(model));
      db.on('workflows.afterDestroy', (model: WorkflowModel) => this.toggle(model, false));
    });

    // [Life Cycle]: initialize all necessary seed data
    // this.app.on('db.init', async () => {});
  }

  async toggle(workflow: WorkflowModel, enable?: boolean) {
    const type = workflow.get('type');
    const trigger = this.triggers.get(type);
    if (typeof enable !== 'undefined' ? enable : workflow.get('enabled')) {
      await trigger.on(workflow);
    } else {
      await trigger.off(workflow);
    }
  }
}
