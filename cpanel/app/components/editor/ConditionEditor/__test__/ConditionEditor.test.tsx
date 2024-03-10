import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { DEFAULT_CONDITION_DESCRIPTOR } from '~/constants/condition';

import { ConditionEditor, ConditionEditorProps } from '../ConditionEditor';

describe('ConditionEditor', () => {
  let props: ConditionEditorProps;

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ConditionEditor {...props} />
      }
    ]);

    return <RemixStub />;
  };

  beforeEach(() => {
    props = {
      defaultCondition: [
        [
          ['a1', '=', 'on'],
          ['a2', '=', 'off'],
          ['a3', '>', '3']
        ],
        [['b1', '<', '100']]
      ]
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders with conditions', () => {
    const { container } = render(createComponent());

    expect(
      screen.getByText('This variation renders under following conditions:')
    ).toBeInTheDocument();

    const variables = screen.queryAllByRole('textbox', { name: 'Variable' });
    expect(variables).toHaveLength(4);

    fireEvent.click(screen.getByRole('button', { name: 'Add new condition' }));

    const values = screen.queryAllByRole('textbox', { name: 'Value' });
    expect(values).toHaveLength(5);

    const operators = screen.queryAllByRole('combobox', { name: 'operator' });
    expect(operators).toHaveLength(5);

    const hidden = screen.getByTestId('condition') as HTMLInputElement;
    expect(hidden.value).toBe(
      JSON.stringify([
        ...props.defaultCondition!,
        [DEFAULT_CONDITION_DESCRIPTOR]
      ])
    );

    expect(container.childNodes).toMatchSnapshot();
  });

  it('renders empty', () => {
    props.defaultCondition = [];
    const { container } = render(createComponent());

    expect(
      screen.getByText('This variation renders unconditionally!')
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('textbox', { name: 'Value' })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Add new condition' }));

    const hidden = screen.getByTestId('condition') as HTMLInputElement;
    expect(hidden.value).toBe(JSON.stringify([[DEFAULT_CONDITION_DESCRIPTOR]]));

    expect(container.childNodes).toMatchSnapshot();
  });
});
