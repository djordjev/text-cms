import { FC, Fragment, useState } from 'react';

import { Condition } from '~/components/modals/Condition';

export interface ConditionEditorProps {
  fileName: string;
  conditions: string[];
  setConditions: (condition: string[]) => void;
}

const ConditionEditor: FC<ConditionEditorProps> = (props) => {
  const { conditions, fileName, setConditions } = props;

  // Hooks
  const [open, setOpen] = useState(false);

  // Handlers
  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const onSave = (res: string) => {
    setConditions([...conditions, res]);
  };

  const onRemove = (index: number) => () => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  // Markup
  const renderCurrentConditions = () => {
    if (!conditions.length) {
      return <div className="u-text-primary-100 u-font-bold">Always</div>;
    }

    return conditions.map((cond, index) => {
      const isLast = index === conditions.length - 1;
      return (
        <Fragment key={cond}>
          <div className="u-text-primary-100 u-font-bold u-flex u-justify-between">
            {cond}
            <button type="button" onClick={onRemove(index)}>
              <img
                alt="close"
                height={28}
                width={28}
                src="/svg/close.svg"
                loading="lazy"
              />
            </button>
          </div>
          {!isLast && <div className="u-font-bold u-text-center">OR</div>}
        </Fragment>
      );
    });
  };

  return (
    <div className="u-flex container-sm u-mx-auto u-mb-3xs u-items-center">
      <div className="u-max-w-3z u-mr-2x">
        <h3 className="u-font-bold u-text-lg">Condition Editor</h3>
        <p className="u-text-sm u-mb-2x">
          When requesting file <span className="u-font-bold">{fileName}</span>{' '}
          this variation will be returned if:
        </p>

        <button
          className="btn-secondary u-w-full"
          onClick={onOpen}
          type="button"
        >
          Add Condition
        </button>
      </div>

      <div className="u-flex-1">{renderCurrentConditions()}</div>

      {open && <Condition open={open} onClose={onClose} onSave={onSave} />}
    </div>
  );
};

export { ConditionEditor };
