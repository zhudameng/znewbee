/// <reference types="react" />
declare function Column({ children, index: columnIndex, renderCard, renderCardAdder, renderColumnHeader, disableColumnDrag, disableCardDrag, onCardNew, allowAddCard, cardAdderPosition, }: {
    children: any;
    index: any;
    renderCard: any;
    renderCardAdder?: ({ column, onConfirm }: {
        column: any;
        onConfirm: any;
    }) => JSX.Element;
    renderColumnHeader: any;
    disableColumnDrag: any;
    disableCardDrag: any;
    onCardNew: any;
    allowAddCard: any;
    cardAdderPosition?: string;
}): JSX.Element;
export default Column;
