import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

import { Variation, VariationProps } from '~/components/viewer/Variation';

export interface DraggableVariationProps extends VariationProps {}

const DraggableVariation: FC<DraggableVariationProps> = (props) => {
  const { variation } = props;

  // Hooks
  const sort = useSortable({ id: variation.id });

  // Setup
  const { id } = variation;
  const { attributes, listeners, setNodeRef, transform, transition } = sort;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      className="u-cursor-move"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Variation key={id} {...props} draggable={true} />
    </div>
  );
};

export { DraggableVariation };
