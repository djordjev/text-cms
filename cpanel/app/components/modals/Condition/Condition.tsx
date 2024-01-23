import { Dialog } from '@headlessui/react';
import { FC, FormEvent, useState } from 'react';

export interface ConditionProps {
  open: boolean;
  onClose: () => void;
  onSave: (condition: string) => void;
}

const Condition: FC<ConditionProps> = (props) => {
  const { onClose, onSave, open } = props;

  // Hooks
  const [count, setCount] = useState(1);

  // Handlers
  const onClick = () => {
    setCount(count + 1);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements;
    const conditions: { name: string; value: string }[] = [];

    for (let i = 0; i < count; i++) {
      const currentNameElement = elements.namedItem(
        `${i}_name`
      ) as HTMLInputElement;

      const currentValueElement = elements.namedItem(
        `${i}_value`
      ) as HTMLInputElement;

      const currentName = currentNameElement?.value;
      const currentValue = currentValueElement?.value;

      if (!currentName || !currentValue) continue;

      conditions.push({ name: currentName, value: currentValue });
    }

    if (!conditions.length) {
      onClose();
      return;
    }

    const condString = conditions.map(({ name, value }) => `${name}==${value}`);

    const result = `(${condString.join(' AND ')})`;

    onSave(result);
    onClose();
  };

  // Markup
  const renderConditions = () => {
    const arr = new Array(count).fill(0);

    return arr.map((_, index) => {
      const idName = `${index}_name`;
      const idValue = `${index}_value`;

      return (
        <div
          className="u-flex u-flex-nowrap u-gap-2x u-items-center u-mb-3xs"
          key={index}
        >
          <label htmlFor={idName}>Variable Name</label>
          <input
            className="u-min-h-5x u-border u-border-solid u-border-gray-2 u-rounded u-px-2xs"
            id={idName}
            name={idName}
            type="text"
          />

          <label htmlFor={idValue}>Variable Value</label>
          <input
            className="u-min-h-5x u-border u-border-solid u-border-gray-2 u-rounded u-px-2xs"
            id={idValue}
            name={idValue}
            type="text"
          />
        </div>
      );
    });
  };

  return (
    <Dialog
      className="u-fixed u-z-10 u-inset-0 u-overflow-y-auto"
      open={open}
      onClose={onClose}
    >
      <div className="u-flex u-items-center u-justify-center u-h-3/4">
        <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15" />

        <Dialog.Panel className="u-relative u-bg-white u-rounded u-max-w-6z u-mx-auto u-p-2x u-block">
          <Dialog.Title className="u-text-primary-300 u-text-lg u-uppercase u-font-bold u-mb-2x u-flex u-items-center">
            <span className="u-flex-1">Add condition</span>
            <button type="button" onClick={onClose}>
              <img
                alt="close"
                height={28}
                width={28}
                src="/svg/close.svg"
                loading="lazy"
              />
            </button>
          </Dialog.Title>

          <form onSubmit={onSubmit}>
            {renderConditions()}

            <div className="u-flex u-flex-col u-gap-6xs u-justify-center">
              <button onClick={onClick} type="button">
                Add <span className="u-font-bold">And</span> Condition
              </button>

              <button className="btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export { Condition };
