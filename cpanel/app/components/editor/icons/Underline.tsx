import { FC } from 'react';

import { COLORS } from '~/utils/constants';

import type { IconProps } from './Props';

const Underline: FC<IconProps> = (props) => {
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
        d="M1698.923 1772.308V1920H222v-147.692h1476.923ZM369.693 0v812.308c0 285.046 231.876 516.923 516.922 516.923h147.693c285.046 0 516.923-231.877 516.923-516.923V0h147.692v812.308c0 366.424-298.19 664.615-664.615 664.615H886.615c-366.424 0-664.615-298.19-664.615-664.615V0h147.692Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export { Underline };
