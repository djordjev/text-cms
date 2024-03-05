import { IconVariablePlus } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC } from 'react';

import { DEFAULT_CONDITION_DESCRIPTOR } from '~/constants/condition';
import { ConditionAndChain, ConditionDescriptor } from '~/types/condition';

import { Line } from './Line';

export interface ConditionProps {
  andChain: ConditionAndChain;
  className?: string;
  index: number;
  onChainChange: (index: number, newChain: ConditionAndChain) => void;
}

const Condition: FC<ConditionProps> = (props) => {
  const { andChain, className, index, onChainChange } = props;

  // Styles
  const classes = classnames(
    'u-p-2x u-border u-border-solid u-border-info u-rounded-lg u-mb-3xs',
    className
  );

  // Handlers
  const onDelete = (idx: number) => {
    const copy = andChain.slice();
    copy.splice(idx, 1);
    onChainChange(index, copy);
  };

  const onAdd = () => {
    const newChain = [...andChain, DEFAULT_CONDITION_DESCRIPTOR];
    onChainChange(index, newChain);
  };

  const onDescriptorChange = (
    newDescriptor: ConditionDescriptor,
    idx: number
  ) => {
    const newChain = [...andChain];
    newChain[idx] = newDescriptor;

    onChainChange(index, newChain);
  };

  // Markdown
  const renderConditionFactor = (
    descriptor: ConditionDescriptor,
    andIndex: number
  ) => {
    return (
      <Line
        className="u-mb-1x last:u-mb-0"
        descriptor={descriptor}
        index={andIndex}
        key={andIndex}
        onChange={onDescriptorChange}
        onDelete={onDelete}
      />
    );
  };

  const renderChain = () => {
    if (!andChain.length) return null;

    return (
      <div>
        {andChain.map(renderConditionFactor)}
        <button
          aria-label="add and condition"
          className="u-btm-sm u-btn-link u-mt-2xs"
          onClick={onAdd}
          type="button"
        >
          <IconVariablePlus className="u-inline u-mr-1xs" /> Add AND condition
        </button>
      </div>
    );
  };

  return <div className={classes}>{renderChain()}</div>;
};

export { Condition };
