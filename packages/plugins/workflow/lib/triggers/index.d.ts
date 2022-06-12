import WorkflowModel from '../models/Workflow';
export interface Trigger {
    on(workflow: WorkflowModel): void;
    off(workflow: WorkflowModel): void;
}
export default function (plugin: any): void;
