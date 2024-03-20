import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { Modal, ModalProps } from '../Modal';

test('Modal', () => {
  const onClose = vi.fn();

  const props: ModalProps = {
    children: <div data-testid="modal_content" />,
    onClose,
    open: true,
    title: 'test_title'
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Modal {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText(props.title!)).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
