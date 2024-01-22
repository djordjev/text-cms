import { TEXT_STYLES } from '~/components/editor/TextStyle/constants';
import { CustomElement } from '~/components/editor/VariationEditor/types';

const getSelectedStyleOption = (selected?: CustomElement) => {
  if (!selected) return TEXT_STYLES[TEXT_STYLES.length - 1].id;

  const { type } = selected;

  if (type === 'heading') {
    const { level = 3 } = selected;
    return `${type}_${level}`;
  }

  return type;
};

export { getSelectedStyleOption };
