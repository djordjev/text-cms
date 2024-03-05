import { IconInfinity, IconMathFunction } from '@tabler/icons-react';
import { FC } from 'react';

import { Condition } from '~/components/editor/Condition';
import { DEFAULT_CONDITION_DESCRIPTOR } from '~/constants/condition';
import { ConditionAndChain, ConditionGroup } from '~/types/condition';

export interface ConditionEditorProps {
  className?: string;
  conditions?: ConditionGroup;
  onChange?: (newConditions: ConditionGroup) => void;
}

const ConditionEditor: FC<ConditionEditorProps> = (props) => {
  const { className, conditions = [], onChange } = props;

  // Setup
  const hasCondition = !!conditions?.length;

  // Handlers
  const onAddNewVariation = () => {
    onChange?.([...conditions, [DEFAULT_CONDITION_DESCRIPTOR]]);
  };

  const onChainChange = (index: number, newChain: ConditionAndChain) => {
    const newGroup = [...conditions];
    newGroup[index] = newChain;

    onChange?.(newGroup);
  };

  // Markdown
  const renderTitle = () => {
    const Icon = hasCondition ? IconMathFunction : IconInfinity;
    const copy = hasCondition
      ? 'This variation renders under following conditions:'
      : 'This variation renders unconditionally!';

    return (
      <div className="u-py-2x u-font-bold u-text-primary u-tracking-wide">
        <Icon className="u-inline" />
        {copy}
      </div>
    );
  };

  const renderChain = (chain: ConditionAndChain, index: number) => {
    return (
      <Condition
        andChain={chain}
        index={index}
        key={index}
        onChainChange={onChainChange}
      />
    );
  };

  const renderConditions = () => {
    if (!conditions?.length) return null;

    return <div>{conditions.map(renderChain)}</div>;
  };

  return (
    <div className={className}>
      {renderTitle()}
      {renderConditions()}
      <button
        className="u-btn u-btn-outline u-btn-secondary u-uppercase"
        onClick={onAddNewVariation}
        type="button"
      >
        Add new condition
      </button>
    </div>
  );
};

export { ConditionEditor };
