import Database, { Model } from '@znewbee/database';
export declare class Notification extends Model {
    [key: string]: any;
    get db(): Database;
    getReceiversByOptions(): Promise<any[]>;
    send(options?: any): Promise<void>;
    getSubject(): any;
    getBody(data: any): string;
}
