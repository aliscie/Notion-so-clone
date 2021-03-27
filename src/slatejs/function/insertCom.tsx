import { Editor, Transforms } from 'slate'

const insertComp = (editor: Editor, character: string, key: any) => {
  const table: any = {
    type: character,
    children: [
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '' }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Human', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Dog', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: 'Cat', bold: true }],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '# of Feet', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: '2' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '4' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '4' }],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [{ text: '# of Lives', bold: true }],
          },
          {
            type: 'table-cell',
            children: [{ text: '1' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '1' }],
          },
          {
            type: 'table-cell',
            children: [{ text: '9' }],
          },
        ],
      },
    ],
  }

  switch (character) {
    case 'table':
      return Transforms.insertNodes(editor, table)
    case 'numbered-list':
      return Transforms.insertNodes(editor, [
        {
          type: character,
          children: [{ type: 'list-item', children: [{ text: '' }] }],
        },
      ])
    case 'divider':
      return Transforms.insertNodes(editor, [
        {
          type: character,
          children: [{ text: '' }],
        },
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ])
    default:
      console.log(key)
      if (key == 'Tab') {
        Transforms.setNodes(editor, {
          type: character,
          children: [{ text: '' }],
        })

        Transforms.insertText(editor, '')
      } else {
        Transforms.insertNodes(editor, {
          type: character,
          children: [{ text: '' }],
        })
      }
      return Transforms.move(editor)
  }
}

export default insertComp
