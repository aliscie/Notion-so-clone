import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  Children,
} from 'react'
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
import useMention from './Hooks/useMention'
import insertComp from './function/insertCom'
import useStyles from '../uiStyles/useStyles'
import findIcon from './function/findIcon'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import {
  Editor,
  Transforms,
  Range,
  Point,
  Element as SlateElement,
} from 'slate'
import { Tooltip } from '@material-ui/core'

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

  const [In, Chars, onKey, onCh, setIn, activateMentionInsert] = useMention(
    /^\/(\w+)$/,
    insertComp,
    editor,
    [
      'table',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
      'numbered-list',
      'divider',
    ],
    ref,
  )

  const userId = localStorage.getItem('userId')
  const allowedUsers = item.whoCanEdite.map((item: any) => item.id)
  var readOnly: boolean

  if (item.addedBy.id === localStorage.getItem('userId')) {
    readOnly = false
  } else if (item.whoCanEdite.length > 0) {
    readOnly = !allowedUsers.includes(userId) ? true : false
  } else if (localStorage.getItem('userId') === '1') {
    readOnly = false
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
            <Element editor={editor} {...props} />
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
        <div
          ref={ref}
          style={{
            maxHeight: '30%',
            overflow: 'auto',
            cursor: 'pointer',
            top: '-9999px',
            left: '-9999px',
            position: 'absolute',
            zIndex: 1,
            padding: '3px',
            backgroundColor: 'white',
          }}
        >
          {Chars.map((char: any, i: number) => {
            var current: any
            const [match]: any = Editor.nodes(editor, {
              match: (n: any) => (current = n.type),
            })

            return (
              <Tooltip
                title={
                  <div>
                    <b>Click</b> or Hit <b>Enter</b>: for new block
                    <div>
                      <b>Tab</b>: to modify the current block.
                    </div>
                  </div>
                }
              >
                <div>
                  <MenuItem
                    style={{ background: i === In ? 'lightgray' : 'white' }}
                    onMouseEnter={() => setIn(i)}
                  >
                    <Typography
                      onMouseDown={activateMentionInsert}
                      variant={char}
                    >
                      {char}
                    </Typography>

                    {/* the current is {current} */}
                  </MenuItem>
                </div>
              </Tooltip>
            )
          })}
        </div>
      )}
    </Slate>
  )
}

export default RichText
