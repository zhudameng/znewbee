export declare const useA: () => {
    run(): Promise<void>;
};
export declare const useActionContext: () => {
    setVisible(visible: boolean, confirm?: boolean): void;
    button?: any;
    visible?: boolean;
    openMode?: "drawer" | "modal" | "page";
    containerRefKey?: string;
    formValueChanged?: boolean;
    setFormValueChanged?: (v: boolean) => void;
};
export declare const useCloseAction: () => {
    run(): Promise<void>;
};
