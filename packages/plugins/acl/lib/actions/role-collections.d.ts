declare const roleCollectionsResource: {
    name: string;
    actions: {
        list(ctx: any, next: any): Promise<void>;
    };
};
export { roleCollectionsResource };
