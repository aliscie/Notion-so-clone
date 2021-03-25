// TODO simplify this please
import React from 'react'
import { css } from '@emotion/css'
import { ReactEditor, useSlate } from 'slate-react'
import { Range, Editor } from 'slate'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import CodeIcon from '@material-ui/icons/Code'
import ListIcon from '@material-ui/icons/List'
import ChatIcon from '@material-ui/icons/Chat'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import Paper from '@material-ui/core/Paper'
import BlockButton from './BlockButton'
import CustomizedDividers from './CustomizedDividers'

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
      <CustomizedDividers />
      {/* <ButtonGroup>
        {BlockButton('heading-one', 'h1')}
        {BlockButton('heading-two', 'h2')}
        {BlockButton('block-quote', <ChatIcon />)}
        {BlockButton('numbered-list', <FormatListNumberedIcon />)}
        {BlockButton('bulleted-list', <ListIcon />)}
      </ButtonGroup> */}
    </Paper>
  )
}

export default HoverToolbar
