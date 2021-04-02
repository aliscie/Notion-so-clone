import { Editor, Transforms } from 'slate'

const insertComp = (editor: Editor, character: string, key: any) => {
  const table: any = [
    {
      type: 'h3',
      children: [
        { text: 'this ' },
        { text: 'comment', Special: { username: 'weplutus.1' } },
        { text: ' added by weplutus.1, another ' },
        { text: 'comment', Special: { username: 'Ali' } },
        { text: ' added  by ali' },
      ],
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
