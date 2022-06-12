import { Registry } from '@znewbee/utils';
import ExecutionModel from '../models/Execution';
import FlowNodeModel from '../models/FlowNode';
export interface Job {
    status: number;
    result?: unknown;
    [key: string]: unknown;
}
export declare type InstructionResult = Job | Promise<Job>;
export interface Instruction {
    run(this: FlowNodeModel, input: any, execution: ExecutionModel): InstructionResult;
    resume?(this: FlowNodeModel, input: any, execution: ExecutionModel): InstructionResult;
}
export declare const instructions: Registry<Instruction>;
export default instructions;
