import ExecutionModel from "../models/Execution";
import FlowNodeModel from "../models/FlowNode";
declare const _default: {
    run(this: FlowNodeModel, input: any, execution: ExecutionModel): Promise<{
        result: import("@znewbee/database").Model<any, any> | import("@znewbee/database").Model<any, any>[];
        status: number;
    }>;
};
export default _default;
