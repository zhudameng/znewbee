declare const availableActionResource: {
    name: string;
    actions: {
        list(ctx: any, next: any): Promise<void>;
    };
};
export { availableActionResource };
