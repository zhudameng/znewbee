/// <reference types="react" />
import { ButtonProps, DrawerProps } from 'antd';
export declare type ActionProps = ButtonProps & {
    component?: any;
    useAction?: () => {
        run(): Promise<void>;
    };
};
export declare type ComposedAction = React.FC<ActionProps> & {
    Drawer?: ComposedActionDrawer;
    [key: string]: any;
};
export declare type ComposedActionDrawer = React.FC<DrawerProps & {
    footerNodeName?: string;
}> & {
    Footer?: React.FC;
};
