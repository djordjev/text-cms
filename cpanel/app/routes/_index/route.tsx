import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { ErrorBoundary } from '~/components/global/ErrorBoundary';
import { Text } from '~/components/viewer/Text';

import { loader } from './loader';

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Home Page' },
    { name: 'description', content: 'Home Page' }
  ];
};

const Index = () => {
  // Data
  const data = useLoaderData<typeof loader>();

  return (
    <div className="u-p-4x">
      <Text displayClickAction={false} text={JSON.stringify(data)} />
    </div>
  );
};

export { ErrorBoundary, loader };
export default Index;
