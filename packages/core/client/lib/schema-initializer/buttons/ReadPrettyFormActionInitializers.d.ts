export declare const ReadPrettyFormActionInitializers: {
    title: string;
    icon: string;
    style: {
        marginLeft: number;
    };
    items: ({
        type: string;
        title: string;
        children: ({
            type: string;
            title: string;
            component: string;
            schema: {
                'x-component': string;
                'x-decorator': string;
                'x-component-props': {
                    type: string;
                };
            };
        } | {
            type: string;
            title: string;
            component: string;
            schema: {
                'x-component': string;
                'x-decorator': string;
                'x-component-props'?: undefined;
            };
        })[];
    } | {
        type: string;
        title?: undefined;
        children?: undefined;
    } | {
        type: string;
        title: string;
        children: ({
            type: string;
            title: string;
            component: string;
            schema: {
                type: string;
                title: string;
                'x-action': string;
                'x-designer': string;
                'x-component': string;
                'x-component-props': {
                    openMode: string;
                    useProps?: undefined;
                };
                properties: {
                    drawer: {
                        type: string;
                        title: string;
                        'x-component': string;
                        'x-component-props': {
                            className: string;
                        };
                        properties: {
                            tabs: {
                                type: string;
                                'x-component': string;
                                'x-component-props': {};
                                'x-initializer': string;
                                properties: {
                                    tab1: {
                                        type: string;
                                        title: string;
                                        'x-component': string;
                                        'x-designer': string;
                                        'x-component-props': {};
                                        properties: {
                                            grid: {
                                                type: string;
                                                'x-component': string;
                                                'x-initializer': string;
                                                properties: {};
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                'x-action-settings'?: undefined;
            };
        } | {
            type: string;
            title: string;
            component: string;
            schema: {
                title: string;
                'x-component': string;
                'x-designer': string;
                'x-action': string;
                'x-action-settings': {
                    assignedValues: {};
                    onSuccess: {
                        manualClose: boolean;
                        redirecting: boolean;
                        successMessage: string;
                    };
                };
                'x-component-props': {
                    useProps: string;
                    openMode?: undefined;
                };
                type?: undefined;
                properties?: undefined;
            };
        })[];
    })[];
};
