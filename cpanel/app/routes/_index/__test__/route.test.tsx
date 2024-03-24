import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import Route from '../route';

test('Route', async () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Route />,
        loader() {
          return [
            {
              type: 'heading',
              children: [{ text: 'Heading' }],
              level: 2
            },
            {
              type: 'paragraph',
              children: [{ text: 'Paragraph' }]
            }
          ];
        }
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(await screen.findByText('Heading')).toBeInTheDocument();
  expect(screen.getByText('Paragraph')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
