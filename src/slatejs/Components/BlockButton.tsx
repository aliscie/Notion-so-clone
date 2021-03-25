import React from 'react'
import Button from '@material-ui/core/Button'
import { useSlate } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
const LIST_TYPES: any = ['numbered-list', 'bulleted-list']

const isBlockActive = (editor: any, format: any) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
      ),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const BlockButton = (format: any, icon: any) => {
  const editor = useSlate()
  return (
    <Button
      // active={isBlockActive(editor, format)}
      style={{
        color: isBlockActive(editor, format) ? 'red' : 'gray',
        display: 'inline',
      }}
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}
export default BlockButton
