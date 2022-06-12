import { Database, Model } from '@znewbee/database';
import { BelongsToGetAssociationMixin } from 'sequelize';
import WorkflowModel from './Workflow';
export default class FlowNodeModel extends Model {
    static readonly database: Database;
    id: number;
    title: string;
    branchIndex: null | number;
    type: string;
    config: any;
    createdAt: Date;
    updatedAt: Date;
    upstream: FlowNodeModel;
    downstream: FlowNodeModel;
    workflow?: WorkflowModel;
    getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;
}
