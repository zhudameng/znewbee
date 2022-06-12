import { Plugin } from '@znewbee/server';
import { JwtOptions, JwtService } from './jwt-service';
export interface UserPluginConfig {
    jwt: JwtOptions;
}
export default class UsersPlugin extends Plugin<UserPluginConfig> {
    jwtService: JwtService;
    constructor(app: any, options: any);
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getInstallingData(options?: any): {
        rootEmail: any;
        rootPassword: any;
        rootNickname: any;
    };
    install(options: any): Promise<void>;
    getName(): string;
}
