export declare const DetailsActionInitializers: {
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
    }[];
};
