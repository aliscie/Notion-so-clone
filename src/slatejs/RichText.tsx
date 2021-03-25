import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import isHotkey from 'is-hotkey'
import {
  Editable,
  withReact,
  Slate,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import {
  createEditor,
  Node,
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import HoverToolbar from './Components/HoverToolbar'
import Element from './Components/Element'
import Leaf from './Components/Leaf'
import Paper from '@material-ui/core/Paper'
import usePosts from '../Hooks/usePosts'
import insertMention from './function/insertMention'
import withElements from './function/withElements'
import Char from './Components/Char'
const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
const CHARACTERS = ['Component', 'usernam2']

const RichText = ({ item }: any) => {
  const { loading, error, data, res, setstate }: any = usePosts()
  const ref = useRef<HTMLDivElement | null | any>()
  const [search, setSearch] = useState('')
  const [index, setIndex] = useState(0)
  const [target, setTarget] = useState<Range | undefined | any>()

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

  const chars = CHARACTERS.filter((c: any) =>
    c.toString().toLowerCase().startsWith(search.toLowerCase()),
  ).slice(0, 10)

  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const editor = useMemo(
    () => withElements(withReact(withHistory(createEditor()))),
    [],
  )

  const onKeyDown = useCallback(
    (event) => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault()
        }
      }
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, chars[index])
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
        }
      }
    },
    [index, search, target],
  )
  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target])

  const userId = 1 // parseInt(`${localStorage.getItem('userId')}`)
  var readOnly: boolean

  if (item.addedBy === userId) {
    readOnly = false
  } else if (item.whoCanEdite.length > 0) {
    readOnly = !item.whoCanEdite.includes(userId) ? true : false
  } else {
    readOnly = false
  }
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value)
        setstate({ id: item.id, description: JSON.stringify(value) })
        // lookup('PUT', `api/post/${item.id}/`, callback, {
        //   // title: "new title",
        //   description: JSON.stringify(value),
        //   // addedBy: item.addedBy,
        //   // created_date: item.created_date,
        //   // whoCanSee: item.whoCanSee,
        // })
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection)
          const wordBefore = Editor.before(editor, start, { unit: 'word' })
          const before = wordBefore && Editor.before(editor, wordBefore)
          const beforeRange = before && Editor.range(editor, before, start)
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange)
            setSearch(beforeMatch[1])
            setIndex(0)
            return
          }
        }

        setTarget(null)
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
        onKeyDown={onKeyDown}
      />
      {target && chars.length > 0 && (
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
          {chars.map((char: any, i: number) => Char(char, i, index))}
        </Paper>
      )}
    </Slate>
  )
}

export default RichText
