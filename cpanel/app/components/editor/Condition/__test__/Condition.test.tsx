import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Condition, ConditionProps } from '../Condition';

test('Condition', () => {
  const onChainChange = vi.fn();

  const props: ConditionProps = {
    andChain: [
      ['first_name', '=', 'Djordje'],
      ['last_name', '=', 'Vukovic']
    ],
    index: 3,
    onChainChange
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Condition {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot();

  // Handles adding a new variation
  fireEvent.click(screen.getByRole('button', { name: 'add and condition' }));
  expect(onChainChange).toHaveBeenCalledOnce();
  expect(onChainChange).toHaveBeenCalledWith(props.index, [
    ...props.andChain,
    ['', '=', '']
  ]);

  // Handles delete
  onChainChange.mockReset();
  const delBtns = screen.queryAllByRole('button', { name: 'delete-line' });
  expect(delBtns).toHaveLength(props.andChain.length);

  const firstDelete = delBtns.at(0);
  fireEvent.click(firstDelete!);
  expect(onChainChange).toHaveBeenCalledOnce();
  expect(onChainChange).toHaveBeenCalledWith(props.index, [
    ['last_name', '=', 'Vukovic']
  ]);

  // Handles change
  onChainChange.mockReset();
  const variables = screen.queryAllByRole('textbox', { name: 'Variable' });
  expect(variables).toHaveLength(2);

  const firstVar = variables.at(0);
  fireEvent.change(firstVar!, { target: { value: 'new-var' } });

  expect(onChainChange).toHaveBeenCalledOnce();
  expect(onChainChange).toHaveBeenCalledWith(props.index, [
    ['new-var', '=', 'Djordje'],
    [...props.andChain[1]]
  ]);
});
