export declare const KanbanActionInitializers: {
    title: string;
    icon: string;
    style: {
        marginLeft: number;
    };
    items: {
        type: string;
        title: string;
        children: ({
            type: string;
            title: string;
            component: string;
            schema: {
                'x-align': string;
                'x-decorator'?: undefined;
                'x-acl-action-props'?: undefined;
            };
        } | {
            type: string;
            title: string;
            component: string;
            schema: {
                'x-align': string;
                'x-decorator': string;
                'x-acl-action-props': {
                    skipScopeCheck: boolean;
                };
            };
        })[];
    }[];
};
