declare function withDroppable(Component: any): ({ children, ...droppableProps }: {
    [x: string]: any;
    children: any;
}) => JSX.Element;
export default withDroppable;
