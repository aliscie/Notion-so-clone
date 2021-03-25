import { Editor, Transforms } from 'slate'

const insertComp = (editor: Editor, character: string) => {
  const table =
    character == 'table'
      ? {
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
      : [
          {
            type: character,
            children: [{ type: 'list-item', children: [{ text: '' }] }],
          },
        ]

  Transforms.insertNodes(editor, table)
  Transforms.move(editor)
}

export default insertComp
