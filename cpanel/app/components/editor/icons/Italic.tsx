import { FC } from 'react';

import { COLORS } from '~/utils/constants';

import type { IconProps } from './Props';

const Italic: FC<IconProps> = (props) => {
  const { active, height, width } = props;

  // Setup
  const fill = active ? COLORS.PRIMARY : COLORS.BLACK;

  return (
    <svg
      fill={fill}
      height={height}
      viewBox="0 0 1920 1920"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M738.077 0v147.692h348.554L680.477 1772.308H295V1920h886.302v-147.692H832.748l406.006-1624.616h385.477V0z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export { Italic };
