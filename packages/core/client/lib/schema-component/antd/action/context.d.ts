/// <reference types="react" />
export declare const ActionContext: import("react").Context<ActionContextProps>;
export interface ActionContextProps {
    button?: any;
    visible?: boolean;
    setVisible?: (v: boolean) => void;
    openMode?: 'drawer' | 'modal' | 'page';
    containerRefKey?: string;
    formValueChanged?: boolean;
    setFormValueChanged?: (v: boolean) => void;
}
