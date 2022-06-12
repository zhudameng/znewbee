export interface JwtOptions {
    secret: string;
    expiresIn?: string;
}
export declare class JwtService {
    protected options: JwtOptions;
    constructor(options: JwtOptions);
    private expiresIn;
    private secret;
    sign(payload: any): string;
    decode(token: string): Promise<any>;
}
