// TODO simplify this please
import React from 'react'

import { css } from '@emotion/css'
import { ReactEditor, useSlate } from 'slate-react'
import {
  Range,
  Editor,
  Transforms,
  createEditor,
  Node,
  Text,
  Element as SlateElement,
} from 'slate'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import CodeIcon from '@material-ui/icons/Code'
import ListIcon from '@material-ui/icons/List'
import ChatIcon from '@material-ui/icons/Chat'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import Paper from '@material-ui/core/Paper'
// import Popover from "@material-ui/core/Popover";
const LIST_TYPES: any = ['numbered-list', 'bulleted-list']

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
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
const isBlockActive = (editor: any, format: any) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
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

const MarkButton = (format: string, icon?: any) => {
  const editor = useSlate()
  return (
    <Button
      style={{
        color: isMarkActive(editor, format) ? 'black' : 'lightgray',
        display: 'inline',
      }}
      onMouseDown={(event: any) => {
        toggleMark(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}
function HoverToolbar() {
  const ref = React.useRef<HTMLDivElement | null>()
  const editor = useSlate()
  React.useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()!
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    const position =
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    el.style.left = `${position < 0 ? 0 : position}px`
  })

  const toggleFormat = (editor: any, format: any) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true },
    )
  }

  const isFormatActive = (editor: any, format: any) => {
    const [match]: any = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      mode: 'all',
    })
    return !!match
  }

  return (
    <Paper
      ref={ref}
      className={css`
        position: absolute;
        z-index: 1;
        top: -10000px;
        left: -10000px;
        margin-top: -6px;
        opacity: 0;
        transition: opacity 0.75s;
      `}
    >
      <ButtonGroup>
        {MarkButton('bold', <FormatBoldIcon />)}
        {MarkButton('italic', <FormatItalicIcon />)}
        {MarkButton('underline', <FormatUnderlinedIcon />)}
        {MarkButton('code', <CodeIcon />)}
        {MarkButton('Special', 'S')}
        {BlockButton('heading-one', 'h1')}
        {BlockButton('heading-two', 'h2')}
        {BlockButton('block-quote', <ChatIcon />)}
        {BlockButton('numbered-list', <FormatListNumberedIcon />)}
        {BlockButton('bulleted-list', <ListIcon />)}
      </ButtonGroup>
    </Paper>
  )
}

export default HoverToolbar
