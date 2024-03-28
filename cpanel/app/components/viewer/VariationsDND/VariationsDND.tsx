import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { FC } from 'react';

import { DraggableVariation } from '~/components/viewer/DraggableVariation';
import { FileVariation } from '~/types';

export interface VariationsDNDProps {
  id: number;
  onDragEnd: (data: { from: string; to: string }) => void;
  variations: FileVariation[];
}

const VariationsDND: FC<VariationsDNDProps> = (props) => {
  const { id, onDragEnd, variations } = props;

  // Hooks
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // Handlers
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    onDragEnd({ from: `${active.id}`, to: `${over.id}` });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={variations}
        strategy={verticalListSortingStrategy}
      >
        {variations.map((v) => (
          <DraggableVariation key={v.id} fileId={id} variation={v} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export { VariationsDND };
