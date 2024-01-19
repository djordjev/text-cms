import { Listbox } from '@headlessui/react';
import { FC } from 'react';

import { CustomElement } from '~/components/editor/VariationEditor/types';

const TEXT_STYLES = [
  { id: 'heading', name: 'Heading', unavailable: false },
  { id: 'paragraph', name: 'Paragraph', unavailable: false }
];

export interface TextStyleProps {
  onChange: (selected: Exclude<CustomElement, 'children'>) => void;
  value: any;
}

const TextStyle: FC<TextStyleProps> = (props) => {
  const { onChange, value } = props;

  // Setup
  const selected = TEXT_STYLES.find((ts) => ts.id === value);

  // Handler
  const onChangeHandler = (val: { id: 'heading' | 'paragraph' }) => {
    const { id } = val;

    if (id === 'paragraph') {
      onChange({ type: id });
      return;
    }

    onChange({ type: id, level: 3 });
  };

  return (
    <Listbox value={value} onChange={onChangeHandler}>
      <Listbox.Button>{selected?.name ?? 'Djordje'}</Listbox.Button>
      <Listbox.Options>
        {TEXT_STYLES.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export { TextStyle };
