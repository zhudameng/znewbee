import { ModelCtor } from 'sequelize';
import { AssociationKeysToBeUpdate, BlackList, WhiteList } from './repository';
declare type UpdateValueItem = string | number | UpdateValues;
declare type UpdateValues = {
    [key: string]: UpdateValueItem | Array<UpdateValueItem>;
};
declare type UpdateAction = 'create' | 'update';
export declare class UpdateGuard {
    model: ModelCtor<any>;
    action: UpdateAction;
    private associationKeysToBeUpdate;
    private blackList;
    private whiteList;
    setAction(action: UpdateAction): void;
    setModel(model: ModelCtor<any>): void;
    setAssociationKeysToBeUpdate(associationKeysToBeUpdate: AssociationKeysToBeUpdate): void;
    setWhiteList(whiteList: WhiteList): void;
    setBlackList(blackList: BlackList): void;
    /**
     * Sanitize values by whitelist blacklist
     * @param values
     */
    sanitize(values: UpdateValues): {};
    static fromOptions(model: any, options: any): UpdateGuard;
}
export {};
