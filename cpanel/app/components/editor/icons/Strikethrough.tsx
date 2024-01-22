import { FC } from 'react';

import { COLORS } from '~/utils/constants';

import type { IconProps } from './Props';

const Strikethrough: FC<IconProps> = (props) => {
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
        d="M1388.388 1178.604c35.04 82.32 37.92 177.6 8.64 283.32-60.36 216-199.32 294.72-305.4 322.68-42.12 11.16-85.68 16.2-129.6 16.2-191.52 0-390.24-96.24-502.68-207.96l-50.88-54.6 87.84-81.72 49.2 52.8c114.72 114 339.72 205.8 515.4 159.24 110.16-29.04 184.44-109.44 220.56-238.92 22.08-79.8 21-146.52-3.48-203.88ZM758.472 137.928c226.68-61.68 498.72 45.24 639.84 177l-81.84 87.72c-116.64-108.72-350.88-196.92-526.44-148.92-106.08 28.8-177.6 103.08-212.52 220.68-74.4 250.32 135.72 335.16 418.08 420 74.64 22.44 139.2 42.48 186.36 67.8h738v120h-1920v-120h814.92c-213.24-76.92-444.6-211.92-352.44-522.12 46.92-157.68 149.28-262.2 296.04-302.16Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export { Strikethrough };
