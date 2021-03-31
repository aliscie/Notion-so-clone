import {
  Editor,
  Transforms,
  Range,
  Point,
  Element as SlateElement,
} from 'slate'

const SHORTCUTS: any = {
  '1.': 'list-item',
  '#': 'hash-tag',
  '##': 'heading-two',
}

const withElements = (editor: any) => {
  const { isInline, isVoid, normalizeNode, deleteBackward, insertText } = editor

  editor.insertText = (text: any) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        const newProperties: Partial<SlateElement> = {
          type,
        }
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        })
        switch (type) {
          case 'list-item':
            const list: any = {
              type: 'numbered-list',
              children: [],
            }
            Transforms.wrapNodes(editor, list, {
              match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n),
            })
            Transforms.insertText(editor, '')
            return
          default:
            return
        }
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args: any) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          }
          Transforms.setNodes(editor, newProperties)

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }
  editor.isInline = (element: any) => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = (element: any) => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}
export default withElements
