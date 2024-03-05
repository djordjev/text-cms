import {
  IconSquareChevronRight,
  IconTrash,
  IconVariable
} from '@tabler/icons-react';
import classnames from 'classnames';
import { ChangeEvent, FC } from 'react';

import { ConditionDescriptor } from '~/types/condition';

export interface LineProps {
  className?: string;
  descriptor: ConditionDescriptor;
  index: number;
  onChange: (descriptor: ConditionDescriptor, index: number) => void;
  onDelete: (index: number) => void;
}

const Line: FC<LineProps> = (props) => {
  const { className, descriptor, index, onChange, onDelete } = props;

  // Setup
  const [variable, operator, value] = descriptor;

  // Styles
  const classes = classnames('u-flex u-gap-4x', className);

  // Handlers
  const onDeleteHandler = () => {
    onDelete(index);
  };

  const onVariableChange =
    (descriptorIndex: number) =>
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const value = e.target.value;

      const newDescriptor: ConditionDescriptor = [...descriptor];
      newDescriptor[descriptorIndex] = value;

      onChange(newDescriptor, index);
    };

  return (
    <div className={classes}>
      <label className="u-input u-input-bordered u-flex u-items-center u-gap-2 u-flex-1">
        <IconVariable aria-label="Variable" className="u-mr-2x" />
        <input
          className="u-grow"
          onChange={onVariableChange(0)}
          placeholder="Enter variable name from payload"
          type="text"
          value={variable}
        />
      </label>

      <select
        aria-label="operator"
        className="u-select u-select-bordered"
        onChange={onVariableChange(1)}
        value={operator}
      >
        <option>=</option>
        <option>{'>'}</option>
        <option>{'>='}</option>
        <option>{'<'}</option>
        <option>{'<='}</option>
      </select>

      <label className="u-input u-input-bordered u-flex u-items-center u-gap-2 u-flex-1">
        <IconSquareChevronRight aria-label="Value" className="u-mr-2x" />
        <input
          className="u-grow"
          onChange={onVariableChange(2)}
          placeholder="Enter required value"
          type="text"
          value={value}
        />
      </label>

      <button aria-label="delete-line" onClick={onDeleteHandler} type="button">
        <IconTrash />
      </button>
    </div>
  );
};

export { Line };
