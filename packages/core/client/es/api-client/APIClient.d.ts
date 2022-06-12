import { APIClient as APIClientSDK } from '@znewbee/sdk';
import { Result } from 'ahooks/lib/useRequest/src/types';
export declare class APIClient extends APIClientSDK {
    services: Record<string, Result<any, any>>;
}
