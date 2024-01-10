import * as React from 'react';
import { createEditor, Editor as SlateEditor, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { VariationEditor } from '~/components/editor/VariationEditor/VariationEditor';

const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
];

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

const Editor = () => {
  const [editor] = React.useState(() => withReact(createEditor()));

  // Setup
  const renderElement = React.useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = React.useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return <VariationEditor name="variation 1" />;

  return (
    <div className="u-container u-border u-border-solid u-border-primary-500 u-rounded u-my-10x u-mx-auto u-min-h-3z u-bg-white">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type
          );
          if (isAstChange) {
            const content = JSON.stringify(value);
            console.log(content);
          }
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case '`': {
                event.preventDefault();
                const [match] = SlateEditor.nodes(editor, {
                  match: (n: any) => n.type === 'code'
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: (n: any) => SlateEditor.isBlock(editor, n) }
                );

                break;
              }

              case 'b': {
                event.preventDefault();
                SlateEditor.addMark(editor, 'bold', true);

                break;
              }
            }
          }}
        />
      </Slate>

      <button
        type={'button'}
        onClick={() => {
          editor.onChange();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Editor;
