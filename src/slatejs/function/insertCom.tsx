import { Editor, Transforms } from 'slate'

const insertComp = (editor: Editor, character: string, key: any) => {
  const table: any = [
    {
      type: 'table',
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'count', name: 'Count' },
      ],
      rows: [
        { id: 0, title: 'row1', count: 20 },
        { id: 1, title: 'row1', count: 40 },
        { id: 2, title: 'row1', count: 60 },
      ],
      children: [{ text: '' }],
    },
  ]

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
