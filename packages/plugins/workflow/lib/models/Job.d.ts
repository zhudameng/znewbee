import { Model } from '@znewbee/database';
import { BelongsToGetAssociationMixin } from 'sequelize';
import FlowNodeModel from './FlowNode';
export default class JobModel extends Model {
    id: number;
    status: number;
    result: any;
    createdAt: Date;
    updatedAt: Date;
    upstreamId: number;
    upstream: JobModel;
    nodeId: number;
    node?: FlowNodeModel;
    getNode: BelongsToGetAssociationMixin<FlowNodeModel>;
}
