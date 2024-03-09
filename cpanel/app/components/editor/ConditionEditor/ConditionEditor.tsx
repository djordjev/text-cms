import { IconInfinity, IconMathFunction } from '@tabler/icons-react';
import { FC, useMemo, useState } from 'react';

import { Condition } from '~/components/editor/Condition';
import { DEFAULT_CONDITION_DESCRIPTOR } from '~/constants/condition';
import { ConditionAndChain, ConditionGroup } from '~/types/condition';

export interface ConditionEditorProps {
  className?: string;
  defaultCondition?: ConditionGroup;
}

const ConditionEditor: FC<ConditionEditorProps> = (props) => {
  const { className, defaultCondition = [] } = props;

  // Hooks
  const [condition, setCondition] = useState<ConditionGroup>(defaultCondition);

  // Setup
  const hasCondition = !!condition?.length;
  const value = useMemo(() => JSON.stringify(condition), [condition]);

  // Handlers
  const onAddNewVariation = () => {
    setCondition([...condition, [DEFAULT_CONDITION_DESCRIPTOR]]);
  };

  const onChainChange = (index: number, newChain: ConditionAndChain) => {
    const newGroup = [...condition];
    newGroup[index] = newChain;

    setCondition(newGroup);
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
    if (!condition?.length) return null;

    return <div>{condition.map(renderChain)}</div>;
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

      <input
        data-testid="condition"
        name="condition"
        type="hidden"
        value={value}
      />
    </div>
  );
};

export { ConditionEditor };
