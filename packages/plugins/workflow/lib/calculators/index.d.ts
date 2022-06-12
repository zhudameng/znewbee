import { Registry } from "@znewbee/utils";
import ExecutionModel from '../models/Execution';
import JobModel from '../models/Job';
export declare const calculators: Registry<Function>;
export default calculators;
export declare type OperandType = '$context' | '$input' | '$jobsMapByNodeId' | '$calculation';
export declare type ObjectGetterOptions = {
    path?: string;
};
export declare type JobGetterOptions = ObjectGetterOptions & {
    nodeId: number;
};
export declare type CalculationOptions = {
    calculator: string;
    operands: Operand[];
};
export declare type ConstantOperand = {
    type?: 'constant';
    value: any;
};
export declare type ContextOperand = {
    type: '$context';
    options: ObjectGetterOptions;
};
export declare type InputOperand = {
    type: '$input';
    options: ObjectGetterOptions;
};
export declare type JobOperand = {
    type: '$jobsMapByNodeId';
    options: JobGetterOptions;
};
export declare type Calculation = {
    type: '$calculation';
    options: CalculationOptions;
};
export declare type Operand = ContextOperand | InputOperand | JobOperand | ConstantOperand | Calculation;
export declare function calculate(operand: Operand, lastJob: JobModel, execution: ExecutionModel): any;
