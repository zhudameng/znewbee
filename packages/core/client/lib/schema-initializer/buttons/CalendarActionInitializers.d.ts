export declare const CalendarActionInitializers: {
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
                title: string;
                'x-component': string;
                'x-action': string;
                'x-align': string;
                'x-designer'?: undefined;
                'x-decorator'?: undefined;
                'x-acl-action-props'?: undefined;
            };
        } | {
            type: string;
            title: string;
            component: string;
            schema: {
                title: string;
                'x-component': string;
                'x-action': string;
                'x-align': string;
                'x-designer': string;
                'x-decorator'?: undefined;
                'x-acl-action-props'?: undefined;
            };
        } | {
            type: string;
            title: string;
            component: string;
            schema: {
                'x-align': string;
                title?: undefined;
                'x-component'?: undefined;
                'x-action'?: undefined;
                'x-designer'?: undefined;
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
                title?: undefined;
                'x-component'?: undefined;
                'x-action'?: undefined;
                'x-designer'?: undefined;
            };
        })[];
    }[];
};
