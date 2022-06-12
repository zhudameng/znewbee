export declare const icons: Map<string, any>;
export declare function registerIcon(type: string, icon?: any): void;
export declare function hasIcon(type: string): boolean;
export declare function registerIcons(components: any): void;
interface IconProps {
    type: string;
    component?: any;
    [key: string]: any;
}
export declare const Icon: {
    (props: IconProps): JSX.Element;
    createFromIconfontCN(options: any): void;
    register(icons?: any): void;
};
export default Icon;
