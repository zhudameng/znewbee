import { Model } from '@znewbee/database';
import nodemailer from 'nodemailer';
export declare class NotificationService extends Model {
    [key: string]: any;
    static createTransport: typeof nodemailer.createTransport;
    private _transporter;
    get transporter(): any;
    send(options: any): Promise<any>;
}
