import { Database, Model } from '@znewbee/database';
import { HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import ExecutionModel from './Execution';
import FlowNodeModel from './FlowNode';
export default class WorkflowModel extends Model {
    static database: Database;
    id: number;
    title: string;
    enabled: boolean;
    description?: string;
    type: string;
    config: any;
    useTransaction: boolean;
    executed: number;
    createdAt: Date;
    updatedAt: Date;
    nodes: FlowNodeModel[];
    getNodes: HasManyGetAssociationsMixin<FlowNodeModel>;
    createNode: HasManyCreateAssociationMixin<FlowNodeModel>;
    executions: ExecutionModel[];
    countExecutions: HasManyCountAssociationsMixin;
    getExecutions: HasManyGetAssociationsMixin<ExecutionModel>;
    createExecution: HasManyCreateAssociationMixin<ExecutionModel>;
    getTransaction(options: any): any;
    trigger: (context: Object, options?: {}) => Promise<ExecutionModel>;
}
