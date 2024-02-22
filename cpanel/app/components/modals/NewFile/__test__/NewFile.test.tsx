import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { NewFile, NewFileProps } from '../NewFile';

describe('modal/NewFile', () => {
  const onClose = vi.fn();

  let props: NewFileProps;

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <NewFile {...props} /> }
    ]);

    return <RemixStub />;
  };

  beforeEach(() => {
    props = { type: null, onClose };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders and closes', () => {
    props.type = 'new-file';

    const { baseElement } = render(createComponent());

    expect(screen.getByText('Create new file')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'close' }));

    expect(onClose).toHaveBeenCalledOnce();

    expect(baseElement).toMatchSnapshot();
  });
});
