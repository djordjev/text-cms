import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Home Page' },
    { name: 'description', content: 'Home Page' }
  ];
};

export default function Index() {
  return <div>Here comes random homepage</div>;
}
