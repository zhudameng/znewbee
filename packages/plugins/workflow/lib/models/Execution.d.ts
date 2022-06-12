import { Database, Model } from '@znewbee/database';
import { BelongsToGetAssociationMixin, HasManyGetAssociationsMixin, Transaction } from 'sequelize';
import WorkflowModel from './Workflow';
import FlowNodeModel from './FlowNode';
import JobModel from './Job';
export interface ExecutionOptions {
    transaction?: Transaction;
}
export default class ExecutionModel extends Model {
    static readonly database: Database;
    id: number;
    title: string;
    context: any;
    status: number;
    useTransaction: boolean;
    transaction: string;
    createdAt: Date;
    updatedAt: Date;
    workflow?: WorkflowModel;
    getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;
    jobs?: JobModel[];
    getJobs: HasManyGetAssociationsMixin<JobModel>;
    options: ExecutionOptions;
    tx: Transaction;
    nodes: Array<FlowNodeModel>;
    nodesMap: Map<number, FlowNodeModel>;
    jobsMap: Map<number, JobModel>;
    jobsMapByNodeId: {
        [key: number]: any;
    };
    static StatusMap: {
        [x: number]: number;
    };
    makeNodes(nodes?: any[]): void;
    makeJobs(jobs: Array<JobModel>): void;
    getTransaction(): Promise<Transaction>;
    prepare(options: any, commit?: boolean): Promise<void>;
    start(options: ExecutionOptions): Promise<void>;
    resume(job: JobModel, options: ExecutionOptions): Promise<void>;
    private commit;
    private exec;
    run(node: any, input?: any): any;
    end(node: any, job: any): any;
    recall(node: any, job: any): any;
    exit(job: JobModel | null): Promise<any>;
    saveJob(payload: any): Promise<JobModel>;
    findBranchStartNode(node: FlowNodeModel): FlowNodeModel | null;
    findBranchParentNode(node: FlowNodeModel): FlowNodeModel | null;
    findBranchParentJob(job: JobModel, node: FlowNodeModel): JobModel | null;
    getParsedValue(value: any, node?: any): any;
}
