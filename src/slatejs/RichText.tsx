import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import HoverToolbar from './Components/HoverToolbar'
import Element from './Components/Element'
import Leaf from './Components/Leaf'
import Paper from '@material-ui/core/Paper'
import usePosts from '../Hooks/usePosts'
import insertMention from './function/insertMention'
import withElements from './function/withElements'
import Char from './Components/Char'
import useMention from './Hooks/useMention'
import insertComp from './function/insertCom'
import useStyles from '../uiStyles/useStyles'

const CHARACTERS = ['Component', 'usernam2', 'user1']

const RichText = ({ item }: any) => {
  const classes = useStyles()
  const { loading, error, data, res, setstate }: any = usePosts()
  const ref = useRef<HTMLDivElement | null | any>()

  const [value, setValue] = useState<Node[]>(
    JSON.parse(
      item.description
        ? item.description
        : '[{"type":"paragraph","children":[{"text":""}]}]',
    ),
  )
  React.useEffect(() => {
    item.description && setValue(JSON.parse(item.description))
  }, [item])

  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const editor = useMemo(
    () => withElements(withReact(withHistory(createEditor()))),
    [],
  )

  const [index, chars, onKeyDown, onChange] = useMention(
    /^@(\w+)$/,
    insertMention,
    editor,
    CHARACTERS,
    ref,
  )

  const [In, Chars, onKey, onCh] = useMention(
    /^\/(\w+)$/,
    insertComp,
    editor,
    ['table', 'title', 'numbered-list'],
    ref,
  )

  const userId = localStorage.getItem('userId')
  const allowedUsers = item.whoCanEdite.map((item: any) => item.id)
  var readOnly: boolean

  if (item.addedBy.id === localStorage.getItem('userId')) {
    readOnly = false
  } else if (item.whoCanEdite.length > 0) {
    readOnly = !allowedUsers.includes(userId) ? true : false
  } else {
    readOnly = true
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value)
        setstate({ id: item.id, description: JSON.stringify(value) })
        onChange(editor.selection)
        onCh(editor.selection)
      }}
    >
      <HoverToolbar />
      <Editable
        readOnly={readOnly}
        renderElement={useCallback(
          (props) => (
            <Element {...props} />
          ),
          [],
        )}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(e: any) => {
          onKeyDown(e)
          onKey(e)
        }}
      />
      {chars && chars.length > 0 && (
        <Paper
          ref={ref}
          style={{
            cursor: 'pointer',
            top: '-9999px',
            left: '-9999px',
            position: 'absolute',
            zIndex: 1,
            padding: '3px',
          }}
        >
          {chars.map((char: any, i: number) => (
            <p className={classes.hoverig}>{char}</p>
          ))}
        </Paper>
      )}

      {Chars && Chars.length > 0 && (
        <Paper
          ref={ref}
          style={{
            cursor: 'pointer',
            top: '-9999px',
            left: '-9999px',
            position: 'absolute',
            zIndex: 1,
            padding: '3px',
          }}
        >
          {Chars.map((char: any, i: number) => (
            <p className={classes.hoverig}>{char}</p>
          ))}
        </Paper>
      )}
    </Slate>
  )
}

export default RichText
