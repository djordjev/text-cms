import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { Line, LineProps } from '../Line';

test('Line', () => {
  const props: LineProps = {
    descriptor: ['value', '=', 'on'],
    index: 2,
    onChange: vi.fn(),
    onDelete: vi.fn()
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Line {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  // Renders all inputs
  expect(screen.getByRole('textbox', { name: 'Variable' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Value' })).toBeInTheDocument();

  expect(screen.getByRole('option', { name: '=' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '<' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '<=' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '>' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '>=' })).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();

  // Calls onDelete
  fireEvent.click(screen.getByRole('button', { name: 'delete-line' }));
  expect(props.onDelete).toHaveBeenCalledOnce();
  expect(props.onDelete).toHaveBeenCalledWith(props.index);

  // Calls onChange for variable input
  const variableInput = screen.getByRole('textbox', { name: 'Variable' });
  fireEvent.change(variableInput, { target: { value: 'new-var' } });

  expect(props.onChange).toHaveBeenCalledOnce();
  expect(props.onChange).toHaveBeenCalledWith(
    ['new-var', '=', 'on'],
    props.index
  );

  // Calls onChange for value input
  vi.resetAllMocks();
  const valueInput = screen.getByRole('textbox', { name: 'Value' });
  fireEvent.change(valueInput, { target: { value: 'new-value' } });

  expect(props.onChange).toHaveBeenCalledOnce();
  expect(props.onChange).toHaveBeenCalledWith(
    ['value', '=', 'new-value'],
    props.index
  );

  // Calls onChange for operator input
  vi.resetAllMocks();
  const operatorInput = screen.getByRole('combobox');
  fireEvent.change(operatorInput, { target: { value: '>' } });

  expect(props.onChange).toHaveBeenCalledOnce();
  expect(props.onChange).toHaveBeenCalledWith(
    ['value', '>', 'on'],
    props.index
  );
});
