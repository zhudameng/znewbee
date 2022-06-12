import { Plugin } from '@znewbee/server';
import WorkflowModel from './models/Workflow';
import { Trigger } from './triggers';
import { Registry } from '@znewbee/utils';
export default class extends Plugin {
    triggers: Registry<Trigger>;
    getName(): string;
    load(options?: {}): Promise<void>;
    toggle(workflow: WorkflowModel, enable?: boolean): Promise<void>;
}
