import { Trigger } from ".";
import WorkflowModel from "../models/Workflow";
export interface CollectionChangeTriggerConfig {
    collection: string;
    mode: number;
    condition: any;
}
export default class CollectionTrigger implements Trigger {
    db: any;
    events: Map<any, any>;
    constructor({ app }: {
        app: any;
    });
    on(workflow: WorkflowModel): void;
    off(workflow: WorkflowModel): void;
}
