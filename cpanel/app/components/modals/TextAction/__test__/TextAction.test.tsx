import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { TextAction, TextActionProps } from '../TextAction';

test('TextAction', () => {
  const onComplete = vi.fn();

  const props: TextActionProps = { onComplete, open: true };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <TextAction {...props} /> }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText('Attach action to text node')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();

  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(onComplete).toHaveBeenCalledOnce();
  expect(onComplete).toHaveBeenCalledWith();

  vi.resetAllMocks();

  const select = screen.getByLabelText('type selection');
  fireEvent.change(select, { target: { value: 'primary' } });

  const actionEvent = { target: { value: 'Test Action' } };
  fireEvent.change(screen.getByLabelText('Action'), actionEvent);

  fireEvent.click(screen.getByRole('button', { name: 'Add Action' }));

  expect(onComplete).toHaveBeenCalledOnce();
  expect(onComplete).toHaveBeenCalledWith({
    action: 'Test Action',
    href: '',
    type: 'primary'
  });
});
