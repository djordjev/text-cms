import { FileVariation } from '~/types';
import { TEST_EDITOR } from '~/utils/test';

export const FILE_CONTENT: FileVariation[] = [
  {
    id: '1',
    name: 'First Variation',
    condition: [[['a', '=', '1']]],
    text: TEST_EDITOR as any
  },
  {
    id: '2',
    name: 'Second Variation',
    condition: [
      [
        ['b', '=', '1'],
        ['c', '>', '12']
      ],
      [['w', '=', 'true']]
    ],
    text: TEST_EDITOR as any
  }
];

export const FILE_VARIATION = JSON.stringify(FILE_CONTENT);
