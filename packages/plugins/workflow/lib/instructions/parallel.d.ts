import ExecutionModel from "../models/Execution";
import FlowNodeModel from "../models/FlowNode";
import JobModel from "../models/Job";
export declare const PARALLEL_MODE: {
    readonly ALL: "all";
    readonly ANY: "any";
    readonly RACE: "race";
};
declare const _default: {
    run(this: FlowNodeModel, prevJob: JobModel, execution: ExecutionModel): Promise<any>;
    resume(this: any, branchJob: any, execution: ExecutionModel): Promise<any>;
};
export default _default;
