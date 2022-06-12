export declare const useColumnSchema: () => {
    columnSchema?: undefined;
    fieldSchema?: undefined;
    collectionField?: undefined;
    uiSchema?: undefined;
} | {
    columnSchema: import("@formily/react").Schema<any, any, any, any, any, any, any, any, any>;
    fieldSchema: any;
    collectionField: import("../../../").CollectionFieldOptions;
    uiSchema: any;
};
export declare const TableColumnDecorator: (props: any) => JSX.Element;
