import React from 'react';
declare type ComposedMenu = React.FC<any> & {
    Item?: React.FC<any>;
    URL?: React.FC<any>;
    SubMenu?: React.FC<any>;
    Designer?: React.FC<any>;
};
export declare const Menu: ComposedMenu;
export {};
