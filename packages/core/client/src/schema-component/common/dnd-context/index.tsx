import { DndContext as DndKitContext, DragEndEvent, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import { observer } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAPIClient } from '../../../';
import { createDesignable, useDesignable } from '../../hooks';

const useDragEnd = (props?: any) => {
  const { refresh } = useDesignable();
  const api = useAPIClient();
  const { t } = useTranslation();

  return (event: DragEndEvent) => {
    const { active, over } = event;
    const activeSchema = active?.data?.current?.schema;
    const overSchema = over?.data?.current?.schema;
    const insertAdjacent = over?.data?.current?.insertAdjacent;
    const breakRemoveOn = over?.data?.current?.breakRemoveOn;
    const wrapSchema = over?.data?.current?.wrapSchema;

    if (!activeSchema || !overSchema) {
      props?.onDragEnd?.(event);
      return;
    }

    if (activeSchema === overSchema) {
      props?.onDragEnd?.(event);
      return;
    }

    const dn = createDesignable({
      t,
      api,
      refresh,
      current: overSchema,
    });

    dn.loadAPIClientEvents();

    if (activeSchema.parent === overSchema.parent) {
      dn.insertBeforeBeginOrAfterEnd(activeSchema);
      props?.onDragEnd?.(event);
      return;
    }

    if (insertAdjacent) {
      dn.insertAdjacent(insertAdjacent, activeSchema, {
        wrap: wrapSchema,
        breakRemoveOn,
        removeParentsIfNoChildren: true,
      });
      props?.onDragEnd?.(event);
      return;
    }
  };
};

export const DndContext = observer((props: Props) => {
  const { t } = useTranslation();
  return (
    <DndKitContext collisionDetection={rectIntersection} {...props} onDragEnd={useDragEnd(props)}>
      <DragOverlay
        dropAnimation={{
          duration: 10,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>{t('Dragging')}</span>
      </DragOverlay>
      {props.children}
    </DndKitContext>
  );
});
