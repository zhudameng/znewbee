export interface AvailableActionOptions {
    /**
     * @deprecated
     */
    type: 'new-data' | 'old-data';
    displayName?: string;
    aliases?: string[] | string;
    resource?: string;
    onNewRecord?: boolean;
    allowConfigureFields?: boolean;
}
export declare class AclAvailableAction {
    name: string;
    options: AvailableActionOptions;
    constructor(name: string, options: AvailableActionOptions);
}
