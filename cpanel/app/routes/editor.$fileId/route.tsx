import { useLoaderData } from '@remix-run/react';

import { VariationEditor } from '~/components/editor/VariationEditor';

import { loader } from './loader';

const Editor = () => {
  // Hooks
  const { name } = useLoaderData<typeof loader>();

  return (
    <>
      <div>editing {name}</div>
      <VariationEditor />
    </>
  );
};

export { loader };
export default Editor;
