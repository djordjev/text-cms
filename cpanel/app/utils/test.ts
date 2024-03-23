import { Descendant } from 'slate';

export const TEST_EDITOR: Descendant[] = [
  {
    type: 'heading',
    children: [
      {
        text: 'HEADING'
      }
    ],
    level: 3,
    align: 'center'
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'A '
      },
      {
        text: 'line',
        italic: true
      },
      {
        text: ' of '
      },
      {
        text: 'text',
        color: '#e41111',
        bold: true
      },
      {
        text: ' in a '
      },
      {
        text: 'paragraph',
        bold: true
      },
      {
        text: '.'
      }
    ]
  }
];

export const buildRequest = (data: Record<string, string>, method = 'POST') => {
  const form = new URLSearchParams(data);

  return new Request('https://www.test.local', { body: form, method });
};
