import React, { useCallback, useMemo, useState, useRef } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import HoverToolbar from './Components/HoverToolbar'
import Element from './Components/Element'
import Leaf from './Components/Leaf'
import usePosts from '../Hooks/usePosts'
import insertMention from './function/insertMention'
import withElements from './function/withElements'
import useMention from './Hooks/useMention'
import insertComp from './function/insertCom'
import useStyles from '../uiStyles/useStyles'
import UserChip from '../Components/UserChip'
import MenuItems from './Components/MenuItems'
import { useApolloClient } from '@apollo/client'
import useConvert from './Hooks/useConvert'

const RichText = ({ item }: any) => {
  const client: any = useApolloClient()

  var CHARACTERS: any = ['']
  CHARACTERS = client.cache.data.data.ROOT_QUERY.users.map(
    (item: any) => item.username,
  )

  const classes = useStyles()
  const [loading, error, data, res, setstate]: any = usePosts()
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

  const editor = useMemo(
    () => withElements(withReact(withHistory(createEditor()))),
    [],
  )

  const [
    index,
    chars,
    onKeyDown,
    onChange,
    setIndex,
    activate_mention_insert,
  ] = useMention(/^@(\w+)$/, insertMention, editor, CHARACTERS, ref)

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
  const [change]: any = useConvert(/(<)(.+)(>)/, insertMention, editor, ref)

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
        onChange()
        onCh()
        change()
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
        renderLeaf={useCallback(
          (props) => (
            <Leaf {...props} />
          ),
          [],
        )}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(e: any) => {
          onKeyDown(e)
          onKey(e)
        }}
      />
      {chars &&
        chars.length > 0 &&
        MenuItems(
          chars,
          setIndex,
          activate_mention_insert,
          ref,
          index,
          UserChip,
        )}
      {Chars &&
        Chars.length > 0 &&
        MenuItems(Chars, setIn, activateMentionInsert, ref, In)}
    </Slate>
  )
}

export default RichText
