import FlowNodeModel from "../models/FlowNode";
declare const _default: {
    run(this: FlowNodeModel, prevJob: any, execution: any): Promise<{
        result: any;
        status: number;
    }>;
};
export default _default;
