/// <reference types="react" />
export declare function useFlowContext(): any;
export declare function WorkflowCanvas(): JSX.Element;
export declare function Branch({ from, entry, branchIndex, controller }: {
    from?: any;
    entry?: any;
    branchIndex?: any;
    controller?: any;
}): JSX.Element;
interface AddButtonProps {
    upstream: any;
    branchIndex?: number;
}
export declare function AddButton({ upstream, branchIndex }: AddButtonProps): JSX.Element;
export {};
